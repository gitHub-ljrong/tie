import { controllerStore } from '../stores/controllerStore'

export function isControllerClass(controllerClass: any) {
  const data = controllerStore.get(controllerClass)

  return typeof data !== 'undefined'
}
