import { MiddlewareConfig } from './MiddlewareConfig'

export interface PluginMiddlewareOption {
  name: string

  // return a new middleware list
  apply: (middlewares: MiddlewareConfig) => MiddlewareConfig
}
