export interface Options {
  code?: string // business error code
  type?: string // error type
  message?: string // error message
  origin?: any // origin error message
}

export interface Response extends Options {}

export interface ExceptionOptions extends Options {
  status?: number // httpStatus code
}

export class Exception extends Error {
  private status: number
  private response: Response

  constructor(options: ExceptionOptions) {
    super()
    this.status = options.status || 500
    this.response = {
      message: options.message || '',
      code: options.code || 'UnknownError',
      type: options.type,
      origin: options.origin || '',
    }
  }

  /**
   * response for client
   */
  getResponse() {
    return this.response
  }

  /**
   * http status code
   */
  getStatus(): number {
    return this.status
  }
}
