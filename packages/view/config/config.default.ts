import { Injectable, Application, InjectApp } from '@tiejs/common'
import { join } from 'path'
import { ViewConfig } from '../interfaces/ViewConfig'

@Injectable()
export default class Config {
  constructor(@InjectApp() private app: Application) {}

  view: ViewConfig = {
    dir: join(this.app.baseDir, 'views'),
    map: {
      html: 'handlebars',
    },
  }
}
