import { PluginConfig } from '@tiejs/common'
import { MyPlugin } from '../myPlugin'

export const plugins: PluginConfig = [
  {
    name: 'typeorm',
    package: '@tiejs/typeorm',
    enable: true,
  },

  {
    name: 'myPlugin',
    main: MyPlugin,
    prepend: true,
    enable: true,
  },
]
