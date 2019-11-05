import isClass from 'is-class'
import { Injectable, Application, InjectApp, Container } from '@tiejs/common'
import { InjectLogger, Logger } from '@tiejs/logger'
import { InjectConfig } from '@tiejs/config'
import { ApolloServer, Config } from 'apollo-server-express'

import { SchemaBuilder } from './SchemaBuilder'
import { GraphqlConfig } from './interfaces/GraphqlConfig'

@Injectable()
export class GraphqlService {
  constructor(
    @InjectLogger('@tiejs/graphql') private logger: Logger,
    @InjectConfig('graphql') private config: GraphqlConfig,
    @InjectApp() private app: Application,
    private schemeBuilder: SchemaBuilder,
  ) {}

  async startServer() {
    try {
      const schema = await this.schemeBuilder.getSchema()

      if (!schema) {
        this.logger.warn('No Schema found')
        return null
      }

      const apolloConfig: Config = {
        schema,
        tracing: false,
        context: ctx => ctx,
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        } as any,
        debug: this.config.debug,
        introspection: true,
      }
      const server = new ApolloServer(apolloConfig)
      const { path, cors } = this.config

      server.applyMiddleware({
        app: this.app,
        path,
        cors,
      })

      applyAfaterMiddleware(this.app)

      this.logger.info('GraphQL server started')
      return server
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }
}

function applyAfaterMiddleware(app: Application) {
  const { middlewareStore } = app
  for (const item of middlewareStore) {
    if (item.type !== 'after') continue

    if (isClass(item.use)) {
      const instance = Container.get<any>(item.use as any)
      if (instance.use) app.use(instance.use)
    } else {
      app.use((item.use as any).bind(item.instance || null))
    }
  }
}
