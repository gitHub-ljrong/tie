import { PluginConfig } from '@tiejs/common'

export const builtinPlugins: PluginConfig = [
  {
    name: 'controller',
    enable: true,
    package: '@tiejs/controller',
  },
  {
    name: 'graphql',
    enable: true,
    package: '@tiejs/graphql',
  },
  {
    name: 'logger',
    enable: true,
    package: '@tiejs/logger',
  },
  {
    name: 'view',
    enable: true,
    package: '@tiejs/view',
  },
  {
    name: 'dashboard',
    enable: true,
    package: '@tiejs/dashboard',
  },
  {
    name: 'open',
    enable: true,
    package: '@tiejs/open',
  },
]
