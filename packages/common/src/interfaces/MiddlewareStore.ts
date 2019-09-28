import { MiddlewareFn } from './MiddlewareFn'

export type MiddlewareStore = MiddlewareItem[]
export interface MiddlewareItem {
  name: string
  isLocal: boolean
  middlewareFn: MiddlewareFn
  path?: string
  instance?: any // plugin class instance
}
