import { Injectable, IPlugin, Application } from '@tiejs/common'
import { InjectConfig } from '@tiejs/config'
import open from 'open'
import { OpenConfig } from './interfaces/OpenConfig'

@Injectable()
export default class OpenPlugin implements IPlugin {
  constructor(@InjectConfig('open') private openConfig: OpenConfig) {}

  async serverDidReady(app: Application) {
    const { enable, url = `http://127.0.0.1:${app.port}` } = this.openConfig
    if (enable && app.env === 'development') {
      open(url)
    }
  }
}
