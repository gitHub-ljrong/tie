import 'reflect-metadata'
import { Container } from '@tiejs/common'
import ControllerPlugin from '../src/controller.plugin'

describe('RouteBuilder', () => {
  test('buildRoutes', async () => {
    const plugin = Container.get(ControllerPlugin)

    // plugin.appDidReady
    expect(plugin.router).toBeUndefined()
    await plugin.appDidReady()
    expect(plugin.router.stack.length).toEqual(1)
  })
})
