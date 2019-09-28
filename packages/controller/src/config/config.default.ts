import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  controller = {
    patterns: ['**/*.controller.{ts,js}'],
  }
}
