import { MiddlewareConfig, PluginConfig } from '@tiejs/common'

export interface Config {
  port?: number
  resolvers?: any[]
  controllers?: any[]
  middlewares?: MiddlewareConfig
  plugins?: PluginConfig
  [key: string]: any
}

export interface ServerOptions {
  port: number
}
