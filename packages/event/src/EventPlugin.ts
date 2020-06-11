import { Injectable, IPlugin, Container, InjectApp, Application } from '@tiejs/common'
import EventEmitter from 'eventemitter3'
import { methodStore } from './methodStore'
import { getClassMethodNames } from './utils/getClassMethodNames'
import { EventConfig } from './types'

@Injectable()
export class EventPlugin implements IPlugin {
  constructor(@InjectApp() private app: Application) {
    const { config } = this.app

    // TODO: 是不是不应该挂载在 config
    if (!config.eventEmitter) config.eventEmitter = new EventEmitter()
  }

  async appDidReady(app: Application) {
    const eventConfig: EventConfig = app.config.event
    let { events = [], enable } = eventConfig
    console.log('events-----------:', events)

    if (!Reflect.has(eventConfig, 'enable')) enable = true // 默认 enable 为 true
    if (!enable) return // enable = false 时，不执行定时任务

    for (const EventClass of events) {
      let instance = Container.get<any>(EventClass)
      const methodNames = getClassMethodNames(EventClass)

      for (const methodName of methodNames) {
        const fn = instance[methodName]
        const value = methodStore.get(fn)
        // only @on() decorator
        if (value) {
          app.config.eventEmitter.on(value.name, fn.bind(instance))
        }
      }
    }
  }
}