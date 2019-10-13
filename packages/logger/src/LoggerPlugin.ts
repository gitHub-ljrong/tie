import { Injectable, IPlugin, MiddlewareConfig } from '@tiejs/common'

@Injectable()
export class LoggerPlugin implements IPlugin {
  applyMiddleware(middlewareConfig: MiddlewareConfig): MiddlewareConfig {
    return [{ name: 'logger' }, ...middlewareConfig]
  }
}
