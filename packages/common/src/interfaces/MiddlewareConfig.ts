import { MiddlewareFn } from './MiddlewareFn'
import { MiddlewareClass } from './MiddlewareClass'

export type MiddlewareConfigItem = {
  name: string
  use?: MiddlewareFn | MiddlewareClass
  enable?: boolean
  matcher?: { path: string; method: string }
}

export type MiddlewareConfig = MiddlewareConfigItem[]
