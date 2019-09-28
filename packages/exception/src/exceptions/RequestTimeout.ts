import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { REQUEST_TIMEOUT } = HttpStatus

export class RequestTimeout extends Exception {
  constructor(error: string, origin?: any) {
    super(REQUEST_TIMEOUT, error, HttpStatus[REQUEST_TIMEOUT], origin)
  }
}
