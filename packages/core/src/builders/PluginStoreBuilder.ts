import { join, isAbsolute, resolve } from 'path'
import {
  Container,
  MIDDLEWARE_METADATA,
  PluginMiddlewareInfo,
  PluginMiddlewareOption,
  PluginStore,
  PluginInfo,
  PluginConfig,
} from '@tiejs/common'
import glob from 'glob'
const isDirectory = require('is-directory')

import fs from 'fs'
import { coreLogger } from '@tiejs/logger'

export class PluginStoreBuilder {
  constructor(
    private baseDir: string,
    private pluginPattern: string,
    private plugins: PluginConfig,
  ) {}

  scanFileByPattern(pattern: string, sanDir: string = '') {
    pattern = isAbsolute(pattern) ? pattern : join(sanDir, pattern)
    return glob.sync(pattern, { ignore: '**/node_modules/**' })
  }

  async createPluginStore(): Promise<PluginStore> {
    const pluginConfig = this.plugins
    const pluginFiles = this.scanFileByPattern(this.pluginPattern, this.baseDir)
    const pluginStore: PluginInfo[] = []

    for (const plugin of pluginConfig) {
      const { name, enable, package: packageName } = plugin
      if (!enable) continue
      let PluginClass: any
      let pluginItem = {} as PluginInfo

      // node_modules plugin
      if (packageName) {
        PluginClass = this.findPluginByPackage(name, packageName)
      } else {
        PluginClass = this.findLocalPlugin(pluginFiles, name)
      }

      if (!PluginClass) continue

      let instance = Container.get<any>(PluginClass)

      pluginItem.instance = instance

      if (instance.configDidLoad) pluginItem.configDidLoad = instance.configDidLoad
      if (instance.appDidReady) pluginItem.appDidReady = instance.appDidReady
      if (instance.serverDidReady) pluginItem.serverDidReady = instance.serverDidReady
      if (instance.middlewareDidReady) pluginItem.middlewareDidReady = instance.middlewareDidReady

      const middlewareInfos = this.getMiddlewareInfos(instance)
      pluginItem.middlewares = middlewareInfos
      pluginItem.name = name
      pluginItem.package = packageName
      pluginStore.push(pluginItem)
    }
    return pluginStore
  }

  findPluginByPackage(name: string, packageName: string) {
    const packageDir = join(this.baseDir, 'node_modules', packageName)

    let pluginPath: string | null = null

    function findPlugin(packageDir: string, pattern: string) {
      const dirFiles = fs.readdirSync(packageDir)
      for (const file of dirFiles) {
        const curPath = resolve(packageDir, file)
        if (isDirectory.sync(curPath)) {
          findPlugin(curPath, pattern)
        } else {
          const reg = new RegExp(pattern)
          if (reg.test(curPath)) {
            pluginPath = curPath
            break
          }
        }
      }
      return pluginPath
    }

    findPlugin(packageDir, `${name}.plugin.js$`)

    const unknownReason = `plugin content is not correct, you should use "export default" to export a plugin`

    try {
      if (!pluginPath) {
        coreLogger.warn(
          `Can not find "${name}.plugin.{ts,js}" file in node_modules: ${packageName}: "${name}", please check you "plugin.js" config`,
        )
        return
      }

      if (require(pluginPath).default) {
        return require(pluginPath).default
      }

      coreLogger.warn(unknownReason)
    } catch (error) {
      coreLogger.warn(error)
    }
  }

  getMiddlewareInfos(instance: Object): PluginMiddlewareInfo[] {
    const prototype = Object.getPrototypeOf(instance)
    const propertyNames = Object.getOwnPropertyNames(prototype)

    return propertyNames.reduce(
      (result, item) => {
        const opt: PluginMiddlewareOption = Reflect.getMetadata(
          MIDDLEWARE_METADATA,
          prototype[item],
        )
        const isMiddleware = opt && opt.name && opt.apply
        if (!isMiddleware) return result
        return [
          ...result,
          {
            name: opt.name,
            apply: opt.apply,
            middlewareFn: prototype[item],
          },
        ]
      },
      [] as PluginMiddlewareInfo[],
    )
  }

  findLocalPlugin(pluginFiles: string[], name: string) {
    const matchedPluginFile = pluginFiles.find(item => item.includes(`${name}.plugin.ts`))

    const unknowReason = `plugin content is not correct, you should use "export default" to export a plugin`

    if (!matchedPluginFile) {
      coreLogger.warn(
        `Can not find local "${name}.plugin.ts" file for plugin: "${name}", please check you "plugin.ts" config`,
      )
      return
    }

    try {
      if (require(matchedPluginFile).default) {
        return require(matchedPluginFile).default
      }
      coreLogger.warn(unknowReason)
    } catch (error) {
      coreLogger.warn(error)
    }
  }
}
