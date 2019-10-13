import { Injectable, IPlugin, Application } from '@tiejs/common'
import { GraphqlService } from './GraphqlService'

@Injectable()
export class GraphqlPlugin implements IPlugin {
  constructor(private graphqlService: GraphqlService) {}

  apollerServer: any

  async appDidReady(app: Application) {
    this.apollerServer = await this.graphqlService.startServer(app)
  }
}
