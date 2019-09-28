import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { NOT_FOUND } = HttpStatus

export class NotFound extends Exception {
  constructor(error: string, origin?: any) {
    super(NOT_FOUND, error, HttpStatus[NOT_FOUND], origin)
  }
}
