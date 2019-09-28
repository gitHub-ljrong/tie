import { Container, RouteItem, Injectable } from '@tiejs/common'
import globby, { GlobbyOptions } from 'globby'
import { InjectConfig } from '@tiejs/config'
import { ControllerConfig } from './interfaces/ControllerConfig'
import { controllerStore } from './stores/controllerStore'
import { actionStore } from './stores/actionStore'
import { getClassMethodNames } from './utils/getClassMethodNames'
import { isControllerClass } from './utils/isControllerClass'
import { join } from 'path'

@Injectable()
export class RouteBuilder {
  constructor(@InjectConfig('controller') private config: ControllerConfig) {}

  buildRoutes(): RouteItem[] {
    const routes: RouteItem[] = []
    const controllerClasses = this.getControllerClass()
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

  private getControllerClass() {
    const controllerClasses: any[] = []
    const controllerFiles = this.loadControllerFiles()

    for (const file of controllerFiles) {
      const exportedValues = Object.values(require(file))
      for (const value of exportedValues) {
        if (isControllerClass(value) && !controllerClasses.includes(value)) {
          controllerClasses.push(value)
        }
      }
    }

    return controllerClasses
  }

  loadControllerFiles() {
    let files: string[] = []
    let cwd: string = process.cwd()
    const { patterns } = this.config

    if (typeof patterns === 'undefined') return files

    for (const item of patterns) {
      let pattern: any
      const opt: GlobbyOptions = { ignore: ['**/node_modules/**'], onlyFiles: true, cwd }
      if (typeof item === 'string') pattern = item
      if (typeof item === 'object') {
        cwd = item.cwd || process.cwd()
        pattern = item.pattern
        opt.cwd = cwd
      }
      const paths = globby.sync(pattern, opt).map(i => join(cwd, i))
      files = [...files, ...paths]
    }
    return files
  }
}
