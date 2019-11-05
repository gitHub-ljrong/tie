import { Injectable, Context, NextFunction, IMiddleware } from '@tiejs/common'
import { Logger } from 'ts-log-debug'
import { ctxLogger } from './loggers/ctxLogger'

@Injectable()
export class LoggerMiddleware implements IMiddleware {
  async use(ctx: Context, next: NextFunction) {
    ctx.logger = {} as Logger
    const levels = ['debug', 'info', 'trace', 'warn', 'error']
    for (const level of levels) {
      ctx.logger[level] = (...msg: any[]) => {
        ctxLogger[level]({
          ...getMsg(...msg),
          request: ctx.req,
        })
      }
    }
    next()
  }
}

function getMsg(...args: any[]) {
  if (args.length == 0) return { message: '' }
  if (args.length === 1) {
    if (typeof args[0] === 'object') {
      return { ...args[0] }
    } else {
      return { message: args[0] }
    }
  } else {
    return { message: args }
  }
}
