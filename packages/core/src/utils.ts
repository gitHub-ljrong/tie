import { defaultPlugins } from './defaultPlugins'
import { PluginConfig } from '@tiejs/common'

export function getPluginConfig(pluginConfig: PluginConfig = []) {
  if (!pluginConfig.length) return defaultPlugins

  // can override default plugin
  for (const item of defaultPlugins) {
    const find = pluginConfig.find(i => i.name === item.name)
    if (find) continue

    // controller and graphql plugin should be tail
    if (['controller', 'graphql'].includes(item.name)) {
      pluginConfig.push(item)
    } else {
      pluginConfig.unshift(item)
    }
  }

  return pluginConfig
}
