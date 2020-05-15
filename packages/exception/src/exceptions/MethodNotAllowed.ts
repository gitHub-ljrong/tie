import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { METHOD_NOT_ALLOWED } = HttpStatus

export class MethodNotAllowed extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[METHOD_NOT_ALLOWED],
      type: options.type || HttpStatus[METHOD_NOT_ALLOWED],
      status: METHOD_NOT_ALLOWED,
    })
  }
}
