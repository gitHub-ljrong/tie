import { Injectable, IPlugin, Application } from '@tiejs/common'

@Injectable()
export default class GraphqlPlugin implements IPlugin {
  async appDidReady(app: Application) {
    console.log(app)
  }
}
