import { PluginConfig } from '@tiejs/common'

export const defaultPlugins: PluginConfig = [
  {
    name: 'controller',
    package: '@tiejs/controller',
    enable: true,
  },
  {
    name: 'graphql',
    package: '@tiejs/graphql',
    enable: true,
  },
  {
    name: 'logger',
    package: '@tiejs/logger',
    enable: true,
  },
]
