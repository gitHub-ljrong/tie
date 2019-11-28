import { Controller, Get } from '@tiejs/controller'
import { UserService } from './user.service'

@Controller()
export class HomeController {
  constructor(private userService: UserService) {}
  @Get('/')
  index() {
    return 'hello world'
  }

  @Get('/users')
  async users() {
    console.log('user control....');
    return await this.userService.queryUser()
  }

}
