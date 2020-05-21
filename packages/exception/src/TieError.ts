export class TieError {
  /**
   *  Human-readable error message
   */
  message?: any

  /**
   *  http status code
   */
  status?: number

  /**
   *  Business error code, eg: USER_NO_FOUND、TOKEN_INVALID
   */
  code?: string

  /**
   *  Error type for category
   */
  type?: string

  /**
   *  Error stack
   */
  stack?: string

  /**
   *  original Error Object
   */
  origin?: any
}
