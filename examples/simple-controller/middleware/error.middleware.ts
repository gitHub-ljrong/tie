import { Injectable, Context, NextFunction, IMiddleware } from '@tiejs/common'

@Injectable()
export default class MockMiddleware implements IMiddleware {
  async use(ctx: Context, next: NextFunction) {
    await next()

    // ctx.response.status = 400
  }
}
