import { getControllerClass } from '../../src/utils/getControllerClass'

describe('isControllerClass()', () => {
  test('is not controllerClass', () => {
    const pattern = '**/*.controller.{ts,js}'
    const classes = getControllerClass(pattern)
    expect(classes.length).toEqual(1)
  })
})
