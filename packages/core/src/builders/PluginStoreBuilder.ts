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
  middleareFiles: string[]
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
    const pluginFiles = globby.sync(pluginPattern, opt).map(i => join(cwd, i))
    const middleareFiles = globby.sync(middlwarePattern, opt).map(i => join(cwd, i))
    const [pluginFile] = pluginFiles
    if (!pluginFile) {
      throw new Error(
        `Can not find "${name}.plugin.{ts,js}" file in ${cwd}, please check you "plugin.ts" config`,
      )
    }

    const pluginClass = this.requireFile(pluginFile)
    if (!pluginClass) {
      const unknownReason = `plugin content is not correct, you should use "export default" to export a plugin`
      throw new Error(unknownReason)
    }

    let instance = Container.get<IPlugin>(pluginClass)
    return {
      path: pluginFile,
      instance,
      pluginClass,
      middleareFiles,
    }
  }

  async createPluginStore(): Promise<PluginStore> {
    const pluginStore: PluginInfo[] = []

    for (const plugin of this.app.pluginConfig) {
      const { name, enable, package: packageName, dir = '' } = plugin
      let pluginItem = { ...plugin } as PluginInfo
      if (!enable) continue
      try {
        const cwd = packageName ? join(this.app.baseDir, 'node_modules', packageName) : dir
        const info = this.loadBasicInfo(name, cwd, !!packageName)
        const instance = info.instance

        const methods = ['configDidLoad', 'appDidReady', 'serverDidReady', 'applyMiddleware']

        for (const method of methods) {
          if (instance[method]) (pluginItem as any)[method] = instance[method]
        }

        pluginStore.push({ ...pluginItem, ...info })
      } catch (error) {
        coreLogger.warn(error)
        continue
      }
    }
    return pluginStore
  }
}
