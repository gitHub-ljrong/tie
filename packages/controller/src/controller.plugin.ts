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
import { BadRequest } from '@tiejs/exception'
import { paramTypes } from './constant'
import { isPromise } from './utils/isPromise'
import { paramStore } from './stores/paramStore'
import { RouteBuilder } from './routeBuilder'

@Injectable()
export default class ControllerPlugin implements IPlugin {
  private routes: RouteItem[] = []
  async appDidReady(app: Application) {
    const routeBuilder = Container.get(RouteBuilder)
    this.routes = routeBuilder.buildRoutes()
    app.routerStore = this.routes
  }

  async middlewareDidReady(app: Application) {
    for (const route of this.routes) {
      const { method, path, instance, fn, target, propertyKey, view } = route

      app[method](path, async (req: Request, res: Response) => {
        const args = getArgs(req, res, target, propertyKey)
        const validationErrors = await getValidationErrors(args)

        if (validationErrors.length) {
          throw new BadRequest('Argument Validation Error', validationErrors)
        }

        let result = fn.apply(instance, args)

        result = isPromise(result) ? await result : result

        // can render
        if (view) {
          // TODO:
          res.render(view)
          return
        }

        if (result) {
          res.send(result)
        }
      })
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
