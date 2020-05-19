---
id: middleware
title: 中间件
sidebar_label: 中间件 (Middleware)
---

## 定义中间件

TieJS 中间件和 Koa 中间件不同的是它一个 `Provider`，为什么要这样设计呢？因为这样你可以注入如何其他`Provider`，并且更容易测试。

**Koa 中间件：**

```js
const myLogger = async (ctx, next) => {
  console.log('LOGGED')
  await next()
}
```

**TieJS 中间件：**

TieJS 中间件文件是一个 `Provider`, 必须实现一个 `use`方法：

```js
// logger.middleware.ts
import { Injectable, Context, NextFunction } from '@tiejs/common'

@Injectable()
export default class LoggerMiddleware {
  async use(ctx: Context, next: NextFunction) {
    console.log('LOGGED')
    await next()
  }
}
```

## 使用中间件

你可以使用 Koa 中间件，也可以使用 Provider 形式的中间件，中间件的执行顺序根据配置的顺序。

配置文件 `config/middlewares.ts`:

```js
import { MiddlewareConfig } from '@tiejs/common'
import cors from 'cors'
import { LoggerMiddleware } from './LoggerMiddleware'

export const middlewares: MiddlewareConfig = [
  {
    name: 'logger',
    use: LoggerMiddleware,
  },
  {
    name: 'cors',
    use: cors(),
  },
]
```

使用中间件配置：

```ts
import { Appliaction, Config } from '@tiejs/core'
import { middlewares } from middlewares

const app = new Appliaction({
  middlewares,
})

app.bootstrap()
```
