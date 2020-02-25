import { Injectable } from '@tiejs/common'
import { GraphqlConfig } from '../interfaces/GraphqlConfig'

@Injectable()
export default class Config {
  graphql: GraphqlConfig = {
    path: '/graphql',
    dateScalarMode: 'isoDate',
    cors: true,
    debug: true,
    resolvers: ['**/*.resolver.{ts,js}'],
    directives: [],
  }
}
