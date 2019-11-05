import { Injectable } from '@tiejs/common'
import { GraphqlConfig } from '../interfaces/GraphqlConfig'

@Injectable()
export default class Config {
  graphql: GraphqlConfig = {
    path: '/graphql',
    cors: true,
    debug: false,
    resolvers: ['**/*.resolver.{ts,js}'],
  }
}
