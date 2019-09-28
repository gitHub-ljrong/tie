import { AppDidReady } from './AppDidReady'
import { ConfigDidLoad } from './ConfigDidLoad'
import { ServerDidReady } from './ServerDidReady'
import { PluginMiddlewareInfo } from './PluginMiddlewareInfo'
import { MiddlewareDidReady } from './MiddlewareDidReady'

export type PluginStore = PluginInfo[]
export interface PluginInfo {
  name: string
  appDidReady?: AppDidReady
  configDidLoad?: ConfigDidLoad
  serverDidReady?: ServerDidReady
  middlewareDidReady?: MiddlewareDidReady
  middlewares: PluginMiddlewareInfo[]
  instance: any // plugin class instance
  package?: string
}
