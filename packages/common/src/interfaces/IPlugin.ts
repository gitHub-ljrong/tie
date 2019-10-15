import { AppDidReady } from './AppDidReady'
import { ServerDidReady } from './ServerDidReady'
import { MiddlewareDidReady } from './MiddlewareDidReady'
import { ConfigDidLoad } from './ConfigDidLoad'

export interface IPlugin {
  appDidReady?: AppDidReady
  configDidLoad?: ConfigDidLoad
  middlewareDidReady?: MiddlewareDidReady
  serverDidReady?: ServerDidReady
}
