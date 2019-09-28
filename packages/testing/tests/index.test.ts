import { greet } from '../src/index'

describe('Test lib', () => {
  test('greet()', () => {
    expect(greet()).toEqual('hello')
  })
})
