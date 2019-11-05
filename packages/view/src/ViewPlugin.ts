import { Injectable, IPlugin, Application } from '@tiejs/common'
import { InjectConfig } from '@tiejs/config'
import views from 'koa-views'

import { ViewConfig } from './interfaces/ViewConfig'

@Injectable()
export class ViewPlugin implements IPlugin {
  constructor(@InjectConfig('view') private viewConfig: ViewConfig) {}

  async configDidLoad(app: Application) {
    if (!this.viewConfig) {
      return
    }
    const { dir, map } = this.viewConfig

    app.use(
      views(dir, {
        map,
      }),
    )
  }
}
