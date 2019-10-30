import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  graphql = {
    path: '/graphql',
    cors: true,
    resolvers: ['**/*.resolver.{ts,js}'],
  }
}
