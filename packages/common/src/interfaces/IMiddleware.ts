import { MiddlewareFn } from './MiddlewareFn'

export interface IMiddleware {
  use: MiddlewareFn
}
