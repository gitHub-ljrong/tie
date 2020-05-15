import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { BAD_REQUEST } = HttpStatus

export class BadRequest extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[BAD_REQUEST],
      type: options.type || HttpStatus[BAD_REQUEST],
      status: BAD_REQUEST,
    })
  }
}
