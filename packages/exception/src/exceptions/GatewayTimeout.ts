import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { GATEWAY_TIMEOUT } = HttpStatus

export class GatewayTimeout extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[GATEWAY_TIMEOUT],
      type: options.type || HttpStatus[GATEWAY_TIMEOUT],
      status: GATEWAY_TIMEOUT,
    })
  }
}
