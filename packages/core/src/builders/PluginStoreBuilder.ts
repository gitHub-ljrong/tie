import { join } from 'path'
import {
  Container,
  PluginStore,
  PluginInfo,
  IPlugin,
  Injectable,
  InjectApp,
  Application,
} from '@tiejs/common'
import globby, { GlobbyOptions } from 'globby'
import { coreLogger } from '@tiejs/logger'

interface BasicInfo {
  instance: any
  pluginClass: any
  path: string
  middlearePaths: string[]
}

@Injectable()
export class PluginStoreBuilder {
  constructor(@InjectApp() private app: Application) {}

  requireFile(file: string) {
    try {
      if (require(file).default) {
        return require(file).default
      }
    } catch {
      return null
    }
  }

  loadBasicInfo(name: string, cwd: string, isPackage: boolean): BasicInfo {
    const ext = isPackage ? 'js' : 'ts'
    const middlwarePattern = `**/*/*.middleware.${ext}`
    const pluginPattern = `**/*/*${name}.plugin.${ext}`
    const opt: GlobbyOptions = { ignore: ['**/node_modules/**'], onlyFiles: true, cwd }
    const pluginPaths = globby.sync(pluginPattern, opt).map(i => join(cwd, i))
    const middlearePaths = globby.sync(middlwarePattern, opt).map(i => join(cwd, i))
    const [pluginPath] = pluginPaths
    if (!pluginPath) {
      throw new Error(
        `Can not find "${name}.plugin.{ts,js}" file in ${cwd}, please check you "plugin.ts" config`,
      )
    }

    const pluginClass = this.requireFile(pluginPath)
    if (!pluginClass) {
      const unknownReason = `plugin content is not correct, you should use "export default" to export a plugin`
      throw new Error(unknownReason)
    }

    let instance = Container.get<IPlugin>(pluginClass)
    console.log('instance:', instance)
    return {
      path: pluginPath,
      instance,
      pluginClass,
      middlearePaths,
    }
  }

  async createPluginStore(): Promise<PluginStore> {
    const pluginStore: PluginInfo[] = []

    for (const plugin of this.app.pluginConfig) {
      const { name, enable, package: packageName, dir = '' } = plugin
      let pluginItem = {} as PluginInfo
      if (!enable) continue
      try {
        const cwd = packageName ? join(this.app.baseDir, 'node_modules', packageName) : dir
        const basicInfo = this.loadBasicInfo(name, cwd, !!packageName)
        const instance = basicInfo.instance

        if (instance.configDidLoad) pluginItem.configDidLoad = instance.configDidLoad
        if (instance.appDidReady) pluginItem.appDidReady = instance.appDidReady
        if (instance.serverDidReady) pluginItem.serverDidReady = instance.serverDidReady
        if (instance.middlewareDidReady) pluginItem.middlewareDidReady = instance.middlewareDidReady
        if (instance.applyMiddleware) pluginItem.applyMiddleware = instance.applyMiddleware

        pluginStore.push({ ...plugin, ...pluginItem })
      } catch (error) {
        coreLogger.warn(error)
        continue
      }
    }
    return pluginStore
  }
}
