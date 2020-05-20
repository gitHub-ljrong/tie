import { PluginConfig } from '@tiejs/common'

export const defaultPlugins: PluginConfig = [
  {
    name: 'logger',
    package: '@tiejs/logger',
    enable: true,
  },
  {
    name: 'view',
    package: '@tiejs/view',
    enable: true,
  },
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
]
