import { Exception, Options } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { GONE } = HttpStatus

export class Gone extends Exception {
  constructor(options: Options) {
    super({
      ...options,
      code: options.code || HttpStatus[GONE],
      type: options.type || HttpStatus[GONE],
      status: GONE,
    })
  }
}
