import { IMiddleware } from './IMiddleware'

interface ClassType<T = any> {
  new (...args: any[]): T
}

export type MiddlewareClass = ClassType<IMiddleware>
