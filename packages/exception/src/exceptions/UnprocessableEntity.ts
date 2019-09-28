import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { UNPROCESSABLE_ENTITY } = HttpStatus

export class UnprocessableEntity extends Exception {
  constructor(error: string, origin?: any) {
    super(UNPROCESSABLE_ENTITY, error, HttpStatus[UNPROCESSABLE_ENTITY], origin)
  }
}
