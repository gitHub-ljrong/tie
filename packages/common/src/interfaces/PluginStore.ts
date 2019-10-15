import { AppDidReady } from './AppDidReady'
import { ConfigDidLoad } from './ConfigDidLoad'
import { ServerDidReady } from './ServerDidReady'
import { MiddlewareDidReady } from './MiddlewareDidReady'

export type PluginStore = PluginInfo[]
export interface PluginInfo {
  name: string
  path: string
  instance: any // plugin class instance
  pluginClass: any
  middleareFiles: string[]

  appDidReady?: AppDidReady
  configDidLoad?: ConfigDidLoad
  serverDidReady?: ServerDidReady
  middlewareDidReady?: MiddlewareDidReady

  package?: string
  enable?: boolean
}
