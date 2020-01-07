import { join } from 'path'
import { Injectable, Container, InjectApp, Application } from '@tiejs/common'
import { InjectLogger, Logger } from '@tiejs/logger'
import { InjectConfig } from '@tiejs/config'
import globby, { GlobbyOptions } from 'globby'

import { buildSchema, BuildSchemaOptions } from 'type-graphql'
import { extendSchema, parse, GraphQLSchema } from 'graphql'
import { GraphqlConfig } from './interfaces/GraphqlConfig'
import { isResolverClass } from './utils/isResolverClass'
import addDirective from './utils/addDirective'
import { GraphQLISODateTime } from './scalars/isodate'
import { GraphQLTimestamp } from './scalars/timestamp'

@Injectable()
export class SchemaBuilder {
  constructor(
    @InjectLogger('@tiejs/graphql') private logger: Logger,
    @InjectConfig('graphql') private config: GraphqlConfig,
    @InjectApp() private app: Application,
  ) {}

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

    const resolvers = await this.getResolverClass()
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

  async loadResolverFiles() {
    let files: string[] = []
    let cwd: string = process.cwd()
    const { resolvers } = this.config

    if (typeof resolvers === 'undefined') return files
    for (const item of resolvers) {
      let pattern: any
      const opt: GlobbyOptions = { ignore: ['**/node_modules/**'], onlyFiles: true, cwd }
      if (typeof item === 'string') pattern = item
      if (typeof item === 'object') {
        cwd = item.cwd || process.cwd()
        pattern = item.pattern
        opt.cwd = cwd
      }
      const paths = globby.sync(pattern, opt).map(i => join(cwd, i))
      files = [...files, ...paths]
    }
    return files
  }

  async getResolverClass() {
    const resolverClasses: any[] = []
    const resolverFiles = await this.loadResolverFiles()
    for (const file of resolverFiles) {
      if (this.app.isProd) {
        if (file.endsWith('.ts')) continue
      } else {
        if (file.endsWith('.js')) continue
      }
      const exportedValues = Object.values(require(file))
      for (const value of exportedValues) {
        if (isResolverClass(value) && !resolverClasses.includes(value)) {
          resolverClasses.push(value)
        }
      }
    }

    return resolverClasses
  }
}
