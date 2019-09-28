import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { GATEWAY_TIMEOUT } = HttpStatus

export class GatewayTimeout extends Exception {
  constructor(error: string, origin?: any) {
    super(GATEWAY_TIMEOUT, error, HttpStatus[GATEWAY_TIMEOUT], origin)
  }
}
