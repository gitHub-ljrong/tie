---
id: development
title: 本地开发
sidebar_label: 本地开发
---

为了更好的开发体验，Tie 提供命令行工具 `tie-cli`，让你方便再本地进行开发、调试和单元调试。

推荐在项目本地安装 `tie-cli` (当然你也可以全局安装)：

```bash
npm i tie-cli -D
```

在本地开发中，常用的命令如下：

```json
{
  "scripts": {
    "dev": "tie dev",
    "test": "tie test"
  }
}
```

## `tie dev` 

> npm run dev

启动本地开发服务器，将会加载 `config.default.ts` 和 `config.development.ts` 合并之后的配置。


## `tie test`
> npm run test

启动单元测试，将会加载 `config.default.ts` 和 `config.test.ts` 合并之后的配置。

