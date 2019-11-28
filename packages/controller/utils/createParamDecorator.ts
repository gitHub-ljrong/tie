import { paramStore } from '../stores/paramStore'

export const createParamDecorator = (paramType: string) => {
  return (paramName: string = ''): ParameterDecorator => {
    return (target, propertyKey, index) => {
      const key = {
        paramType,
        controllerClass: target,
        method: propertyKey,
      }

      const params = {
        ...paramStore.get(key),
        [paramName]: index,
      }
      paramStore.set(key, params)
    }
  }
}
