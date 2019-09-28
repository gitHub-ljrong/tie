import { Injectable } from '@tiejs/common'
import { controllerStore } from '../stores/controllerStore'

export function Controller(basePath: string = ''): ClassDecorator {
  return (target): void => {
    Injectable.apply(null)(target)

    controllerStore.set(target, basePath)
  }
}
