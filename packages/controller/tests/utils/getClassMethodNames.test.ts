import 'reflect-metadata'
import { getClassMethodNames } from '../../utils/getClassMethodNames'

class Test {
  constructor() {}
  p1 = 'p1'
  method1() {}
  method2() {}
}

describe('getClassMethodNames', () => {
  test('can getClassMethodNames', () => {
    const names = getClassMethodNames(Test)
    expect(names).toEqual(['method1', 'method2'])
  })
})
