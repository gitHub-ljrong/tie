import Koa from 'koa'
import { Server } from 'http'
import { Container, MiddlewareStore, PluginStore, RouterStore } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'
import { ConfigLoader } from '@tiejs/config'
import chalk from 'chalk'

import { Loader } from './Loader'

const { cyan } = chalk

export class Appliaction extends Koa {
  private t0 = Date.now()

  server: Server | null = null

  env = process.env.NODE_ENV || 'development'
  isProd = process.env.NODE_ENV === 'production'
  baseDir = process.cwd()
  port = 5001

  middlewarePattern = '**/*.middleware.{ts,js}'

  pluginStore: PluginStore = []
  middlewareStore: MiddlewareStore = []
  routerStore: RouterStore = []

  configLoader: ConfigLoader = new ConfigLoader(this)
  config = this.configLoader.loadConfig()
  middlewareConfig = this.configLoader.loadMiddlewareConfig()
  pluginConfig = this.configLoader.loadPluginConfig()

  constructor() {
    super()
    this.storeApp()
  }

  private storeServer() {
    Container.set('TIE_SERVER', this.server)
  }

  private storeApp() {
    Container.set('TIE_APP', this)
  }

  async bootstrap() {
    const t1 = Date.now()
    const time = (t1 - this.t0) / 1000
    const port = 3000

    await new Loader(this).init()

    this.server = this.listen(port, () => {
      const msg = `server started on ${cyan(`http://127.0.0.1:${port}`)} (${time}s)`
      coreLogger.info(msg)
      // TODO: too hack
      //  Tie.app.pluginStore.forEach(item => {
      //    item.serverDidReady && item.serverDidReady.call(item.instance, Tie.app, server)
      //  })
    })

    this.storeServer()
  }
}
