import { Context as Ctx, Request as Req, Response as Res } from 'koa'
import { Logger } from '@tsed/logger'

export interface Request extends Req {
  body: any
}

export interface Response extends Res {}

export interface Context extends Ctx {
  [key: string]: any

  request: Request

  response: Response

  logger: Logger
}
