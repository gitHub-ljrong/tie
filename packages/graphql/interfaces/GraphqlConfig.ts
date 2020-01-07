import { GraphQLScalarType } from 'graphql'
import { PubSubEngine, PubSubOptions } from 'graphql-subscriptions'

type Resolver = string | { pattern: string; cwd?: string }
// type Directive = () => Promise<any> | any
interface ScalarsMapItem {
  type: any
  scalar: GraphQLScalarType
}

export interface GraphqlConfig {
  path?: string
  dateScalarMode?: 'isoDate' | 'timestamp'
  scalarsMap?: ScalarsMapItem[]
  cors?: boolean
  resolvers?: Resolver[]
  debug?: boolean
  typeDefs?: string
  directives?: {
    [name: string]: any
  }

  pubSub?: PubSubEngine | PubSubOptions
  emitSchemaFile?: boolean
}