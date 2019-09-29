import { MiddlewareConfig } from './MiddlewareConfig'

export type ApplyMiddleware = (middlewareConfig: MiddlewareConfig) => MiddlewareConfig
