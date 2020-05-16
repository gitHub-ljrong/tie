import { Container, RouteItem, Injectable, InjectApp, Application } from '@tiejs/common'
import { controllerStore } from './stores/controllerStore'
import { actionStore } from './stores/actionStore'
import { getClassMethodNames } from './utils/getClassMethodNames'

@Injectable()
export class RouteBuilder {
  constructor(@InjectApp() private app: Application) {}

  buildRoutes(): RouteItem[] {
    const routes: RouteItem[] = []
    const { controllers = [] } = this.app.config
    for (const ControllerClass of controllers) {
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

  mergePath(basePath: string, path: string | string[]): any {
    basePath = basePath.replace(/^\/|\/$/, '') // 格式化

    if (Array.isArray(path)) {
      return path.map(p => {
        p = p.replace(/^\/|\/$/, '') // 格式化
        if (!basePath && !p) return '/'
        return `/${basePath}/${p}`.replace(/\/\//, '/').replace(/\/$/, '')
      })
    }

    if (typeof path === 'string') {
      path = path.replace(/^\/|\/$/, '') // 格式化
      if (!basePath && !path) return '/'
      return `/${basePath}/${path}`.replace(/\/\//, '/').replace(/\/$/, '')
    }

    throw new Error('path not correct')
  }
}
