---
id: plugin
title: 插件
sidebar_label: 插件 (Plugin)
---

插件是 Tie.js 最核心功能。

## 插件配置

插件配置文件为 `config/config/plugin.ts`:

```js
import { PluginConfig } from '@tiejs/common'

const config: PluginConfig = [
  {
    package: '@tiejs/typeorm'
    enable: true,
  }
]

export default config
```

## 插件开发

简单的插件代码示例：

```js
import { Injectable, IPlugin } from '@tiejs/common'

@Injectable()
export default class LoggerPlugin implements IPlugin {

// 注册一个中间件
  constructor(@InjectApp() private app: Application) {
    let { middlewareConfig } = this.app
    middlewareConfig.unshift({
      name: 'logger', 

      // LoggerMiddleware 是一个中间件提供者(Provider)
      use: LoggerMiddleware 
    })
  }


  // 服务器启动前
  appDidReady() {
    console.log('server will start')
  }

  // 配置已加载到 app
  configDidLoad() {
    console.log('app loaded')
  }

  // 所有中间件已经 use
  middlewareDidReady() {
    console.log('app.use(middleware) ready')
  }

  // 服务器启动后
  serverDidReady() {
    console.log('server start')
  }
}
```
