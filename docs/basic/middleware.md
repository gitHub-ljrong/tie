---
id: middleware
title: 中间件
sidebar_label: 中间件 (Middleware)
---

## 定义中间件

Tie 中间件和 Koa 中间件不同的是它一个 `Provider`，为什么要这样设计呢？因为这样你可以注入如何其他`Provider`，并且更容易测试。

**Koa 中间件：**

```js
const myLogger = async (ctx, next) => {
  console.log('LOGGED')
  await next()
}
```

**Tie 中间件：**

Tie 中间件文件默认的命名格式必须为 `xxx.middleware.ts`，每个中间件都有个名字，比如中间件 `logger.middleware.ts` 名字为 `logger`。

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

插件配置文件为 `src/config/middleware.ts`:

### 本地中间件

你可以在配置文件配置中间件，中间件的执行顺序根据配置的顺序:

```js
import { MiddlewareConfig } from '@tiejs/common'

const config: MiddlewareConfig = [
  {
    name: 'logger',
  },
]

export default config
```

### 第三方中间件

也可以使用第三方中间件:

```js
import { MiddlewareConfig } from '@tiejs/common'
import cors from 'cors'

const config: MiddlewareConfig = [
  {
    name: 'logger',
  },
  {
    name: 'cors',
    use: cors(),
  },
]

export default config
```
