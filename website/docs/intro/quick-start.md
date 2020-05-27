---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

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
├── home.controller.ts
├── package.json
└── tsconfig.json
```

启动成功后，然后访问浏览器：http://localhost:5001/

这是一个最小化的 TieJS 应用，核心文件只有一个 `home.controller.ts`:

<Tabs
defaultValue="a"
values={[
{ label: 'home.controller.ts', value: 'a', },
{ label: 'package.json', value: 'b', },
]
}>
<TabItem value="a">

```ts
import { Controller, Get } from '@tiejs/controller'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    return 'Hi tie'
  }
}
```

</TabItem>
<TabItem value="b">

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
    "tie-cli": "0.0.4"
  }
}
```

</TabItem>
</Tabs>
