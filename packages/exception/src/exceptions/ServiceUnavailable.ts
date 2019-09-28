import { Exception } from '../Exception'
import { HttpStatus } from '../HttpStatus.enum'

const { SERVICE_UNAVAILABLE } = HttpStatus

export class ServiceUnavailable extends Exception {
  constructor(error: string, origin?: any) {
    super(SERVICE_UNAVAILABLE, error, HttpStatus[SERVICE_UNAVAILABLE], origin)
  }
}
