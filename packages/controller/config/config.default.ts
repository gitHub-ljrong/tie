import { Injectable } from '@tiejs/common'

import { Options } from 'koa-bodyparser'

@Injectable()
export default class Config {
  controller = {
    patterns: ['**/*.controller.{ts,js}'],
  }

  body: Options = {
    encode: 'utf-8',
  }
}
