import 'reflect-metadata'
import { methodStore } from '../../src/stores/methodStore'

const fn = () => {}
const value = {
  path: '/users',
  method: 'get',
}

describe('methodStore', () => {
  test('get undefined if not set', () => {
    expect(methodStore.get(fn)).toBeUndefined()
  })

  test('can get value if set', () => {
    methodStore.set(fn, value)
    expect(methodStore.get(fn)).toBe(value)
  })
})
