import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { GONE } = HttpStatus

export class Gone extends Exception {
  constructor(error: string, origin?: any) {
    super(GONE, error, HttpStatus[GONE], origin)
  }
}
