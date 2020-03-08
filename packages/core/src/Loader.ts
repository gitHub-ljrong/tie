import { Application, Container } from '@tiejs/common'
import { PluginStoreBuilder } from './builders/PluginStoreBuilder'
import { MiddlewareStoreBuilder } from './builders/MiddlewareStoreBuilder'
// import { join } from 'path'
import isClass from 'is-class'

export interface Options {
  port: number
}

export class Loader {
  constructor(private app: Application) {
    this.app = app
  }

  async init() {
    const pluginStoreBuilder = Container.get(PluginStoreBuilder)

    this.app.pluginStore = await pluginStoreBuilder.createPluginStore()

    await this.initPluginStore()

    const middlewareStoreBuiler = Container.get(MiddlewareStoreBuilder)

    this.app.middlewareStore = await middlewareStoreBuiler.createMiddlewareStore()

    this.applyBeforeMiddleware()

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
    }
  }

  private async applyBeforeMiddleware() {
    for (const item of this.app.middlewareStore) {
      // TODO need logger
      if (!item.use) continue

      if (!item.enable) continue

      if (isClass(item.use)) {
        const instance = Container.get<any>(item.use as any)
        if (instance.use) this.app.use(instance.use)
      } else {
        this.app.use((item.use as any).bind(item.instance || null))
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
