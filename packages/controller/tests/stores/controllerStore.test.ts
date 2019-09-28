import 'reflect-metadata'
import { controllerStore } from '../../src/stores/controllerStore'

class Test {}

describe('controllerStore', () => {
  test('get undefined if not set', () => {
    expect(controllerStore.get(Test)).toBeUndefined()
  })

  test('get basePath if set', () => {
    const basePath = '/test'
    controllerStore.set(Test, basePath)
    expect(controllerStore.get(Test)).toBe(basePath)
  })

  test('get basePath default value if set undefined', () => {
    controllerStore.set(Test)
    const defaultValue = ''
    expect(controllerStore.get(Test)).toBe(defaultValue)
  })
})
