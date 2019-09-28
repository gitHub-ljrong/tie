import 'reflect-metadata'
import { RouteBuilder } from '../src/RouteBuilder'

import { Controller, Get } from '../src'

@Controller('base')
export class HomeController {
  @Get('user/')
  index() {
    return 'hello world'
  }

  other() {
    return 'other'
  }
}

const classes = [HomeController]
const instance = new RouteBuilder(classes)

describe('RouteBuilder', () => {
  test('buildRoutes', () => {
    const routes = instance.buildRoutes()
    const route = routes[0]
    expect(routes.length).toEqual(1)
    expect(route.method).toEqual('get')
    expect(route.path).toEqual('/base/user')
  })

  test('mergePath', () => {
    const { mergePath } = instance
    expect(mergePath('', '')).toEqual('/')
    expect(mergePath('/', '')).toEqual('/')
    expect(mergePath('', '/')).toEqual('/')
    expect(mergePath('/', '/')).toEqual('/')
    expect(mergePath('base', '')).toEqual('/base')
    expect(mergePath('base', '')).toEqual('/base')
    expect(mergePath('/base', '')).toEqual('/base')
    expect(mergePath('/base/', '')).toEqual('/base')
    expect(mergePath('/base/', '')).toEqual('/base')
    expect(mergePath('base', 'user')).toEqual('/base/user')
    expect(mergePath('/base', 'user')).toEqual('/base/user')
    expect(mergePath('/base/', 'user')).toEqual('/base/user')
    expect(mergePath('/base', '/user')).toEqual('/base/user')
    expect(mergePath('/base/', '/user')).toEqual('/base/user')
  })
})
