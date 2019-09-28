import { join, isAbsolute } from 'path'
import glob from 'glob'
import { MiddlewareFn, MiddlewareConfig } from '@tiejs/common'
import { Container, PluginStore, MiddlewareStore, MiddlewareItem } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'

export class MiddlewareStoreBuilder {
  baseDir = process.cwd()
  middlewarePattern = '**/*.middleware.{ts,js}'

  constructor(private pluginStore: PluginStore, private middlewareConfig: MiddlewareConfig) {}

  findMiddlewareInPlugin(pluginStore: PluginStore, name: string) {
    let fn: MiddlewareFn | null = null
    let instance: any
    for (const pluginItem of pluginStore) {
      if (!pluginItem.middlewares.length) continue
      const find = pluginItem.middlewares.find(item => item.name === name)
      if (find) {
        fn = find.middlewareFn
        instance = pluginItem.instance
        break
      }
    }
    if (!fn) return null
    return { middlewareFn: fn, instance }
  }

  findLocalMiddlewareInstance(localMiddlewareFiles: string[], name: string) {
    const matchedMiddlewareFile = localMiddlewareFiles.find(item =>
      item.includes(`/${name}.middleware.ts`),
    )

    const unknowReason = `middleware content is not correct, you should use "export default" to export a middleware`

    if (!matchedMiddlewareFile) {
      coreLogger.warn(
        `Can not find local "${name}.middleware.ts" file for middleware: "${name}", please check you config`,
      )
      return null
    }

    try {
      if (require(matchedMiddlewareFile).default) {
        const MiddlewareClass = require(matchedMiddlewareFile).default
        let instance = Container.get<any>(MiddlewareClass)
        return instance
      }
      coreLogger.warn(unknowReason)
      return null
    } catch (error) {
      coreLogger.warn(error)
      return null
    }
  }

  async createMiddlewareStore() {
    const middlewareStore: MiddlewareStore = []

    if (!this.middlewareConfig.length) return []

    const localMiddlewareFiles = this.scanFileByPattern(this.middlewarePattern, this.baseDir)

    for (const { name } of this.middlewareConfig) {
      let middlewareItem = { name } as MiddlewareItem

      const pluginMiddleware = this.findMiddlewareInPlugin(this.pluginStore, name)

      if (pluginMiddleware) {
        middlewareItem.instance = pluginMiddleware.instance
        middlewareItem.middlewareFn = pluginMiddleware.middlewareFn
        middlewareItem.isLocal = false
      } else {
        const instance = this.findLocalMiddlewareInstance(localMiddlewareFiles, name)
        if (instance) {
          middlewareItem.instance = instance
          middlewareItem.middlewareFn = instance.use
          middlewareItem.isLocal = true
        }
      }
      middlewareStore.push(middlewareItem)
    }
    return middlewareStore
  }

  scanFileByPattern(pattern: string, sanDir: string = '') {
    pattern = isAbsolute(pattern) ? pattern : join(sanDir, pattern)
    return glob.sync(pattern, { ignore: '**/node_modules/**' })
  }
}
