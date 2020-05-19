---
id: provider
title: 提供者
sidebar_label: 提供者 (Provider)
---

TieJS 框架最核心的特性是使用依赖注入 (Dependency injection) 组织代码，提供者 (Provider) 是用来组织代码的最小单位。

## 什么是提供者 (Provider)?

提供者很简单，只不过是一个用 `@Injectable()` 装饰器注释的简单类，在 TieJS 中提供者包含服务(Service)、存储库(Repository)、中间件(Middleware)、插件(Plugin)、配置(Config)等。

## 服务 (Service)

服务是业务逻辑的抽象，通常你会在 Controller 或 Resolver 中通过**依赖注入**的方式调用 Service，TieJS 使用 **依赖注入** 的方式组织代码，这是非常重要特性，因为它使代码有更好的可读性，也更易于进行单元测试。

<!--DOCUSAURUS_CODE_TABS-->

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

<!--user.resolver.ts-->

```js
import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { User } from './user.type'
import { UserService } from './user.service'
import { CreateUserInput } from './createUser.input'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true, description: 'get user by name' })
  async user(@Arg('name') name: string): Promise<User> {
    return await this.userService.getUser(name)
  }

  @Query(() => [User], { description: 'query user' })
  async users(): Promise<User[]> {
    return await this.userService.queryUser()
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## 存储库(Repository)

对于小型项目，你可能在会直接在 Controller 或者 Service 中操作数据库，对于大型项目，为了项目的分层更清晰，TieJS 推荐抽象一层 **存储库(Repository)** 来操作数据库，通常你会在 Service 中调用 Repository。

<!--DOCUSAURUS_CODE_TABS-->

<!--user.repository.ts-->

```js
import { Injectable } from '@tiejs/common'
import { InjectRepository } from '@tiejs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@entity/user.entity'

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
```

<!--user.service.ts-->

```js
import { Injectable } from '@tiejs/common'
import { UserRepository } from './user.repositorys'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async queryUser(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## 插件(Plugin)

中间件也是 Provider，详细使用方法请看 [插件](/docs/basic/plugin)。

```js
import { Injectable, IPlugin } from '@tiejs/common'

@Injectable()
export default class SomePlugin implements IPlugin {
  async appDidReady() {
    console.log('app ready')
  }
}
```

## 中间件(Middleware)

中间件也是 Provider，详细使用方法请看 [中间件](/docs/basic/middleware)。

```js
import { Injectable } from '@tiejs/common'

@Injectable()
export default class LoggerMiddleware {
  async use(ctx: any, next: any) {
    console.log('request URL:', ctx.url)
    await next()
  }
}
```

## 工具(Util)

通常一些和业务逻辑无关的工具方法，可以抽象为工具 Provider，使用方法和服务(Service)一致。

```js
import { Injectable } from '@tiejs/common'

@Injectable()
export class DateUtil {
  getTimestamp() {
    return Date.now()
  }

  getHours() {
    return new Date().getHours()
  }

  getDate() {
    return new Date().getDate()
  }
}
```
