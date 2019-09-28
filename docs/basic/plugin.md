---
id: plugin
title: 插件
sidebar_label: 插件 (Plugin)
---

插件是 Tie.js 最核心功能，插件来源于两个地方：项目本地和 node_modules。

## 插件配置

```js
import { PluginConfig } from '@tiejs/common'

const plugins: PluginConfig = [
  // 来自node_modules的插件:
  {
    name: 'typeorm',
    enable: true,
    package: '@tiejs/typeorm', // npm 包名称，如果没package字段，tie 会识别为本地插件
  },

  // 本地插件:
  {
    name: 'logger',
    enable: true,
  },
]

export default plugins
```

注意，tie 根据 `{name}.plugin.{js,ts}` 命名格式去寻找相应的插件。

## 插件开发

简单的插件代码示例：

```js
import { Injectable, IPlugin, Middleware, Request, Response, NextFunction } from '@tiejs/common'

@Injectable()
export default class LoggerPlugin implements IPlugin {
  // 服务器启动前
  appDidReady() {
    console.log('server will start')
  }

  // 服务器启动后
  serverDidReady() {
    console.log('server start')
  }

  // 定义一个中间件
  @Middleware({
    name: 'logger',
    apply(middlewares: string[]) {
      return [...middlewares, 'logger']
    },
  })
  async logger(req: Request, res: Response, next: NextFunction) {
    console.log('request URL:', req.url)
    next()
  }
}
```

插件开发教程，请看：https://github.com/tie-team/create-tie-plugin
