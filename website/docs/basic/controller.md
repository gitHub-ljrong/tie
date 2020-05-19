---
id: controller
title: 控制器
sidebar_label: 控制器 (Controller)
---

## 基本用法

Controller 功能 在 TieJS 中是开箱即用的，下面我们使用 CLI 工具 `tie-cli` 快速体验。

使用 `tie-cli` 初始化应用 (选择 minimal-controller)：

```bash
tie create myapp # 选择 minimal-controller
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

代码如下:

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

## 常用功能

上面介绍了 TieJS 中 Controller 的最小化用法，下面例子你将体验到 Controller 的常用功能:

首先，我们新建如下的项目目录：

```bash
.
├── package.json
├── app.ts
├── user
│   ├── createUser.input.ts
│   ├── user.resolver.ts
│   ├── user.service.ts
│   └── user.type.ts
└── tsconfig.json
```

项目代码如下：

<!--DOCUSAURUS_CODE_TABS-->

<!--app.ts-->

```js
import { Appliaction } from '@tiejs/core'
import { UserController } from './user/user.controller'

const app = new Appliaction({
  controllers: [UserController],
})

app.bootstrap()
```

<!--user.controller.ts-->

```js
import { Controller, Get, Params, Post, Body } from '@tiejs/controller'
import { User } from './user.type'
import { UserService } from './user.service'
import { CreateUserInput } from './createUser.input'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users/:name')
  async user(@Params('name') name: string): Promise<User> {
    return await this.userService.getUser(name)
  }

  @Get('/users')
  async users(): Promise<User[]> {
    return await this.userService.queryUser()
  }

  @Post('/users')
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }
}


```

<!--user.service.ts-->

```js
import { Injectable } from '@tiejs/common'
import { User } from './user.type'
import { CreateUserInput } from './createUser.input'

@Injectable()
export class UserService {
  private users: User[] = [
    {
      name: 'Jack',
      age: 16,
    },
    {
      name: 'Rose',
      age: 15,
    },
  ]
  async queryUser(): Promise<User[]> {
    return this.users
  }

  async getUser(name: string): Promise<User> {
    const user = this.users.find(user => user.name === name)
    if (!user) throw new Error('未找到用户')
    return user
  }

  async createUser(user: CreateUserInput): Promise<User> {
    this.users.push(user)
    return user
  }
}

```

<!--user.type.ts-->

```js
export class User {
  name: string
  age: number
}
```

<!--createUser.input.ts-->

```js
export class CreateUserInput {
  name: string
  age: number
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
    "@tiejs/common": "^1.0.0",
    "@tiejs/core": "^1.0.0",
    "@tiejs/controller": "^1.0.0",
    "tie-cli": "0.0.4"
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->
