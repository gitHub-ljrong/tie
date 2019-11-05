import {
  Injectable,
  IPlugin,
  Application,
  RouteItem,
  Container,
  Context,
  InjectApp,
} from '@tiejs/common'

import { validateOrReject, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { parse } from 'cookie'
import bodyParser, { Options } from 'koa-bodyparser'

import isPromise from 'is-promise'
import Router from '@koa/router'

import { BadRequest } from '@tiejs/exception'
import { paramTypes } from './constant'
import { paramStore } from './stores/paramStore'
import { RouteBuilder } from './routeBuilder'
import { InjectConfig } from '@tiejs/config'

import { InjectLogger, Logger } from '@tiejs/logger'

interface Arg {
  value: any
  shouldValidate: boolean
}

@Injectable()
export class ControllerPlugin implements IPlugin {
  private routes: RouteItem[] = []

  constructor(
    @InjectApp() private app: Application,
    @InjectConfig('body') private body: Options,
    @InjectLogger('@tiejs/controller') private logger: Logger,
  ) {
    this.app.use(bodyParser(this.body))
  }

  async appDidReady(app: Application) {
    const routeBuilder = Container.get(RouteBuilder)
    this.routes = routeBuilder.buildRoutes()
    app.routerStore = this.routes
  }

  async middlewareDidReady(app: Application) {
    const router = new Router()

    for (const route of this.routes) {
      const { method, path, instance, fn, target, propertyKey, view } = route

      router[method](path, async (ctx: Context, next: any) => {
        const args = getArgs(ctx, target, propertyKey)

        const validationErrors = await getValidationErrors(args)

        if (validationErrors.length) {
          return next(new BadRequest('Argument Validation Error', validationErrors))
        }

        // can render     TODO:
        if (view) return ctx.render(view)

        try {
          let result = fn.apply(instance, args.map(i => i.value))
          result = isPromise(result) ? await result : result

          if (result) {
            ctx.body = result
          }
        } catch (error) {
          this.logger.error(error)
          await next()
        }
      })
    }

    app.use(router.routes()).use(router.allowedMethods())
  }
}

function getVaue(ctx: Context, paramType: string, paramName: string) {
  const ValueMaps = {
    [paramTypes.Query]: () => (paramName ? ctx.query[paramName] : { ...ctx.query }),
    [paramTypes.Body]: () => (paramName ? ctx.request.body[paramName] : ctx.request.body),
    [paramTypes.Params]: () => (paramName ? ctx.params[paramName] : ctx.params),
    [paramTypes.Cookie]: () => {
      const cookies = parse(ctx.headers.cookie) || {}
      return paramName ? cookies[paramName] : cookies
    },
    [paramTypes.Method]: () => ctx.method,
    [paramTypes.Session]: () => ctx.req, // TODO: session
    [paramTypes.Ctx]: () => ctx,
    [paramTypes.Req]: () => ctx.req,
    [paramTypes.Res]: () => ctx.res,
    [paramTypes.Header]: () => ctx.headers,
  }
  return (ValueMaps as any)[paramType]()
}

function getArgs(ctx: Context, target: Object, propertyKey: string): Arg[] {
  const args: Arg[] = []

  const ParamTypes = paramStore.getParamTypes(target, propertyKey)

  for (const type of Object.values(paramTypes)) {
    const paramMetadata = paramStore.get({
      paramType: type,
      controllerClass: target,
      method: propertyKey,
    })

    if (paramMetadata) {
      for (const paramName of Object.keys(paramMetadata)) {
        let shouldValidate = false
        let value = getVaue(ctx, type, paramName)
        const index = paramMetadata[paramName]
        const paramType = ParamTypes[index]

        const builtinTypes = [paramTypes.Ctx, paramTypes.Req, paramTypes.Res, paramTypes.Method]
        try {
          if (!builtinTypes.includes(type)) {
            shouldValidate = true
            value = plainToClass(paramType, value)
          }
        } catch {}

        args[paramMetadata[paramName]] = {
          value,
          shouldValidate,
        }
      }
    }
  }
  return args
}

async function getValidationErrors(args: Arg[]) {
  let validationErrors: ValidationError[] = []

  for (const arg of args) {
    try {
      if (arg.shouldValidate) {
        await validateOrReject(arg)
      }
    } catch (errors) {
      if (errors && errors.length) {
        validationErrors = [...validationErrors, ...errors]
      }
    }
  }

  return validationErrors
}
