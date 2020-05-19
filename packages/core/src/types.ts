import { MiddlewareConfig, PluginConfig } from '@tiejs/common'

export interface Config {
  /** port，default is 5001 */
  port?: number

  debug?: boolean

  /** default is process.cwd() */
  baseDir?: string

  resolvers?: any[]

  controllers?: any[]

  middlewares?: MiddlewareConfig

  plugins?: PluginConfig

  [key: string]: any
}

export interface ServerOptions {
  port: number
}
