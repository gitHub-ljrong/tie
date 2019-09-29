import { join } from 'path'
import globby, { GlobbyOptions } from 'globby'
import { Injectable, InjectApp, Application } from '@tiejs/common'
import { Container, MiddlewareStore } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'

interface BasicInfo {
  instance: any
  middlewareClass: any
  path: string
}

@Injectable()
export class MiddlewareStoreBuilder {
  constructor(@InjectApp() private app: Application) {}

  baseDir = process.cwd()
  middlewarePattern = '**/*.middleware.{ts,js}'

  requireFile(file: string) {
    try {
      if (require(file).default) {
        return require(file).default
      }
    } catch {
      return null
    }
  }

  loadBasicInfo(name: string): BasicInfo {
    const middlewareFiles = this.getAllMiddlewareFiles()

    const file = middlewareFiles.find(item => item.includes(`/${name}.middleware`))

    if (!file) {
      throw new Error(
        `Can not find "${name}.middleware.{js,ts}" file for middleware: "${name}", please check you config`,
      )
    }

    const middlewareClass = this.requireFile(file)

    if (!middlewareClass) {
      const unknownReason = `middleware content is not correct, you should use "export default" to export a middleware`
      throw new Error(unknownReason)
    }

    let instance = Container.get<any>(middlewareClass)

    return {
      instance,
      middlewareClass,
      path: file,
    }
  }

  async createMiddlewareStore() {
    const middlewareStore: MiddlewareStore = []
    if (!this.app.middlewareConfig.length) return []

    for (const item of this.app.middlewareConfig) {
      try {
        const info = this.loadBasicInfo(item.name)
        middlewareStore.push({ ...item, middlewareFn: info.instance.use, ...info })
      } catch (error) {
        coreLogger.warn(error)
        continue
      }
    }
    return middlewareStore
  }

  private getAllMiddlewareFiles() {
    const pluginMiddlewares = this.app.pluginStore.reduce(
      (result, item) => {
        return [...result, ...item.middleareFiles]
      },
      [] as string[],
    )
    return [...this.scanMiddlewareFiles(), ...pluginMiddlewares]
  }

  private scanMiddlewareFiles() {
    const cwd = this.app.baseDir
    const opt: GlobbyOptions = { ignore: ['**/node_modules/**'], onlyFiles: true, cwd }
    const files = globby.sync(this.middlewarePattern, opt).map(i => join(cwd, i))
    return files
  }
}
