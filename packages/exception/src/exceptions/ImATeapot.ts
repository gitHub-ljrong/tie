import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { I_AM_A_TEAPOT } = HttpStatus

export class ImATeapot extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[I_AM_A_TEAPOT],
      type: options.type || HttpStatus[I_AM_A_TEAPOT],
      status: I_AM_A_TEAPOT,
    })
  }
}
