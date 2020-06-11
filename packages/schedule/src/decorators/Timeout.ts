import { methodStore } from '../methodStore'
import { CronOptions } from '../types'

export function Timeout(time: number, options = {} as CronOptions): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    methodStore.set(descriptor.value, {
      taskType: 'timeout',
      time,
      timerOptions: options,
      fn: descriptor.value,
      target,
      propertyKey,
    })
  }
}
