import { Container, Application } from '@tiejs/common'
import get from 'lodash.get'

export function InjectConfig(key?: string) {
  return function(object: Object, propertyName: string, index?: number) {
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => {
        const app = Container.get<Application>('TIE_APP')
        const config = app.config
        if (!key) return config
        // TODO: should check key
        return get(config, key)
      },
    })
  }
}
