import { Injectable, Container } from '@tiejs/common'
import { InjectLogger, Logger } from '@tiejs/logger'
import { InjectConfig } from '@tiejs/config'
import globby, { GlobbyOptions } from 'globby'

import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import { GraphqlConfig } from './interfaces/GraphqlConfig'
import { isResolverClass } from './utils/isResolverClass'
import { join } from 'path'

@Injectable()
export class SchemaBuilder {
  constructor(
    @InjectLogger('@tiejs/graphql') private logger: Logger,
    @InjectConfig('graphql') private config: GraphqlConfig,
  ) {}

  async getSchema() {
    let schema: GraphQLSchema
    const resolvers = await this.getResolverClass()
    if (!resolvers.length) {
      this.logger.warn('No Resolver found!')
      return null
    }

    schema = await buildSchema({
      resolvers,
      dateScalarMode: 'isoDate',
      emitSchemaFile: true,
      container: Container,
    })

    return schema
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
