import { MiddlewareConfig } from '@tiejs/common'

// const cors = require('@koa/cors')
import cors from '@koa/cors'

const config: MiddlewareConfig = [
  {
    name: 'error',
  },
  {
    name: 'cors',
    use: cors({
      origin: '*',
      exposeHeaders: 'hello',
      allowHeaders: 'hello',
      // credentials: true,
      keepHeadersOnError: false,
    }),
  },
]

export default config
