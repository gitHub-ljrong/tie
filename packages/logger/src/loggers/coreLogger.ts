import { Logger } from '@tsed/logger'
import { join } from 'path'

export const coreLogger = new Logger('Tie core')
const cwd = process.cwd()
const filename = join(cwd, 'logs', 'web.log')

coreLogger.appenders
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
