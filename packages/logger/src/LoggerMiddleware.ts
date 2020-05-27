import { Injectable, Context, NextFunction, IMiddleware } from '@tiejs/common'
// import { Logger } from '@tsed/logger'
import { ctxLogger } from './loggers/ctxLogger'

@Injectable()
export class LoggerMiddleware implements IMiddleware {
  async use(ctx: Context, next: NextFunction) {
    ctx.logger = {} as any

    const levels = ['debug', 'info', 'trace', 'warn', 'error']
    for (const level of levels) {
      ;(ctx.logger as any)[level] = (...msg: any[]) => {
        ;(ctxLogger as any)[level]({
          ...getMsg(...msg),
          request: ctx.req,
        })
      }
    }
    await next()
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
