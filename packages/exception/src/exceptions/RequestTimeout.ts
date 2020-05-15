import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { REQUEST_TIMEOUT } = HttpStatus

export class RequestTimeout extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[REQUEST_TIMEOUT],
      type: options.type || HttpStatus[REQUEST_TIMEOUT],
      status: REQUEST_TIMEOUT,
    })
  }
}
