import { Injectable, IPlugin, MiddlewareConfig } from '@tiejs/common'
import { LoggerMiddleware } from './LoggerMiddleware'

@Injectable()
export class LoggerPlugin implements IPlugin {
  applyMiddleware(middlewareConfig: MiddlewareConfig): MiddlewareConfig {
    return [{ name: 'logger', use: LoggerMiddleware }, ...middlewareConfig]
  }
}
