import KoaApp from 'koa'
import { PluginConfig } from './PluginConfig'
import { PluginStore } from './PluginStore'
import { MiddlewareStore } from './MiddlewareStore'
import { MiddlewareConfig } from './MiddlewareConfig'
import { RouterStore } from './RouterStore'
import { Server } from 'http'

export interface Application extends KoaApp {
  server: Server | null
  isProd: boolean
  config: any
  baseDir: string
  middlewarePattern: string
  // pluginPattern: string
  middlewareConfig: MiddlewareConfig
  middlewareStore: MiddlewareStore
  pluginConfig: PluginConfig
  pluginStore: PluginStore
  routerStore: RouterStore
  port: number
  resolvers: any
  controllers: any
  // start: () => any
}
