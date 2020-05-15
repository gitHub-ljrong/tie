import { Container } from '@tiejs/common'
import { Logger } from 'ts-log-debug'
import { join } from 'path'

const file = 'request.log'

export function InjectRequestLogger(type = '') {
  return function(object: Object, propertyName: string, index?: number) {
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => {
        const logger = new Logger(type)
        const cwd = process.cwd()
        const filename = join(cwd, 'logs', file)
        logger.appenders.set('requestionLog', {
          type: 'file',
          filename,
          layout: {
            type: 'json',
            separator: ',',
          },
          pattern: '.yyyy-MM-dd',
        })

        return logger
      },
    })
  }
}
