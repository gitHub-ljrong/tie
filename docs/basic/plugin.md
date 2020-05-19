---
id: plugin
title: 插件
sidebar_label: 插件 (Plugin)
---

TieJS 拥有强大的插件系统，利用插件可以更好地让业务逻辑复用，插件是 TieJS 最核心功能。

## 插件配置

插件配置文件为 `config/plugins.ts`:

```js
import { PluginConfig } from '@tiejs/common'

export const configs: PluginConfig = [
  {
    package: '@tiejs/typeorm'
    enable: true,
  }
]
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

## 内置插件

TieJS 内置了一下插件：

```js
;[
  {
    name: 'controller',
    package: '@tiejs/controller',
    enable: true,
  },
  {
    name: 'graphql',
    package: '@tiejs/graphql',
    enable: true,
  },
  {
    name: 'logger',
    package: '@tiejs/logger',
    enable: true,
  },
  {
    name: 'view',
    package: '@tiejs/view',
    enable: true,
  },
]
```
