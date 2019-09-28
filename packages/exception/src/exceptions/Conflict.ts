import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { CONFLICT } = HttpStatus

export class Conflict extends Exception {
  constructor(error: string, origin?: any) {
    super(CONFLICT, error, HttpStatus[CONFLICT], origin)
  }
}
