import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { UNAUTHORIZED } = HttpStatus

export class Unauthorized extends Exception {
  constructor(error: string, origin?: any) {
    super(UNAUTHORIZED, error, HttpStatus[UNAUTHORIZED], origin)
  }
}
