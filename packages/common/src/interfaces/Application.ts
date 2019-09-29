import { Application as App } from 'express'
import { PluginConfig } from './PluginConfig'
import { PluginStore } from './PluginStore'
import { MiddlewareStore } from './MiddlewareStore'
import { MiddlewareConfig } from './MiddlewareConfig'
import { RouteItem } from './RouteItem'

export interface Application extends App {
  env: string | undefined
  isProd: boolean
  config: any
  baseDir: string
  middlewarePattern: string
  pluginPattern: string
  middlewareConfig: MiddlewareConfig
  middlewareStore: MiddlewareStore
  pluginConfig: PluginConfig
  pluginStore: PluginStore
  routerStore: RouteItem[]
  port: number
  start: () => any
}
