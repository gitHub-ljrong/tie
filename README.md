# TieJS

## 快速体验

使用 `tie-cli` 初始化应用 (选择 minimal-controller)：

```bash
npx tie-cli myapp # 选择 minimal-controller
cd myapp
npm run dev
```

项目结构如下:

```bash
.
├── app.ts
├── home.controller.ts
└── tsconfig.json
```

启动成功后，然后访问浏览器：http://localhost:5001

这是一个最小化的 TieJS 应用，，代码如下:

**app.ts**

```js
import { Appliaction } from '@tiejs/core'
import { HomeController } from './home.controller'

const app = new Appliaction({
  controllers: [HomeController],
})

app.bootstrap()
```

**hello.controller.ts**

```js
import { Controller, Get } from '@tiejs/controller'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    return 'Hi Tie'
  }
}
```

## 文档

官方文档 [tie.js.org](https://tie.js.org/).

入门教程 [快速开始](https://tie.js.org/docs/intro/quick-start).

## License

[MIT License](https://github.com/tie-team/tie/blob/master/LICENSE)
