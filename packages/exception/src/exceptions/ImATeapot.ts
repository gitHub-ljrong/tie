import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { I_AM_A_TEAPOT } = HttpStatus

export class ImATeapot extends Exception {
  constructor(error: string, origin?: any) {
    super(I_AM_A_TEAPOT, error, HttpStatus[I_AM_A_TEAPOT], origin)
  }
}
