import { ConfigLoader } from '@tiejs/config'
import { Application } from '@tiejs/common'
import express from 'express'
import { PluginStoreBuilder } from './builders/PluginStoreBuilder'
import { MiddlewareStoreBuilder } from './builders/MiddlewareStoreBuilder'
import { join } from 'path'

export interface Options {
  port: number
}

export class Loader {
  constructor(private app: Application) {
    this.app.env = process.env.NODE_ENV || 'development'
    this.app.baseDir = process.cwd()
    this.app.port = 5001

    this.app.middlewarePattern = '**/*.middleware.{ts,js}'
    this.app.pluginPattern = '**/*.plugin.{ts,js}'

    this.app.pluginStore = []
    this.app.middlewareStore = []

    const configLoader = new ConfigLoader(app)

    this.app.config = configLoader.loadConfig()
    this.app.middlewareConfig = configLoader.loadMiddlewareConfig()
    this.app.pluginConfig = configLoader.loadPluginConfig()
  }

  async init() {
    const pluginStoreBuilder = new PluginStoreBuilder(
      this.app.baseDir,
      this.app.pluginPattern,
      this.app.pluginConfig,
    )

    this.app.pluginStore = await pluginStoreBuilder.createPluginStore()

    await this.initPluginStore()

    const middlewareStoreBuiler = new MiddlewareStoreBuilder(
      this.app.pluginStore,
      this.app.middlewareConfig,
    )

    this.app.middlewareStore = await middlewareStoreBuiler.createMiddlewareStore()

    this.app.use(express.static(join(this.app.baseDir, 'src', 'public')))

    this.applyMiddleware()

    await this.applyMiddlewareDidReady()
  }

  private async initPluginStore() {
    // call all configDidLoad first
    for (const item of this.app.pluginStore) {
      if (item.configDidLoad) {
        await item.configDidLoad.call(item.instance, this.app)
      }
    }

    for (const item of this.app.pluginStore) {
      // call plugin appDidReady
      if (item.appDidReady) {
        await item.appDidReady.call(item.instance, this.app)
      }

      // apply plugin middleware
      item.middlewares.forEach(item => {
        this.app.middlewareConfig = item.apply(this.app.middlewareConfig)
      })
    }
  }

  private async applyMiddleware() {
    for (const item of this.app.middlewareStore) {
      if (item.middlewareFn) {
        this.app.use(item.middlewareFn.bind(item.instance) as any)
      }
    }
  }

  private async applyMiddlewareDidReady() {
    for (const item of this.app.pluginStore) {
      if (item.middlewareDidReady) {
        await item.middlewareDidReady.call(item.instance, this.app)
      }
    }
  }
}
