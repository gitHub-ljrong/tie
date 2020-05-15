import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { NOT_ACCEPTABLE } = HttpStatus

export class NotAcceptable extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[NOT_ACCEPTABLE],
      type: options.type || HttpStatus[NOT_ACCEPTABLE],
      status: NOT_ACCEPTABLE,
    })
  }
}
