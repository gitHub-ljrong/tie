import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { UNSUPPORTED_MEDIA_TYPE } = HttpStatus

export class UnsupportedMediaType extends Exception {
  constructor(error: string, origin?: any) {
    super(UNSUPPORTED_MEDIA_TYPE, error, HttpStatus[UNSUPPORTED_MEDIA_TYPE], origin)
  }
}
