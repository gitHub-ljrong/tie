import { PluginConfig } from '@tiejs/common'

export const builtinPlugins: PluginConfig = [
  {
    package: '@tiejs/controller',
    enable: true,
  },
  {
    package: '@tiejs/graphql',
    enable: true,
  },
  {
    package: '@tiejs/logger',
    enable: true,
  },
  {
    package: '@tiejs/dashboard',
    enable: true,
  },
  {
    package: '@tiejs/view',
    enable: true,
  },
  // {
  //   package: '@tiejs/open',
  //   enable: true,
  // },
  {
    package: '@tiejs/onerror',
    enable: true,
  },
]
