import { Injectable, InjectApp, Application } from '@tiejs/common'
import { InjectConfig } from '@tiejs/config'
import { Request, Response, NextFunction } from 'express'
import { OnErrorConfig } from './interfaces/OnErrorConfig'

function error(config: OnErrorConfig): any {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }
    config.handler(err, req, res, next)
  }
}

@Injectable()
export class ErrorPlugin {
  constructor(
    @InjectApp() private app: Application,
    @InjectConfig('onerror') private config: OnErrorConfig,
  ) {
    const { middlewareConfig } = this.app
    middlewareConfig.push({
      name: 'onerror',
      use: error(this.config),
      type: 'after',
    })
  }
}
