import { AppDidReady } from './AppDidReady'
import { ConfigDidLoad } from './ConfigDidLoad'
import { ServerDidReady } from './ServerDidReady'
import { MiddlewareDidReady } from './MiddlewareDidReady'
import { PluginConfigItem } from './PluginConfig'

export type PluginStore = PluginInfo[]
export interface PluginInfo extends PluginConfigItem {
  name: string
  path: string
  instance: any // plugin class instance
  pluginClass: any
  middleareFiles: string[]

  appDidReady?: AppDidReady
  configDidLoad?: ConfigDidLoad
  serverDidReady?: ServerDidReady
  middlewareDidReady?: MiddlewareDidReady
}
