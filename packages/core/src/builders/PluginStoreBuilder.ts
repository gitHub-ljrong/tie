import {
  Container,
  PluginStore,
  PluginInfo,
  IPlugin,
  Injectable,
  InjectApp,
  Application,
} from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'

interface BasicInfo {
  instance: any
  pluginClass: any
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

  loadBasicInfo(packageName: string): BasicInfo {
    const pluginClass = this.requireFile(packageName)
    if (!pluginClass) {
      const unknownReason = `plugin {${packageName}} content is not correct, you should use "export default" to export a plugin`
      throw new Error(unknownReason)
    }

    let instance = Container.get<IPlugin>(pluginClass)
    return {
      instance,
      pluginClass,
    }
  }

  async createPluginStore(): Promise<PluginStore> {
    const pluginStore: PluginInfo[] = []

    for (const plugin of this.app.pluginConfig) {
      const { enable, package: packageName ='' } = plugin
      let pluginItem = { ...plugin } as PluginInfo
      if (!enable) continue
      try {
        const info = this.loadBasicInfo(packageName)
        const instance = info.instance

        const methods = ['configDidLoad', 'appDidReady', 'serverDidReady', 'middlewareDidReady']

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
