import { Request, Response, NextFunction } from 'express'

export interface OnErrorConfig {
  handler: (err: any, _: Request, res: Response, next: NextFunction) => any
}
