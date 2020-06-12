import isPromise from 'is-promise'
import { EventStore } from './types'

class EventEmitter {
  eventStore: EventStore = {}

  emit = async (name: string, ...args: any[]) => {
    const result = this.eventStore[name](args)
    if (isPromise(result)) await result
  }
}

export const eventEmitter = new EventEmitter()
