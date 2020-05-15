import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { BAD_GATEWAY } = HttpStatus

export class BadGateway extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[BAD_GATEWAY],
      type: options.type || HttpStatus[BAD_GATEWAY],
      status: BAD_GATEWAY,
    })
  }
}
