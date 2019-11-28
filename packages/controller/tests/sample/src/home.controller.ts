import { Controller, Get } from '../../..'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    return 'hello world'
  }
}
