import { Application } from './Application'

export type MiddlewareDidReady = (app: Application) => Promise<any> | any
