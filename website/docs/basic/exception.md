---
id: exception
title: 异常处理
sidebar_label: 异常处理 (exception)
---

TieJS 提供一个异常处理的模块 `@tiejs/exception`，让你更优雅地处理异常。

## 安装

```bash
npm i @tiejs/exception
```

## 用法

TieJS 提供了两种异常对象:

- `Exception` 是基本异常对象，你可以基于扩展自己的异常对象，也可以直接使用;
- `BadRequest`、`NotFound`、`TimeOunt` 等内置的异常对象;

下面演示如何使用：

```ts
import { Controller, Get, Params } from '@tiejs/controller'
import { NotFound, Exception } from '@tiejs/exception'

@Controller()
export class HomeController {
  @Get('/:name')
  index(@Params('name') name: string) {
    if (name === 'a') {
      throw new NotFound({
        message: 'A is Not Found',
        code: 'AIsNotFound',
      })
    }

    if (name === 'b') {
      // common exception
      throw new Exception({
        message: 'an common Exception',
        code: 'BusinessCodeB',
      })
    }

    return name
  }
}
```

## 内置异常

```bash
.
├── BadGateway
├── BadRequest
├── Conflict
├── Forbidden
├── GatewayTimeout
├── Gone
├── ImATeapot
├── InternalServerError
├── MethodNotAllowed
├── NotAcceptable
├── NotFound
├── NotImplemented
├── PayloadTooLarge
├── RequestTimeout
├── ServiceUnavailable
├── Unauthorized
├── UnprocessableEntity
├── UnsupportedMediaType
```

## Exception Api

`Exception` 是 TieJS 的基础异常对象， 也是实际场景最常用的 Api，用法如下：

```ts
throw new Exception({
  code: 'PasswordInvalid',
  type: 'AuthError',
  message: '密码错误',
})
```

`Exception`的参数:

```ts
export interface Options {
  status?: number // http status code
  code?: string // business error code
  type?: string // error type
  message?: string // error message
  origin?: any // origin error message
}
```

## 自定义异常

你可以基于 `Exception` 自定义你自己的异常，就像内置的异常对象比如 `NotFound`。

例如：继承 `Exception` 实现一个自定义的异常 `PermissionException`:

```ts
export class PermissionException extends Exception {
  constructor(options: Options) {
    super({
      code: 'NoPermission',
      type: 'NoPermission',
      status: 403,
      ...options,
    })
  }
}
```

使用自定义异常：

```ts
import { Controller, Get } from '@tiejs/controller'

@Controller()
export class HomeController {
  @Get('/')
  index() {
    throw new NotFound({
      message: 'Only Admin can edit avatar',
      code: 'CanNotEditAvatar',
    })
  }
}
```
