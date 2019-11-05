import { Application } from './Application'

export type ConfigDidLoad = (app: Application) => Promise<any> | any
