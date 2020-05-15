import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { UNAUTHORIZED } = HttpStatus

export class Unauthorized extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[UNAUTHORIZED],
      type: options.type || HttpStatus[UNAUTHORIZED],
      status: UNAUTHORIZED,
    })
  }
}
