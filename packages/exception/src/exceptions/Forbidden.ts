import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { FORBIDDEN } = HttpStatus

export class Forbidden extends Exception {
  constructor(error: string, origin?: any) {
    super(FORBIDDEN, error, HttpStatus[FORBIDDEN], origin)
  }
}
