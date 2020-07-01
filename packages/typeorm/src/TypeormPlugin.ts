import { Injectable, IPlugin, Application, Container } from '@tiejs/common'
import {
  createConnection,
  useContainer,
  getMetadataArgsStorage,
  getCustomRepository,
} from 'typeorm'
import { InjectLogger, Logger } from '@tiejs/logger'

@Injectable()
export class TypeormPlugin implements IPlugin {
  constructor(@InjectLogger('@tiejs/typeorm') private logger: Logger) {}

  async appDidReady(app: Application) {
    await this.connectDB(app)
  }

  private isEntityRepositories(service: any) {
    const { entityRepositories = [] } = getMetadataArgsStorage()
    return !!entityRepositories.find(i => i.target === service.type)
  }

  // 黑科技
  private hackEntityRepository() {
    const container: any = Container.of(undefined) || {}
    const { services = [] } = container

    for (const service of services) {
      if (this.isEntityRepositories(service)) {
        service.value = getCustomRepository(service.type)
      }
    }
  }

  private async connectDB(app: Application) {
    const config = app.config.typeorm
    useContainer(Container)
    if (!config) {
      this.logger.error('database config not found')
    }

    try {
      await createConnection(config)
      this.logger.info('database connect success')
      this.hackEntityRepository()
    } catch (error) {
      this.logger.error('database connect fail')
      this.logger.error(error)
    }
  }
}
