import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PluginItem {
  @Field()
  name: string

  @Field()
  enable?: boolean

  @Field()
  package?: string
}

@ObjectType()
export class MiddlewareItem {
  @Field()
  name: string

  @Field()
  enable?: boolean

  @Field()
  use?: string
}

@ObjectType()
export class RouteItem {
  @Field()
  method: string

  @Field()
  path: string

  @Field()
  methodName: string

  @Field()
  handler: string

  @Field()
  instance: string
}

@ObjectType({ description: 'dev dashboard' })
export class Dashboard {
  @Field()
  env: string

  @Field()
  baseDir: string

  @Field(() => [PluginItem])
  pluginStore: PluginItem[]

  @Field(() => [MiddlewareItem])
  middlewareStore: MiddlewareItem[]

  @Field(() => [RouteItem])
  routerStore: RouteItem[]
}
