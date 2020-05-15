import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { INTERNAL_SERVER_ERROR } = HttpStatus

export class InternalServerError extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[INTERNAL_SERVER_ERROR],
      type: options.type || HttpStatus[INTERNAL_SERVER_ERROR],
      status: INTERNAL_SERVER_ERROR,
    })
  }
}
