import { Injectable, IPlugin, Application, Container } from '@tiejs/common'
import { createConnection, useContainer } from 'typeorm'
import { InjectLogger, Logger } from '@tiejs/logger'

@Injectable()
export class TypeormPlugin implements IPlugin {
  constructor(@InjectLogger('@tiejs/typeorm') private logger: Logger) {}

  async appDidReady(app: Application) {
    await this.connectDB(app)
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
    } catch (error) {
      this.logger.error('database connect fail')
      this.logger.error(error)
    }
  }
}
