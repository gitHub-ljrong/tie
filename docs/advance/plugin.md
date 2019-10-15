---
id: plugin
title: 插件
sidebar_label: 插件 (Plugin)
---

Tie 拥有强大的插件系统，利用插件可以更好地让业务逻辑复用。您可以直接使用第三方插件，也可以在项目中创建自己的插件。

## 插件开发

创建插件非常简单，它只是一个普通的 `Provider`, 下面非常简单的插件的例子：

```js
import { Injectable, IPlugin, Middleware, Request, Response, NextFunction } from '@tiejs/common'

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
````
