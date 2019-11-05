import { Injectable, Application, InjectApp } from '@tiejs/common'
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

      this.logger.info('GraphQL server started')
      return server
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }
}
