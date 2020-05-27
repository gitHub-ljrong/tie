interface Params {
  // paramName: index
  [paramName: string]: number
}

interface Target {
  paramType: any
  controllerClass: any
  method: any
}

class ParamStore {
  set(target: Target, value: Params) {
    Reflect.defineMetadata(target.paramType, value, target.controllerClass, target.method)
  }

  get(target: Target): Params {
    return Reflect.getMetadata(target.paramType, target.controllerClass, target.method) || {}
  }

  getParamTypes(controllerClass: any, propertyKey: string) {
    return Reflect.getMetadata('design:paramtypes', controllerClass, propertyKey)
  }
}

export const paramStore = new ParamStore()
