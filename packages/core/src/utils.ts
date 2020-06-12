import { PluginConfig } from '@tiejs/common'
import { defaultPlugins } from './defaultPlugins'

function sortPlugins(pluginConfig: PluginConfig) {
  const tails = ['controller', 'graphql', 'event', 'schedule']
  let head: PluginConfig = []
  let tail: PluginConfig = []

  for (const item of pluginConfig) {
    if (tails.includes(item.name)) {
      tail.push(item)
    } else {
      head.push(item)
    }
  }
  return [...head, ...tail]
}

export function getPluginConfig(pluginConfig: PluginConfig = []) {
  if (!pluginConfig.length) return defaultPlugins

  // can override default plugin
  for (const item of defaultPlugins) {
    const find = pluginConfig.find(i => i.name === item.name)
    if (find) continue

    pluginConfig.unshift(item)
  }

  pluginConfig = sortPlugins(pluginConfig)
  return pluginConfig
}
