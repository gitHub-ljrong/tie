import { paramTypes } from '../../constant'
import { createParamDecorator } from '../../utils/createParamDecorator'

export const Req = createParamDecorator(paramTypes.Req)
