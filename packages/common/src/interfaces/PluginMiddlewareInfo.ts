import { MiddlewareFn } from './MiddlewareFn'
import { PluginMiddlewareOption } from './PluginMiddlewareOption'

export interface PluginMiddlewareInfo extends PluginMiddlewareOption {
  middlewareFn: MiddlewareFn
}
