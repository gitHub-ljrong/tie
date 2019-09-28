import { Controller, Get } from '../../../src'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    return 'hello world'
  }
}
