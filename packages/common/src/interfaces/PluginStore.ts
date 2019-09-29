import { AppDidReady } from './AppDidReady'
import { ConfigDidLoad } from './ConfigDidLoad'
import { ServerDidReady } from './ServerDidReady'
import { MiddlewareDidReady } from './MiddlewareDidReady'
import { ApplyMiddleware } from './ApplyMiddleware'

export type PluginStore = PluginInfo[]
export interface PluginInfo {
  name: string
  path: string
  instance: any // plugin class instance
  pluginClass: any

  appDidReady?: AppDidReady
  configDidLoad?: ConfigDidLoad
  serverDidReady?: ServerDidReady
  middlewareDidReady?: MiddlewareDidReady
  applyMiddleware?: ApplyMiddleware

  package?: string
  enable?: boolean

  middleareFiles?: string[]
}
