import { join, sep } from 'path'
import globby, { GlobbyOptions } from 'globby'
import { Injectable, InjectApp, Application, MiddlewareConfigItem } from '@tiejs/common'
import { Container, MiddlewareStore, MiddlewareStoreItem } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'

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

  getMiddlewareStoreItem(item: MiddlewareConfigItem): MiddlewareStoreItem {
    const { name, use } = item
    if (use) return item

    const middlewareFiles = this.scanMiddlewareFiles()
    const path = middlewareFiles.find(item => item.includes(`${sep}${name}.middleware`))

    if (!path) {
      throw new Error(
        `Can not find "${name}.middleware.{js,ts}" file for middleware: "${name}", please check you config`,
      )
    }

    const middlewareClass = this.requireFile(path)

    if (!middlewareClass) {
      const unknownReason = `middleware {${name}} content is not correct, you should use "export default" to export a middleware`
      throw new Error(unknownReason)
    }

    let instance = Container.get<any>(middlewareClass)

    // TODO: check use
    if (!instance.use) {
      throw new Error(`require use method in midlleware ${name}`)
    }

    return {
      ...item,
      use: instance.use.bind(instance),
      instance,
      path,
    }
  }

  async createMiddlewareStore() {
    const middlewareStore: MiddlewareStore = []
    if (!this.app.middlewareConfig.length) return []

    for (const item of this.app.middlewareConfig) {
      try {
        const middlewareStoreItem = this.getMiddlewareStoreItem(item)
        middlewareStore.push(middlewareStoreItem)
      } catch (error) {
        coreLogger.warn(error)
        continue
      }
    }
    return middlewareStore
  }

  private scanMiddlewareFiles() {
    const cwd = this.app.baseDir
    const opt: GlobbyOptions = { ignore: ['**/node_modules/**'], onlyFiles: true, cwd }
    const files = globby.sync(this.middlewarePattern, opt).map(i => join(cwd, i))
    return files
  }
}
