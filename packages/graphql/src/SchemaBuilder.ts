import { Injectable, Container } from '@tiejs/common'
import { InjectLogger, Logger } from '@tiejs/logger'
import { InjectConfig } from '@tiejs/common'

import { buildSchema, BuildSchemaOptions } from 'type-graphql'
import { extendSchema, parse, GraphQLSchema } from 'graphql'
import { GraphqlConfig } from './interfaces/GraphqlConfig'
import addDirective from './utils/addDirective'
import { GraphQLISODateTime } from './scalars/isodate'
import { GraphQLTimestamp } from './scalars/timestamp'
import { defaultConfig } from './config.default'

@Injectable()
export class SchemaBuilder {
  config: GraphqlConfig
  constructor(
    @InjectLogger('@tiejs/graphql') private logger: Logger,
    @InjectConfig('graphql') private graphqlqlConfig: GraphqlConfig,
  ) {
    this.config = { ...defaultConfig, ...this.graphqlqlConfig }
  }

  private setDirective(schema: GraphQLSchema) {
    const { typeDefs } = this.config
    if (typeDefs) {
      schema = extendSchema(schema, parse(typeDefs))
    }
    const resolverMap = this.config.directives
    if (resolverMap && Object.keys(resolverMap).length) {
      return addDirective(schema, resolverMap || {})
    }
    return schema
  }

  async getSchema() {
    let schema: GraphQLSchema
    const {
      scalarsMap = [],
      emitSchemaFile = true,
      dateScalarMode = 'isoDate',
      pubSub,
    } = this.config

    const defaultScalarMap = [
      {
        type: Date,
        scalar: dateScalarMode === 'timestamp' ? GraphQLTimestamp : GraphQLISODateTime,
      },
    ]

    const { resolvers = [] as any } = this.config

    if (!resolvers.length) {
      this.logger.warn('No Resolver found!')
      return null
    }

    const options: BuildSchemaOptions = {
      resolvers,
      scalarsMap: [...defaultScalarMap, ...scalarsMap],
      dateScalarMode,
      emitSchemaFile,
      container: Container,
    }

    if (pubSub) options.pubSub = pubSub

    schema = await buildSchema(options)

    return this.setDirective(schema)
  }
}
