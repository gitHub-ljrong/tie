import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { BAD_REQUEST } = HttpStatus

export class BadRequest extends Exception {
  constructor(error: string, origin?: any) {
    super(BAD_REQUEST, error, HttpStatus[BAD_REQUEST], origin)
  }
}
