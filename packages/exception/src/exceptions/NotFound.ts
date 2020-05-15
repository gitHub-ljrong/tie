import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { NOT_FOUND } = HttpStatus

export class NotFound extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[NOT_FOUND],
      type: options.type || HttpStatus[NOT_FOUND],
      status: NOT_FOUND,
    })
  }
}
