import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { CONFLICT } = HttpStatus

export class Conflict extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[CONFLICT],
      type: options.type || HttpStatus[CONFLICT],
      status: CONFLICT,
    })
  }
}
