export interface Options {
  code?: string // error code
  type?: string // error type，分类
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
    this.status = options.status || 600
    this.response = {
      message: options.message || '',
      code: options.code || 'UnknownError',
      origin: options.origin || '',
      type: options.type,
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
