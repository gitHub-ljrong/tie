import { MiddlewareConfigItem } from './MiddlewareConfig'

export type MiddlewareStore = MiddlewareStoreItem[]

export interface MiddlewareStoreItem extends MiddlewareConfigItem {
  path?: string

  // middleware class instance
  instance?: any
}
