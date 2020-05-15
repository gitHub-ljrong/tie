import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { UNPROCESSABLE_ENTITY } = HttpStatus

export class UnprocessableEntity extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[UNPROCESSABLE_ENTITY],
      type: options.type || HttpStatus[UNPROCESSABLE_ENTITY],
      status: UNPROCESSABLE_ENTITY,
    })
  }
}
