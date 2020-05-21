import { Exception, TieError } from '@tiejs/exception'

interface FormatedError {
  status: number
  body: TieError
}

export function formatError(error: any = {}): FormatedError {
  if (error instanceof Exception) {
    return {
      status: error.getStatus(),
      body: {
        status: error.getStatus(),
        ...error.getResponse(),
        stack: error.stack,
      },
    }
  }

  return {
    status: 500,
    body: {
      message: error.message || '',
      code: 'UnknownError',
      type: 'UnknownError',
      stack: error.stack,
      origin: error,
    },
  }
}
