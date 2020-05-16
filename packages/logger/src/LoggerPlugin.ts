import { Injectable, InjectApp, Application } from '@tiejs/common'
import { LoggerMiddleware } from './LoggerMiddleware'

@Injectable()
export class LoggerPlugin {
  constructor(@InjectApp() private app: Application) {
    let { middlewares = [] } = this.app.config
    middlewares.unshift({ name: 'logger', use: LoggerMiddleware })
  }
}
