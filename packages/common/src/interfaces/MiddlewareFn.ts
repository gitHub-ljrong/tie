import { Request } from './Request'
import { Response } from './Response'
import { NextFunction } from './NextFunction'

export type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => any | void
