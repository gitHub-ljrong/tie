import { Context } from './Context'
import { NextFunction } from './NextFunction'

export type MiddlewareFn = (ctx: Context, next: NextFunction) => any | void
