import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { INTERNAL_SERVER_ERROR } = HttpStatus

export class InternalServerError extends Exception {
  constructor(error: string, origin?: any) {
    super(INTERNAL_SERVER_ERROR, error, HttpStatus[INTERNAL_SERVER_ERROR], origin)
  }
}
