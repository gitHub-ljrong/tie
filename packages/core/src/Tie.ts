import express from 'express'
import { Server } from 'http'
import { Container, Application } from '@tiejs/common'
import { coreLogger } from '@tiejs/logger'
import { Loader } from './Loader'
import chalk from 'chalk'

const { cyan } = chalk

export interface Options {
  port: number
}

export class Tie {
  private static app: Application
  private static server: Server | null = null

  static t0 = Date.now()

  static getServer() {
    return Tie.server
  }

  static getApp() {
    return Tie.app
  }

  private static storeApp() {
    Container.set('TIE_APP', Tie.app)
  }

  static async listen(port = 5001) {
    const t1 = Date.now()
    const time = (t1 - Tie.t0) / 1000
    return new Promise(resolve => {
      const server = Tie.app.listen(port, () => {
        const msg = `server started on ${cyan(`http://127.0.0.1:${port}`)} (${time}s)`
        coreLogger.info(msg)

        // TODO: too hack
        Tie.app.pluginStore.forEach(item => {
          item.serverDidReady && item.serverDidReady.call(item.instance, Tie.app, server)
        })

        resolve(server)
      })
      return server
    })
  }

  static async bootstrap() {
    const expressApp: any = express()
    Tie.app = expressApp
    Tie.storeApp()

    const app = Tie.app

    await new Loader(app).init()
    await Tie.listen(5001)

    return Tie.app
  }
}
