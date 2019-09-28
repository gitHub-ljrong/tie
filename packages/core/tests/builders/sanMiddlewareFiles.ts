// import { join } from 'path'
// import { sanMiddlewareFiles } from '../../src/registerMiddlewares/sanMiddlewareFiles'

// describe('sanMiddlewareFiles()', () => {
//   test('simple pattern', () => {
//     const cwd = process.cwd()
//     const projectDir = join(cwd, 'tests', 'sample')
//     const pattern = '**/*.middleware.{ts,js}'
//     const files = sanMiddlewareFiles(pattern, projectDir)
//     expect(Array.isArray(files)).toBeTruthy()
//     expect(Array.length).toEqual(1)
//   })

//   test('absolute pattern', () => {
//     const cwd = process.cwd()
//     const pattern = join(cwd, 'tests', 'sample', '**/*.middleware.{ts,js}')
//     const files = sanMiddlewareFiles(pattern)
//     expect(Array.isArray(files)).toBeTruthy()
//     expect(Array.length).toEqual(1)
//   })
// })
