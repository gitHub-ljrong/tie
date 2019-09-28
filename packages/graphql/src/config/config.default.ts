import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  graphql = {
    path: '/graphql',
    cors: false,
    resolvers: ['**/*.resolver.{ts,js}'],
  }
}
