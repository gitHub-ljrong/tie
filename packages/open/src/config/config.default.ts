import { Injectable } from '@tiejs/common'
import { OpenConfig } from '../interfaces/OpenConfig'

@Injectable()
export default class Config {
  open: OpenConfig = {
    enable: true,
  }
}
