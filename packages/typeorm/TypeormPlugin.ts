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

    const config = this.handleConfig(app.config.typeorm, app.config.env)
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

  private handleConfig(config: any, env: string) {
    if (env !== 'production') {
      return config
    }
    const keys = ['entities', 'migrations', 'subscribers']
    for (const key of keys) {
      if (config[key]) {
        const newValue = config[key].map((item: string) => item.replace(/\.ts$/, '.js'))
        config[key] = newValue
      }
    }
    return config
  }
}
