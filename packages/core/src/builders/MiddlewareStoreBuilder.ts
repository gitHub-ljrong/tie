import isClass from 'is-class'
import { Injectable, InjectApp, Application, MiddlewareConfigItem } from '@tiejs/common'
import { Container, MiddlewareStore, MiddlewareStoreItem } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'

@Injectable()
export class MiddlewareStoreBuilder {
  constructor(@InjectApp() private app: Application) {}

  baseDir = process.cwd()
  middlewarePattern = '**/*.middleware.{ts,js}'

  getMiddlewareStoreItem(item: MiddlewareConfigItem): MiddlewareStoreItem {
    const { name, use } = item
    const enable = typeof item.enable === 'undefined' ? true : item.enable

    if (!use) {
      throw new Error(`require use method in midlleware ${name}`)
    }

    if (!isClass(use)) return { ...item, enable }

    const instance = Container.get<any>(use)
    return {
      ...item,
      enable,
      use: instance.use.bind(instance),
      instance,
    }
  }

  async createMiddlewareStore() {
    const middlewareStore: MiddlewareStore = []
    const { middlewares = [] } = this.app.config
    if (!middlewares.length) return []

    for (const item of middlewares) {
      try {
        const middlewareStoreItem = this.getMiddlewareStoreItem(item)
        middlewareStore.push(middlewareStoreItem)
      } catch (error) {
        coreLogger.warn(error)
        continue
      }
    }
    return middlewareStore
  }
}
