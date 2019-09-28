---
id: validation
title: 校验
sidebar_label: 校验 (Validation)
---

检验功能是后端开发的重要的功能，Tie 提供了非常优雅的校验方式，底层使用 [class-validator](https://github.com/typestack/class-validator) 。

## Controller 检验

<!--DOCUSAURUS_CODE_TABS-->
<!--user.controller.ts-->

```js
import { Controller, Get, Params, Post, Body } from '@tiejs/controller'
import { User } from './user.type'
import { UserService } from './user.service'
import { CreateUserInput } from './createUser.input'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/users')
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }
}
```

<!--createUser.input.ts-->

```js
import { IsInt, Min, Max, IsNotEmpty } from 'class-validator'

export class CreateUserInput {
  @IsNotEmpty({ message: 'Name required' })
  name: string

  @IsInt({ message: 'Age should be Int' })
  @Min(0)
  @Max(100)
  age: number
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

我们使用 `@Body` 获取客户端传来的数据并存在 `input` 变量中，我们声明 `input` 的类型为 `CreateUserInput`, `CreateUserInput` 是一个添加了校验规则的类。

## Resolver 检验

wip...
