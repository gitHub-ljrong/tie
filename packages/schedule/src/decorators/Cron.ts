import { methodStore } from '../methodStore'
import { CronOptions } from '../types'

export function Cron(cronTime: string, cronOptions = {} as CronOptions): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    methodStore.set(descriptor.value, {
      taskType: 'cron',
      cronTime,
      cronOptions,
      fn: descriptor.value,
      target,
      propertyKey,
    })
  }
}
