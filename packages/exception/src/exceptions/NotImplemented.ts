import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { NOT_IMPLEMENTED } = HttpStatus

export class NotImplemented extends Exception {
  constructor(error: string, origin?: any) {
    super(NOT_IMPLEMENTED, error, HttpStatus[NOT_IMPLEMENTED], origin)
  }
}
