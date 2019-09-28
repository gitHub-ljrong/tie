import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { PAYLOAD_TOO_LARGE } = HttpStatus

export class PayloadTooLarge extends Exception {
  constructor(error: string, origin?: any) {
    super(PAYLOAD_TOO_LARGE, error, HttpStatus[PAYLOAD_TOO_LARGE], origin)
  }
}
