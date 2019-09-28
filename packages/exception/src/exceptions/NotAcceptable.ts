import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { NOT_ACCEPTABLE } = HttpStatus

export class NotAcceptable extends Exception {
  constructor(error: string, origin?: any) {
    super(NOT_ACCEPTABLE, error, HttpStatus[NOT_ACCEPTABLE], origin)
  }
}
