import 'reflect-metadata'
import { ControllerPlugin } from './ControllerPlugin'

export * from './decorators/Controller'

// method
export * from './decorators/methods/Get'
export * from './decorators/methods/Post'
export * from './decorators/methods/Patch'
export * from './decorators/methods/Put'
export * from './decorators/methods/Delete'

export * from './decorators/Render'

// params
export * from './decorators/params/Query'
export * from './decorators/params/Body'
export * from './decorators/params/Params'
export * from './decorators/params/Cookie'
export * from './decorators/params/Session'
export * from './decorators/params/Ctx'
export * from './decorators/params/Next'
export * from './decorators/params/Req'
export * from './decorators/params/Res'
export * from './decorators/params/Header'

export * from './interfaces/ControllerConfig'

export * from './constant'

export default ControllerPlugin
