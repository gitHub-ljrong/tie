import { isPromise } from '../../src/utils/isPromise'

describe('isPromise()', () => {
  test('is not promise', () => {
    const fn = () => {}
    expect(isPromise(fn())).toBeFalsy()
  })

  test('is promise', () => {
    const fn = async () => {}
    expect(isPromise(fn())).toBeTruthy()
  })
})
