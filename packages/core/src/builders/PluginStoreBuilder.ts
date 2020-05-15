import {
  Container,
  PluginStore,
  PluginInfo,
  IPlugin,
  Injectable,
  InjectApp,
  Application,
  PluginConfigItem,
} from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'

interface BasicInfo {
  instance: any
  pluginClass: any
}

@Injectable()
export class PluginStoreBuilder {
  constructor(@InjectApp() private app: Application) {}

  private requireFile(file: string = '') {
    try {
      if (require(file).default) {
        return require(file).default
      }
    } catch {
      return null
    }
  }

  loadBasicInfo(plugin: PluginConfigItem): BasicInfo {
    let pluginClass = plugin.main ? plugin.main : this.requireFile(plugin.package)
    if (!pluginClass) {
      const unknownReason = `plugin {${plugin.package}} content is not correct, you should use "export default" to export a plugin`
      throw new Error(unknownReason)
    }

    return {
      instance: Container.get<IPlugin>(pluginClass),
      pluginClass,
    }
  }

  async createPluginStore(): Promise<PluginStore> {
    const pluginStore: PluginInfo[] = []

    for (const plugin of this.app.pluginConfig) {
      const { enable } = plugin
      let pluginItem = { ...plugin } as PluginInfo
      if (!enable) continue
      try {
        const info = this.loadBasicInfo(plugin)
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
