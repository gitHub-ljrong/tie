---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

我们使用 `npx tie-cli` 来初始化 tie 项目，当然你也可以选择全局安装 `tie-cli`:

```bash
npx tie-cli myapp # 选择 minimal-controller
cd myapp
npm run dev
```

它将在当前文件夹中创建一个名为 myapp 的目录，目录结构如下：

```bash
.
├── package.json
├── src
│   └── home.controller.ts
└── tsconfig.json
```

启动成功后，然后访问浏览器：http://localhost:5001/

这是一个最小化的 Tie 应用，核心文件只有一个 `home.controller.ts`:

<!--DOCUSAURUS_CODE_TABS-->
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
    "@tiejs/core": "^0.2.2",
    "@tiejs/controller": "^0.2.2",
    "tie-cli": "0.0.4"
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

也许你会发现，项目中并没有类似`app.ts`或者`index.ts`这样的入口文件，Tie 推荐使用 `tie-cli`。

Tie 默认是隐藏程序的入口文件的，当然 Tie 也提供暴露入口文件的方式。
