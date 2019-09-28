import { Controller, Get } from '@tiejs/controller'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    return 'Hi '
  }

  @Get('/user')
  getUser() {
    return 'Hello Jack'
  }
}
