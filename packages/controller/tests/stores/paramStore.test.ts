import 'reflect-metadata'
import { paramStore, paramTypes } from '../../src/stores/paramStore'
import { Query } from '../../src'

class UserController {
  getUser(@Query() query: any) {
    return query
  }
}

const target = {
  paramType: paramTypes.Query,
  controllerClass: UserController,
  method: function getUser() {},
}

const value = { test: 123 }

describe('paramStore', () => {
  test('get "{}" if not set', () => {
    expect(paramStore.get(target)).toEqual({})
  })

  test('can get value if set', () => {
    paramStore.set(target, value)
    expect(paramStore.get(target)).toBe(value)
  })

  // TODO:
  test('getParamTypes', () => {
    expect(paramStore.getParamTypes(UserController, 'getUser')).toBeUndefined()
  })
})
