import { Injectable } from '@tiejs/common'
import { Exception } from '@tiejs/exception'
import { Request, Response, NextFunction } from 'express'
import { OnErrorConfig } from '../interfaces/OnErrorConfig'

@Injectable()
export default class Config {
  onerror: OnErrorConfig = {
    handler(err: any, _: Request, res: Response, next: NextFunction) {
      if (err instanceof Exception) {
        res.status(err.getStatus())
        res.send(err.getResponse())
      } else {
        res.status(500)
        res.send(err)
      }
      next()
    },
  }
}
