import { Injectable, IPlugin } from '@tiejs/common'

@Injectable()
export class MyPlugin implements IPlugin {
  appDidReady() {
    console.log('-------')
  }
}
