import { actionStore } from '../stores/actionStore'

export const createMethodDecorator = (method: string) => {
  return (path: string) => {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
      actionStore.set(descriptor.value, {
        target,
        propertyKey,
        path,
        method,
        fn: descriptor.value,
      })
    }
  }
}
