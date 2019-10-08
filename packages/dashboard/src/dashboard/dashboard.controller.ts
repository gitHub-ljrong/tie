import { Controller, Get, Render } from '@tiejs/controller'
import { Container, Application } from '@tiejs/common'
import { tiePath } from './constant'

@Controller()
export class DashboardController {
  private app: Application
  constructor() {
    const app = Container.get<Application>('TIE_APP')
    this.app = app
  }

  @Get(`/${tiePath}`)
  @Render(tiePath)
  index() {
    return `hi dashboard`
  }

  @Get(`/${tiePath}/*`)
  @Render(tiePath)
  dahshboard() {
    return `hi dashboard`
  }

  @Get('/api/getTieConfig')
  getConfig() {
    return this.app.config
  }
}
