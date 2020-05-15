import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { PAYLOAD_TOO_LARGE } = HttpStatus

export class PayloadTooLarge extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[PAYLOAD_TOO_LARGE],
      type: options.type || HttpStatus[PAYLOAD_TOO_LARGE],
      status: PAYLOAD_TOO_LARGE,
    })
  }
}
