type Resolver = string | { pattern: string; cwd?: string }
type Resolvers = Resolver[]

export interface GraphqlConfig {
  path?: string
  cors?: boolean
  resolvers?: Resolvers
}
