import { Container, RouteItem, Injectable, InjectApp, Application } from '@tiejs/common'
import { controllerStore } from './stores/controllerStore'
import { actionStore } from './stores/actionStore'
import { getClassMethodNames } from './utils/getClassMethodNames'

@Injectable()
export class RouteBuilder {
  constructor(@InjectApp() private app: Application) {}

  buildRoutes(): RouteItem[] {
    const routes: RouteItem[] = []
    const controllerClasses = this.app.controllers
    for (const ControllerClass of controllerClasses) {
      const basePath = controllerStore.get(ControllerClass)
      let instance = Container.get<any>(ControllerClass)
      const prototype = Object.getPrototypeOf(instance)
      const methodNames = getClassMethodNames(ControllerClass)
      for (const methodName of methodNames) {
        const actionFn = prototype[methodName]

        const value = actionStore.get(actionFn)
        if (!value) continue
        const { path, method, view, fn, target, propertyKey } = value
        routes.push({
          method,
          methodName,
          path: this.mergePath(basePath, path),
          instance,
          handler: instance[methodName],
          view,
          fn,
          target,
          propertyKey,
        })
      }
    }
    return routes
  }

  mergePath(basePath: string, path: string) {
    basePath = basePath.replace(/^\/|\/$/, '')
    path = path.replace(/^\/|\/$/, '')
    if (!basePath && !path) return '/'
    return `/${basePath}/${path}`.replace(/\/\//, '/').replace(/\/$/, '')
  }
}
