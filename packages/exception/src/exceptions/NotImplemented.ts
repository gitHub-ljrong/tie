import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { NOT_IMPLEMENTED } = HttpStatus

export class NotImplemented extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[NOT_IMPLEMENTED],
      type: options.type || HttpStatus[NOT_IMPLEMENTED],
      status: NOT_IMPLEMENTED,
    })
  }
}
