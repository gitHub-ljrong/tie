import { defaultPlugins } from './defaultPlugins'
import { PluginConfig } from '@tiejs/common'

export function getPluginConfig(pluginConfig: PluginConfig = []) {
  if (!pluginConfig.length) return defaultPlugins

  // can override default plugin
  for (const item of defaultPlugins) {
    const find = pluginConfig.find(i => i.name === item.name)
    if (find) continue

    pluginConfig.unshift(item)
  }

  /** controller and graphql plugin should be tail */
  const controllerIndex = pluginConfig.findIndex(item => item.name === 'controller')
  const controller = pluginConfig.splice(controllerIndex, 1)[0]
  pluginConfig.push(controller)

  const graphqlIndex = pluginConfig.findIndex(item => item.name === 'graphql')
  const graphql = pluginConfig.splice(graphqlIndex, 1)[0]
  pluginConfig.push(graphql)

  return pluginConfig
}
