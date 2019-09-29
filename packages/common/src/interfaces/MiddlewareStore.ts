import { MiddlewareFn } from './MiddlewareFn'

export type MiddlewareStore = MiddlewareItem[]
export interface MiddlewareItem {
  name: string
  use?: (...args: any) => any | void
  enable?: boolean
  matcher?: { path: string; method: string }

  middlewareFn: MiddlewareFn
  path?: string
  instance?: any // plugin class instance
}
