/**
 *  store `basePath` from controller
 */
class ControllerStore {
  private key = Symbol('Tie#controller')

  set(controllerClass: any, basePath: string = '') {
    Reflect.defineMetadata(this.key, basePath, controllerClass)
  }

  get(controllerClass: any) {
    return Reflect.getMetadata(this.key, controllerClass)
  }
}

export const controllerStore = new ControllerStore()
