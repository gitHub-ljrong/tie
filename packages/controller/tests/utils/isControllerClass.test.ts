import 'reflect-metadata'
import { isControllerClass } from '../../src/utils/isControllerClass'
import { Controller } from '../../src'

class Test1 {}

@Controller()
class Test2 {}

describe('isControllerClass()', () => {
  test('is not controllerClass', () => {
    expect(isControllerClass(Test1)).toBeFalsy()
  })

  test('is controllerClass', () => {
    expect(isControllerClass(Test2)).toBeTruthy()
  })
})
