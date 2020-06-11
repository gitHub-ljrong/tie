import { methodStore } from '../methodStore'
import { CronOptions } from '../types'

export function Interval(time: number, options = {} as CronOptions): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    methodStore.set(descriptor.value, {
      taskType: 'interval',
      time,
      timerOptions: options,
      fn: descriptor.value,
      target,
      propertyKey,
    })
  }
}
