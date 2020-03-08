export type PluginConfig = PluginConfigItem[]

export type PluginConfigItem = {
  enable?: boolean

  /** npm module name */
  package?: string

  path?: string

  /** plugin module, an Injectable PluginClass */
  main?: any
}
