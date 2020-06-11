import { Injectable, IPlugin, Container, InjectApp, Application } from '@tiejs/common'
import cron from 'node-cron'
import { methodStore } from './methodStore'
import { getClassMethodNames } from './utils/getClassMethodNames'
import { MethodStoreValue, CronJob } from './types'

@Injectable()
export class SchedulePlugin implements IPlugin {
  constructor(@InjectApp() private app: Application) {
    const { config } = this.app
    if (!config.cronJobs) config.cronJobs = {}
  }

  cron(instance: any, value: MethodStoreValue) {
    const { config } = this.app
    const { cronTime, cronOptions, propertyKey } = value
    const job = cron.schedule(cronTime, () => instance[propertyKey](), {
      scheduled: !cronOptions.lazy,
    })

    const name = cronOptions.name || propertyKey
    config.cronJobs[name] = job
    config.cronJobs[name].running = job.getStatus() === 'scheduled'
  }

  timeout(instance: any, value: MethodStoreValue) {
    const { config } = this.app
    const { time, timerOptions, propertyKey } = value
    const name = timerOptions.name || propertyKey
    let id: any = null

    if (!timerOptions.lazy) {
      id = setTimeout(() => instance[propertyKey](), time)
    }

    config.cronJobs[name] = {
      running: false,
      start() {
        if (this.running) return
        id = setTimeout(() => instance[propertyKey](), time)
        this.running = true
        return this
      },
      stop() {
        if (!id) return
        clearTimeout(id)
        this.running = false
        return this
      },
    } as CronJob
  }

  interval(instance: any, value: MethodStoreValue) {
    const { config } = this.app
    const { time, timerOptions, propertyKey } = value
    const name = timerOptions.name || propertyKey
    let id: any = null

    if (!timerOptions.lazy) {
      id = setInterval(() => instance[propertyKey](), time)
    }

    config.cronJobs[name] = {
      running: false,
      start() {
        if (this.running) return
        id = setInterval(() => instance[propertyKey](), time)
        this.running = true
        return this
      },
      stop() {
        if (!id) return
        clearInterval(id)
        this.running = false
        return this
      },
    } as CronJob
  }

  async appDidReady(app: Application) {
    const { schedules = [] } = app.config
    for (const ScheduleClass of schedules) {
      let instance = Container.get<any>(ScheduleClass)
      const methodNames = getClassMethodNames(ScheduleClass)

      for (const methodName of methodNames) {
        const fn = instance[methodName]
        const value = methodStore.get(fn)
        this[value.taskType](instance, value)
      }
    }
  }
}
