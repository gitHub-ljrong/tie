import { GraphqlConfig } from './interfaces/GraphqlConfig'

export const defaultConfig: GraphqlConfig = {
  path: '/graphql',
  dateScalarMode: 'isoDate',
  cors: true,
  debug: true,
  resolvers: [],
  directives: [],
}
