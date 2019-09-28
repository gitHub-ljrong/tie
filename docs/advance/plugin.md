---
id: plugin
title: 插件
sidebar_label: 插件
---

Tie 拥有强大的插件系统，利用插件可以更好地让业务逻辑复用。您可以直接使用第三方插件，也可以在项目中创建自己的插件。

### 创建插件

创建插件非常简单，它只是一个普通的 `Provider`，但注意的是，它的命名格式必须是 `xxx.plugin.ts`，`xxx` 就是插件的名字。

下面非常简单的插件的例子：

```js
import { Injectable, IPlugin, Application, Server } from '@tiejs/common'

@Injectable()
export default class GraphqlPlugin implements IPlugin {
  async appDidReady(app: Application) {
    // do something after app ready
    console.log('app ready')
  }

  async serverDidReady(app: Application, server: Server) {
    // do something after server ready
    console.log('server ready')
  }
}
```
