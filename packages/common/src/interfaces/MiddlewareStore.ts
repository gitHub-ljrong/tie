import { MiddlewareConfigItem } from './MiddlewareConfig'

export type MiddlewareStore = MiddlewareStoreItem[]

export interface MiddlewareStoreItem extends MiddlewareConfigItem {
  path?: string
  instance?: any // plugin class instance
}
