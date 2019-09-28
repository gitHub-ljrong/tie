import { join } from 'path'
import { sanControllerFiles } from '../../src/utils/sanControllerFiles'

describe('sanControllerFiles', () => {
  test('can fine controller files ', () => {
    const pattern = '**/*.controller.{ts,js}'
    const sampleDir = join(__dirname, '..', 'sample')
    const files = sanControllerFiles(pattern, sampleDir)
    expect(files.length).toEqual(1)
    expect(files[0].includes('home.controller.ts')).toBeTruthy()
  })

  test('can fine controller files with no cwd', () => {
    const pattern = '**/*.controller.{ts,js}'
    const files = sanControllerFiles(pattern)
    expect(files.length).toEqual(1)
    expect(files[0].includes('home.controller.ts')).toBeTruthy()
  })
})
