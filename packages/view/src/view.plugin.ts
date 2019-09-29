import { Injectable, IPlugin, Application } from '@tiejs/common'
import { InjectConfig } from '@tiejs/config'
import cons from 'consolidate'
import { ViewConfig } from './interfaces/ViewConfig'

@Injectable()
export default class ViewPlugin implements IPlugin {
  constructor(@InjectConfig('view') private viewConfig: ViewConfig) {}

  async configDidLoad(app: Application) {
    const { dirs, engines } = this.viewConfig

    for (const key of Object.keys(engines)) {
      const engineName = engines[key]
      app.engine(key, cons[engineName])
      app.set('view engine', key)
    }

    app.set('views', dirs)
  }
}
