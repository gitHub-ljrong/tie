interface Params {
  // paramName: index
  [paramName: string]: number
}

interface Target {
  paramType: any
  controllerClass: any
  method: any
}

export enum paramTypes {
  Query = 'Tie#Query',
  Body = 'Tie#Body',
  Params = 'Tie#Params',
  Cookie = 'Tie#Cookie',
  Method = 'Tie#Method',
  Session = 'Tie#Session',
  Ctx = 'Tie#Ctx',
  Req = 'Tie#Req',
  Res = 'Tie#Res',
  Header = 'Tie#Header',
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
