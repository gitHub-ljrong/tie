import { PluginStoreBuilder } from '../../src/builders/PluginStoreBuilder'
import { join } from 'path'

describe('PluginStoreBuiler', () => {
  const baseDir = join(__dirname, '..', 'sample')

  test('local plugin', async () => {
    const plugins = [
      {
        name: 'local',
        enable: true,
      },
    ]
    const instance = new PluginStoreBuilder(baseDir, plugins)
    const pluginStore = await instance.createPluginStore()
    const [testPlugin] = pluginStore
    expect(pluginStore).toBeDefined()
    expect(pluginStore).toHaveLength(1)
    expect(testPlugin.name).toBe('local')
    expect(testPlugin.package).toBeUndefined()
  })

  test('third-party plugin', async () => {
    const plugins = [
      {
        name: 'third-party',
        enable: true,
        package: 'third-party',
      },
    ]
    const instance = new PluginStoreBuilder(baseDir, plugins)
    const pluginStore = await instance.createPluginStore()
    const [testPlugin] = pluginStore
    expect(pluginStore).toBeDefined()
    expect(pluginStore).toHaveLength(1)
    expect(testPlugin.name).toBe('third-party')
    expect(testPlugin.package).toBeDefined()
  })
})
