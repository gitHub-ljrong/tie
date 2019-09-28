import { Injectable } from '@tiejs/common'

@Injectable()
export default class LoggerMiddleware {
  async use(_, next) {
    console.log('logger..........')
    await next()
  }
}
