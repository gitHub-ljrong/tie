import KoaApp from 'koa'
import { PluginStore } from './PluginStore'
import { MiddlewareStore } from './MiddlewareStore'
import { RouterStore } from './RouterStore'
import { Server } from 'http'
import { MiddlewareConfig } from './MiddlewareConfig'
import { PluginConfig } from './PluginConfig'

export interface Config {
  port?: number
  resolvers?: any[]
  controllers?: any[]
  middlewares?: MiddlewareConfig
  plugins?: PluginConfig
  [key: string]: any
}

export interface Application extends KoaApp {
  server: Server | null
  isProd: boolean
  port: number
  baseDir: string
  middlewarePattern: string
  config: Config
  middlewareStore: MiddlewareStore
  pluginStore: PluginStore
  routerStore: RouterStore
}
