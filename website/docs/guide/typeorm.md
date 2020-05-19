---
id: typeorm
title: TypeORM
sidebar_label: TypeORM
---

为了统一开发体验，TieJS 框架内置了配置管理。

### 多环境配置

框架支持根据环境来加载配置，，具体环境请查看运行环境配置

Tie 根据环境变量 `process.env.NODE_ENV`加载配置，你可以定义多个环境的配置文件。

```bash
# config

config
├── config.default.ts
├── config.development.ts
├── config.production.ts
└── config.test.ts
```

`config.default.ts` 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。

当指定 env 时会同时加载对应的配置文件，并覆盖默认配置文件的同名配置。如 production 环境会加载 config.production.ts 和 config.default.ts 文件，config.production.ts 会覆盖 config.default.ts 的同名配置。

### 编写配置

配置是一个提供者，你可注入任何东西到配置中。

```js
import { Injectable, InjectApp, Application } from '@tiejs/common'

@Injectable()
export default class Config {
  constructor(@InjectApp() private app: Application) {}

  middlewares: string[] = ['error-handler']
  appKey: string = 'azdexierxy'
  baseDir = this.app.baseDir
}
```

PS：Tie 的配置管理方式借鉴了 Egg.js，但又有很多的差异。
