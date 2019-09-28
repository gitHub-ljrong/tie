import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { METHOD_NOT_ALLOWED } = HttpStatus

export class MethodNotAllowed extends Exception {
  constructor(error: string, origin?: any) {
    super(METHOD_NOT_ALLOWED, error, HttpStatus[METHOD_NOT_ALLOWED], origin)
  }
}
