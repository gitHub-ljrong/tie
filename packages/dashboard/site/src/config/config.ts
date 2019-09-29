import { Config } from '@peajs/core'

function handleResponse(result: any) {
  if (typeof result !== 'object') return result
  if (Object.keys(result).length === 1) {
    return result[Object.keys(result)[0]]
  }
  return result
}

const config: Partial<Config> = {
  rest: {
    endpoint: 'http://127.0.0.1:5001'
  },
  graphql: {
    endpoint: 'http://127.0.0.1:5001/graphql',
    interceptor: {
      responses: [handleResponse],
    },
  },
}

export default config
