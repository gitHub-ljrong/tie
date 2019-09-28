import {
  Injectable,
  IPlugin,
  PluginMiddleware,
  Request,
  Response,
  NextFunction,
} from '@tiejs/common'
import { ctxLogger } from './loggers/ctxLogger'
import { Logger } from 'ts-log-debug'

@Injectable()
export default class LoggerPlugin implements IPlugin {
  @PluginMiddleware({
    name: 'logger',
    apply: (middlewares: any) => {
      return ['logger', ...middlewares]
    },
  })
  async use(req: Request, _: Response, next: NextFunction) {
    req.logger = {} as Logger
    const levels = ['debug', 'info', 'trace', 'warn', 'error']
    for (const level of levels) {
      req.logger[level] = (...msg: any[]) => {
        ctxLogger[level]({
          ...getMsg(...msg),
          request: req,
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
