import { Application } from './Application'

export type AppDidReady = (app: Application) => Promise<any>
