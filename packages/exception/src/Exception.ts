export interface Response {
  code: string
  message: string
  origin?: any
}

export class Exception extends Error {
  constructor(
    private readonly status: number = 500, // httpStatus code
    private readonly error: string = '', // error message
    private readonly code: string = 'UNKNOWN_ERROR', // error type code
    private readonly origin?: any, // origin error message
  ) {
    super()
  }

  /**
   * response for client
   */
  getResponse() {
    return {
      code: this.code,
      message: this.error,
      origin: this.origin,
    }
  }

  /**
   * http status code
   */
  getStatus(): number {
    return this.status
  }
}
