---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

使用 `tie-cli` 来初始化 tie 项目:

```bash
npm i -g tie-cli
tie create myapp # 选择 minimal-controller
cd myapp
npm run dev
```

它将在当前文件夹中创建一个名为 myapp 的目录，目录结构如下：

```bash
.
├── app.ts
├── home.controller.ts
└── tsconfig.json
```

启动成功后，然后访问浏览器：http://localhost:5001/

这是一个最小化的 TieJS 应用，核心文件只有一个 `home.controller.ts`:

<!--DOCUSAURUS_CODE_TABS-->

<!--app.ts-->
```js
import { Appliaction } from '@tiejs/core'
import { HomeController } from './home.controller'

const app = new Appliaction({
  controllers: [HomeController],
})

app.bootstrap()
```

<!--home.controller.ts-->

```js
import { Controller, Get } from '@tiejs/controller'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    return 'Hi tie'
  }
}
```

<!--package.json-->

```json
{
  "name": "myapp",
  "scripts": {
    "dev": "tie dev",
    "build": "tie build",
    "test": "tie test"
  },
  "dependencies": {
    "@tiejs/core": "^1.0.0",
    "@tiejs/controller": "^1.0.0",
    "tie-cli": "0.0.4"
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->
