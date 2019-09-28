export { Inject } from 'typedi'
import { MIDDLEWARE_METADATA } from '../constant'
import { PluginMiddlewareOption } from '../interfaces/PluginMiddlewareOption'

export const PluginMiddleware = (
  options: PluginMiddlewareOption,
): MethodDecorator => {
  return (_, __, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(MIDDLEWARE_METADATA, options, descriptor.value)
  }
}
