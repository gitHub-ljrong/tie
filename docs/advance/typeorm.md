---
id: typeorm
title: TypeORM
sidebar_label: TypeORM
---

[TypeORM](https://typeorm.io/) 是 TypeScript 生态中非常优秀的 ORM，如果你使用关系型数据库，强烈建议你使用 [TypeORM](https://typeorm.io/)。

使用 Tie 官方的插件 `@tiejs/typeorm`，你可以非常方便地使用 TypeORM。

为了直观的感受如何在使用 Tie 中使用 TypeORM，建议运行下面命令初始化例子 (选择模板 `example-typeorm`)：

```bash
➜  ~ tie create typeorm-example

     _-----_
    |       |
    |--(o)--|    ╭──────────────────────────╮
   `---------´   │ 您正在初始化 tie 项目...
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? 选择项目模板？
  minimal-controller
  minimal-graphql
  simple-controller
  simple-graphql
❯ example-typeorm
```

## 安装插件

先安装依赖：

```bash
npm i @tiejs/typeorm
```

## 配置插件

在配置文件 `src/config/plugin.ts` 配置插件：

```js
import { PluginConfig } from '@tiejs/common'

export const config: PluginConfig = [
  {
    package: '@tiejs/typeorm',
    enable: true,
  },
]

export default config
```

## 配置数据库连接

在配置文件 `src/config/config.default.ts` 配置数据库连接：

```js
import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  typeorm = {
    type: 'mysql',
    host: '127.0.01',
    port: 3306,
    username: 'TODO',
    password: 'TODO',
    database: 'TODO',
    synchronize: false,
    logging: true,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  }
}
```

### 创建 Entity

**`src/user/user.entity.ts`**

```js
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '用户名', nullable: true })
  username: string

  @Column({ comment: '昵称', nullable: true })
  nickname: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date
}
```

## 注入并使用实体

在 `Provider` 中使用:

```js
import { Injectable } from '@tiejs/common'
import { InjectRepository } from '@tiejs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
```

更多详细的的用法请看官网：[TypeORM](https://typeorm.io/)
