import { Injectable, IPlugin, Application } from '@tiejs/common'
import { InjectConfig } from '@tiejs/common'
import { GraphqlConfig } from '@tiejs/graphql'
import { ControllerConfig } from '@tiejs/controller'
import { join } from 'path'

@Injectable()
export class DashboardPlugin implements IPlugin {
  constructor(
    @InjectConfig('graphql') private graphql: GraphqlConfig,
    @InjectConfig('controller') private controller: ControllerConfig,
    @InjectConfig('view') private view: any,
  ) {}
  async configDidLoad(app: Application) {
    const { resolvers } = this.graphql
    const { patterns } = this.controller
    const { dirs } = this.view

    if (resolvers && Array.isArray(resolvers)) {
      resolvers.push({
        pattern: '**/*.resolver.js',
        cwd: join(app.baseDir, 'node_modules', '@tiejs/dashboard'),
      })
    }

    if (patterns && Array.isArray(patterns)) {
      patterns.push({
        pattern: '**/*.controller.js',
        cwd: join(app.baseDir, 'node_modules', '@tiejs/dashboard'),
      })
    }

    if (dirs && Array.isArray(dirs)) {
      dirs.push(join(app.baseDir, 'node_modules', '@tiejs/dashboard', 'site', 'build'))
    }

    // TODO: handle express
    // app.use(express.static(join(app.baseDir, 'node_modules', '@tiejs/dashboard', 'site', 'build')))

    // app.use(cors())
  }
}
