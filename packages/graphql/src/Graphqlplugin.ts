import { ApolloServer } from 'apollo-server-koa'
import { Injectable, IPlugin } from '@tiejs/common'
import { GraphqlService } from './GraphqlService'
import { Server } from 'http'

@Injectable()
export class GraphqlPlugin implements IPlugin {
  constructor(private graphqlService: GraphqlService) {}

  apollerServer: ApolloServer | null = null

  async middlewareDidReady() {
    this.apollerServer = await this.graphqlService.startServer()
  }

  async serverDidReady(_: any, server: Server) {
    if (this.apollerServer) {
      this.apollerServer.installSubscriptionHandlers(server)
    }
  }
}
