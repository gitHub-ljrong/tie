import { Logger } from '@tsed/logger'
import { join } from 'path'

export const ctxLogger = new Logger('Tie request log')
const cwd = process.cwd()
const filename = join(cwd, 'logs', 'request.log')

ctxLogger.appenders
  .set('std-log', {
    type: 'stdout',
    levels: ['debug', 'info', 'trace', 'warn', 'error'],
  })
  .set('all-log-file', {
    type: 'file',
    filename,
    layout: {
      type: 'json',
      separator: ',',
      maxLogSize: 10485760,
      backups: 3,
    },
  })
