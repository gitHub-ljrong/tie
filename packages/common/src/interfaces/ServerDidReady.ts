import { Application } from './Application'
import { Server } from 'http'

export type ServerDidReady = (app: Application, server: Server) => Promise<any>
