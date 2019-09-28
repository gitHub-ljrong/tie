import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { BAD_GATEWAY } = HttpStatus

export class BadGateway extends Exception {
  constructor(error: string, origin?: any) {
    super(BAD_GATEWAY, error, HttpStatus[BAD_GATEWAY], origin)
  }
}
