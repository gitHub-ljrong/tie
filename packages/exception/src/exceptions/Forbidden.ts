import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { FORBIDDEN } = HttpStatus

export class Forbidden extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[FORBIDDEN],
      type: options.type || HttpStatus[FORBIDDEN],
      status: FORBIDDEN,
    })
  }
}
