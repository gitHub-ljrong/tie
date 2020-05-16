import Koa from 'koa'
import { Server } from 'http'
import { Container, MiddlewareStore, PluginStore, RouterStore } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'
import chalk from 'chalk'

import { Loader } from './Loader'
import { getPluginConfig } from './utils'
import { Config } from './types'

const { cyan } = chalk

export class Appliaction extends Koa {
  private t0 = Date.now()

  server: Server | null = null

  env = process.env.NODE_ENV || 'development'
  isProd = process.env.NODE_ENV === 'production'
  baseDir = process.cwd()

  middlewarePattern = '**/*.middleware.{ts,js}'

  pluginStore: PluginStore = []
  middlewareStore: MiddlewareStore = []
  routerStore: RouterStore = []

  port: number
  config: Config

  constructor(config = {} as Config) {
    super()
    this.storeApp()

    this.config = {
      ...config,
      plugins: getPluginConfig(config.plugins),
    }

    this.port = this.config.port || 5001
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
    const { port } = this

    await new Loader(this).init()

    this.server = this.listen(port, () => {
      const msg = `server started on ${cyan(`http://127.0.0.1:${port}`)} (${time}s)`
      coreLogger.info(msg)

      // TODO: too hack
      this.pluginStore.forEach(item => {
        item.serverDidReady && item.serverDidReady.call(item.instance, this, this.server as Server)
      })
    })

    this.storeServer()
  }
}
