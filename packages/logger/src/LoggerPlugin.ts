import { Injectable, InjectApp, Application } from '@tiejs/common'
import { LoggerMiddleware } from './LoggerMiddleware'

@Injectable()
export class LoggerPlugin {
  constructor(@InjectApp() private app: Application) {
    let middlewareConfig = this.app.middlewareConfig
    middlewareConfig = [{ name: 'logger', use: LoggerMiddleware }, ...middlewareConfig]
  }
}
