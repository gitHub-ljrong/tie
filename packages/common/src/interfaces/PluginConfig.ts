export type PluginConfig = PluginConfigItem[]

export type PluginConfigItem = {
  /** plugin unique ID */
  name: string

  enable?: boolean

  /** npm module name */
  package?: string

  path?: string

  /** plugin module, an Injectable PluginClass */
  main?: any

  /**
   * 是否应该前置
   */
  prepend?: boolean
}
