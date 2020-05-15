export { Logger } from 'ts-log-debug'
import { LoggerPlugin } from './LoggerPlugin'
export { coreLogger } from './loggers/coreLogger'
export { ctxLogger } from './loggers/ctxLogger'
export { appLogger } from './loggers/appLogger'
export { InjectLogger } from './decorators/InjectLogger'
export { InjectRequestLogger } from './decorators/InjectRequestLogger'

export default LoggerPlugin
