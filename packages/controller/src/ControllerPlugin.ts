import {
  Injectable,
  IPlugin,
  Application,
  Request,
  Response,
  RouteItem,
  Container,
} from '@tiejs/common'

import { validateOrReject, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { parse } from 'cookie'
import bodyParser from 'body-parser'

import { BadRequest } from '@tiejs/exception'
import { paramTypes } from './constant'
import { isPromise } from './utils/isPromise'
import { paramStore } from './stores/paramStore'
import { RouteBuilder } from './routeBuilder'
import { isClass } from './utils/isClass'

@Injectable()
export class ControllerPlugin implements IPlugin {
  private routes: RouteItem[] = []
  async appDidReady(app: Application) {
    const routeBuilder = Container.get(RouteBuilder)
    this.routes = routeBuilder.buildRoutes()
    app.routerStore = this.routes

    app.use(bodyParser.json())
  }

  async middlewareDidReady(app: Application) {
    for (const route of this.routes) {
      const { method, path, instance, fn, target, propertyKey, view } = route

      app[method](path, async (req: Request, res: Response, next: any) => {
        const args = getArgs(req, res, target, propertyKey)

        const validationErrors = await getValidationErrors(args)

        if (validationErrors.length) {
          return next(new BadRequest('Argument Validation Error', validationErrors))
        }

        // can render     TODO:
        if (view) return res.render(view)

        try {
          let result = fn.apply(instance, args)
          result = isPromise(result) ? await result : result

          if (result) res.send(result)
          next()
        } catch (error) {
          next(error)
        }
      })
    }

    applyAfaterMiddleware(app)
  }
}

function applyAfaterMiddleware(app: Application) {
  const { middlewareStore } = app
  for (const item of middlewareStore) {
    if (item.type !== 'after') continue

    if (isClass(item.use)) {
      const instance = Container.get<any>(item.use as any)
      if (instance.use) app.use(instance.use)
    } else {
      app.use((item.use as any).bind(item.instance || null))
    }
  }
}

function getVaue(req: Request, res: Response, paramType: string, paramName: string) {
  const ValueMaps = {
    [paramTypes.Query]: (req: Request) => (paramName ? req.query[paramName] : { ...req.query }),
    [paramTypes.Body]: (req: Request) => (paramName ? req.body[paramName] : req.body),
    [paramTypes.Params]: (req: Request) => (paramName ? req.params[paramName] : req.params),
    [paramTypes.Cookie]: (req: Request) => {
      const cookies = parse(req.cookies) || {}
      return paramName ? cookies[paramName] : cookies
    },
    [paramTypes.Method]: (req: Request) => req.method,
    [paramTypes.Session]: (req: Request) => req,
    [paramTypes.Ctx]: (req: Request) => req,
    [paramTypes.Req]: (req: Request) => req,
    [paramTypes.Res]: (_: any, res: Response) => res,
    [paramTypes.Header]: (req: Request) => req.headers,
  }
  return (ValueMaps as any)[paramType](req, res)
}

function getArgs(req: Request, res: Response, target: Object, propertyKey: string): any[] {
  const args: any[] = []

  const ParamTypes = paramStore.getParamTypes(target, propertyKey)

  for (const type of Object.values(paramTypes)) {
    const paramMetadata = paramStore.get({
      paramType: type,
      controllerClass: target,
      method: propertyKey,
    })

    if (paramMetadata) {
      for (const paramName of Object.keys(paramMetadata)) {
        let value = getVaue(req, res, type, paramName)
        const index = paramMetadata[paramName]
        const paramType = ParamTypes[index]

        try {
          value = plainToClass(paramType, value)
        } catch {}

        args[paramMetadata[paramName]] = value
      }
    }
  }
  return args
}

async function getValidationErrors(args: any[]) {
  let validationErrors: ValidationError[] = []

  for (const arg of args) {
    try {
      await validateOrReject(arg)
    } catch (errors) {
      if (errors && errors.length) {
        validationErrors = [...validationErrors, ...errors]
      }
    }
  }

  return validationErrors
}
