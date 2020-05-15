import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { UNSUPPORTED_MEDIA_TYPE } = HttpStatus

export class UnsupportedMediaType extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[UNSUPPORTED_MEDIA_TYPE],
      type: options.type || HttpStatus[UNSUPPORTED_MEDIA_TYPE],
      status: UNSUPPORTED_MEDIA_TYPE,
    })
  }
}
