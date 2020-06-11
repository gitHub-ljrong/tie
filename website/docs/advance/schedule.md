---
id: schedule
title: 定时任务
sidebar_label: 定时任务 (Schedule)
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

在实际应用中，除了处理 HTTP 请求，许多场景中你需要执行定时任务，例如：

- 定时执行统计任务
- 定时更新应用缓存
- 定时上报应用状态

TieJS 内置了定时任务处理机制，让你可以很轻松地执行定时任务。TieJS 处理定时任务的模块是 `@tiejs/schedule`，它是一个标准的 TieJS 插件，已经内置在 TieJS 中。

## 基本使用

类似于 Controller 和 Resolver 的 `some.controller.ts`、`some.resolver.ts` 这样的规则，我们约定 `xxx.schedule.ts`这样命名的模块为定时任务模块。

一个定时任务模块例子：

`cache.schedule.ts`

```ts
import { Schedule, Cron, Interval, Timeout } from '@tiejs/schedule'
import { InjectLogger, Logger } from '@tiejs/logger'

@Schedule()
export class CacheSchedule {
  constructor(@InjectLogger() private logger: Logger) {}

  // 每隔 1 分钟执行任务
  @Cron('*/1 * * * *')
  async updateArticleCache() {
    // await sleep(2000)
    this.logger.debug('Article cache updated')
  }

  // 每隔 10 秒执行任务
  @Interval(10000)
  updateUserCache() {
    this.logger.debug('User cache updated')
  }

  // 延迟 10 秒执行任务
  @Timeout(10000)
  updateCommentCache() {
    this.logger.debug('Comment cache updated')
  }
}
```

上面一个 schedule 模块中，我们定义了 3 个定时任务:

- 每隔 1 分钟执行任务
- 每隔 10 秒执行任务
- 延迟 10 秒执行任务

  你可以在任意地方放置 `cache.schedule.ts` 文件，TieJS 会自动帮你加载该模块，除此之外你不用做任何东西。

## 任务类型

Tiejs 定时任务分为三种: Cron、Interval、Timeout。

### Cron 类型

`@Cron(cronTime, options)`

Cron 类型定时任务将会根据 cron 表达式在特定的时间点执行，这是最灵活配置定时任务的方式，使用装饰器 @Cron() 声明任务。

#### 参数

- **cronTime**: 字符串，cron 表达式，例如："_/10 _ \* \* \* \*"。
- **options** 配置参数
  - `name:string`: 该定时任务的唯一名字，默认函数就是定时任务的名字，你可以配置改参数覆盖默认名字
  - `lazy:boolean`: 定时任务默认会启动，但如果为 true 时，定时任务不会被启动，默认为 false

#### Cron 语法

TieJS 的 Crontab 基于 [node-cron](https://github.com/node-cron/node-cron) 模块，Crontab 语法实现基于[GNU crontab](https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html)，支持完整的 Crontab 语法。

所有字段:

```
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
```

字段值：

| field        | value                             |
| ------------ | --------------------------------- |
| second       | 0-59                              |
| minute       | 0-59                              |
| hour         | 0-23                              |
| day of month | 1-31                              |
| month        | 1-12 (or names)                   |
| day of week  | 0-7 (or names, 0 or 7 are sunday) |

### Interval 类型

`@Interval(time, options)`

Interval 类型的定时任务将会每间隔指定的时间(time) 循环执行一次，使用装饰器 `@Interval()`声明任务。

#### 参数

- **time**: 一个数字，单位为毫秒。
- **options** 配置参数
  - `name:string`: 该定时任务的唯一名字，默认函数就是定时任务的名字，你可以配置改参数覆盖默认名字
  - `lazy:boolean`: 定时任务默认会启动，但如果为 true 时，定时任务不会被启动，默认为 false

### Timeout 类型

`@Timeout(time, options)`

#### 参数

- **time**: 一个数字，单位为毫秒。
- **options** 配置参数
  - `name:string`: 该定时任务的唯一名字，默认函数就是定时任务的名字，你可以配置改参数覆盖默认名字
  - `lazy:boolean`: 定时任务默认会启动，但如果为 true 时，定时任务不会被启动，默认为 false

## 动态控制

有些场景，你可能不想自动执行定时任务，你想手动启动它，比如你可以通过 Web 页面中的某个按钮让用户启动。你可以通过 `@InjectCronJob(<name>)` 获取一个定时任务，让后通过 `start` 和 `stop` Api 控制定时任务。

示例代码：

<Tabs
defaultValue="a"
values={[
{ label: 'home.controller.ts', value: 'a', },
{ label: 'cache.schedule.ts', value: 'b', },
]
}>

<TabItem value="a">

```ts
import { Controller, Post } from '@tiejs/controller'
import { InjectCronJob, CronJob } from '@common/schedule/decorators/InjectCronJob'

@Controller()
export class HomeController {
  constructor(@InjectCronJob('updateUserCache') private job: CronJob) {}

  @Post('/start ')
  start() {
    // 手动启动任务
    this.job.start()

    //20秒后手动停止任务
    setTimeout(() => {
      this.job.stop()
    }, 20000)

    return {
      test: 'hello world',
    }
  }
}
```

</TabItem>

<TabItem value="b">

```ts
import { Schedule, Cron, Interval, Timeout } from '@tiejs/schedule'
import { InjectLogger, Logger } from '@tiejs/logger'

@Schedule()
export class CacheSchedule {
  constructor(@InjectLogger() private logger: Logger) {}

  // 每隔 1 分钟执行任务
  @Cron('*/1 * * * *', { lazy: true })
  updateUserCache() {
    this.logger.debug('User cache updated')
  }
}
```

</TabItem>
</Tabs>

## 定时任务和多进程

大部分情况下，我们希望只用一个进程执行定时任务。

如果你用类似 `node app.js` 这样的方式启动 Node.js 服务，这没问题，因为它只启动一个进程。

如果你的服务器是多核的，你可能会使用 pm2 启动 Node.js 服务，启动命令可能类似这样：`pm2 start app.js -i 8`, 这启动了 8 个进程，但你并不想同时启动 8 个一模一样的定时任务，你只需一个定时任务。这时，你可以指定某个进程运行定时任务。

例如，下面例子只在一个进程开启定时任务插件：

```ts
import { PluginConfig } from '@tiejs/common'

const { NODE_APP_INSTANCE, HOST } = process.env

export const plugins: PluginConfig = [
  {
    name: 'schedule',
    package: '@tiejs/schedule',
    enable: NODE_APP_INSTANCE === '0',
  },
]
```

关于 `NODE_APP_INSTANCE`，可以看 pm2 官方文档：https://pm2.keymetrics.io/docs/usage/environment/#node_app_instance-pm2-25-minimum

如果你是多台机器部署，也只需要一个进程执行定时任务怎么办呢？你可以指定某台服务器开启定时任务：

```ts
import { PluginConfig } from '@tiejs/common'
import { address } from 'ip'

const { NODE_APP_INSTANCE, HOST } = process.env

export const plugins: PluginConfig = [
  {
    name: 'schedule',
    package: '@tiejs/schedule',
    enable: address().includes('111.11,1.0') && NODE_APP_INSTANCE === '0',
  },
]
```
