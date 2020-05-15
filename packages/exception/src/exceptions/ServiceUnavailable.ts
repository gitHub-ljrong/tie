import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { SERVICE_UNAVAILABLE } = HttpStatus

export class ServiceUnavailable extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[SERVICE_UNAVAILABLE],
      type: options.type || HttpStatus[SERVICE_UNAVAILABLE],
      status: SERVICE_UNAVAILABLE,
    })
  }
}
