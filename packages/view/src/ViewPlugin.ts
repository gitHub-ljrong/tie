import { Injectable, IPlugin, Application, InjectApp } from '@tiejs/common'
import { InjectConfig } from '@tiejs/config'
import { join } from 'path'
import views from 'koa-views'

import { ViewConfig } from './interfaces/ViewConfig'

@Injectable()
export class ViewPlugin implements IPlugin {
  config: ViewConfig
  constructor(
    @InjectConfig('view') private viewConfig: ViewConfig,
    @InjectApp() private app: Application,
  ) {
    const defaultConfig: ViewConfig = {
      dir: join(this.app.baseDir, 'views'),
      map: { html: 'handlebars' },
    }

    this.config = { ...defaultConfig, ...this.viewConfig }
  }

  async configDidLoad(app: Application) {
    const { dir, map } = this.config

    app.use(
      views(dir, {
        map,
      }),
    )
  }
}
