import { Controller, Get, Render } from '@tiejs/controller'
import { Container, Application } from '@tiejs/common'

@Controller()
export class DashboardController {
  private app: Application
  constructor() {
    const app = Container.get<Application>('TIE_APP')
    this.app = app
  }

  @Get('/tie-dev-dashboard')
  @Render('tie-dev-dashboard')
  index() {
    return `hi dashboard`
  }

  @Get('/tie-dev-dashboard/api/getConfig')
  getConfig() {
    return this.app.config
  }
}
