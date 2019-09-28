import { actionStore } from '../stores/actionStore'

export function Render(view: string) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    actionStore.set(descriptor.value, {
      target,
      propertyKey,
      view,
      fn: descriptor.value,
    })
  }
}
