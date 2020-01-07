import { Application, Container, PluginConfig, MiddlewareConfig } from '@tiejs/common'
import { join } from 'path'
import globby from 'globby'
import { builtinPlugins } from './builtinPlugins'

const extend = require('extend2')

export class ConfigLoader {
  private env: string
  private ext: string
  private baseDir: string

  constructor(private app: Application) {
    const { env = 'development' } = this.app
    this.env = env
    this.ext = env === 'production' ? 'js' : 'ts'
    this.baseDir = app.baseDir
  }

  private mergePluginConfig(builtinPlugins: PluginConfig, userPlugins: PluginConfig): PluginConfig {
    return [...builtinPlugins, ...userPlugins]
  }

  loadConfig() {
    let envConfig = this.getLocalConfigByPattern(`config/config.${this.env}.${this.ext}`)
    let defaultConfig = this.getLocalConfigByPattern(`config/config.default.${this.ext}`)
    const pluginConfig = this.getConfigFromPlugin(this.env, this.baseDir)
    return extend(true, pluginConfig, defaultConfig, envConfig)
  }

  loadPluginConfig(): PluginConfig {
    const configPath = join(this.baseDir, 'config', `plugin.${this.ext}`)
    let config: any
    try {
      config = require(configPath).default
    } catch (error) {
      config = []
    }

    const plugins = this.mergePluginConfig(builtinPlugins, config)
    return plugins.filter(i => i.enable)
  }

  loadMiddlewareConfig(): MiddlewareConfig {
    const configPath = join(this.baseDir, 'config', `middleware.${this.ext}`)
    try {
      return require(configPath).default
    } catch (error) {
      return []
    }
  }

  private globLocalConfigFiles(patterns: string, cwd: string = process.cwd()) {
    const paths = globby.sync(patterns, {
      ignore: ['**/node_modules/**'],
      absolute: true,
      onlyFiles: true,
      cwd,
    })
    return paths
  }

  private getConfigByPath(path: string) {
    try {
      const ConfigClass = require(path).default
      return Container.get(ConfigClass)
    } catch (error) {
      return {}
    }
  }

  private getLocalConfigByPattern(patterns: string, cwd: string = process.cwd()) {
    const files = this.globLocalConfigFiles(patterns, cwd)
    if (!files.length) return {}
    return this.getConfigByPath(files[0])
  }

  private getConfigFromPlugin(env: string, baseDir: string) {
    let config: any
    const pluginConfig = this.loadPluginConfig()

    for (const item of pluginConfig) {
      if (!item.package) continue
      const packageDir = join(baseDir, 'node_modules', item.package)
      let envConfig = this.getConfigByPath(join(packageDir, 'config', `config.${env}.js`))
      let defaultConfig = this.getConfigByPath(join(packageDir, 'config', 'config.default.js'))

      config = extend(true, config, defaultConfig, envConfig)
    }
    return config
  }
}
