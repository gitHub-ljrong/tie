import { Resolver, Query } from 'type-graphql'
import { Container, Application } from '@tiejs/common'

import { Dashboard } from './dashboard.type'
@Resolver(() => Dashboard)
export class DevDashboardResolver {
  private app: Application
  constructor() {
    const app = Container.get<Application>('LEAF_APP')
    this.app = app
  }
  @Query(() => Dashboard, { nullable: true })
  async _devDashboard(): Promise<Dashboard> {
    return {
      baseDir: this.app.baseDir,
      env: this.app.env || 'development',
      pluginStore: this.app.pluginConfig,
      middlewareStore: this.getMiddlewareConfig(),
      routerStore: this.getRouterStore(),
    }
  }

  private getMiddlewareConfig() {
    return this.app.middlewareConfig.map(item => ({
      ...item,
      name: item.name || '',
      use: item.use ? item.use.toString() : '',
    }))
  }

  private getRouterStore() {
    return this.app.routerStore.map(item => ({
      ...item,
      handler: item.handler.toString(),
      instance: item.instance.constructor.name,
    }))
  }
}
