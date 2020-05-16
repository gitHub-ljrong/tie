interface Value {
  path: string | string[]
  method: string
  view: string
  fn: (...args: any[]) => any
  target: Object
  propertyKey: string
}

class ActionStore {
  private key = Symbol('Tie#action')

  set(fn: any, value: Partial<Value>) {
    const oldValue = this.get(fn) || {}
    const newValue = { ...oldValue, ...value }
    Reflect.defineMetadata(this.key, newValue, fn)
  }

  get(fn: any): Value {
    return Reflect.getMetadata(this.key, fn)
  }
}

export const actionStore = new ActionStore()
