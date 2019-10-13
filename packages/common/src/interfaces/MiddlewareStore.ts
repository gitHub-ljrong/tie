import { MiddlewareFn } from './MiddlewareFn'
import { MiddlewareClass } from './MiddlewareClass'

export type MiddlewareStore = MiddlewareItem[]
export interface MiddlewareItem {
  name: string
  use?: MiddlewareFn | MiddlewareClass
  enable?: boolean
  matcher?: { path: string; method: string }

  middlewareFn: MiddlewareFn
  path?: string
  instance?: any // plugin class instance
}
