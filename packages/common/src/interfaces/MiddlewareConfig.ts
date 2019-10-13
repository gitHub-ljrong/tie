import { MiddlewareFn } from './MiddlewareFn'
import { MiddlewareClass } from './MiddlewareClass'



export type MiddlewareConfig = Array<{
  name: string
  use?: MiddlewareFn | MiddlewareClass
  enable?: boolean
  matcher?: { path: string; method: string }
}>
