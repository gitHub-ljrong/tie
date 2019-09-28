---
id: testing
title: 单元测试
sidebar_label: 单元测试 (Testing)
---

单元测试时保证代码质量的重要手段，必要性这里不多说。

## 测试代码

为了演示在 Tie 怎么进行单元测试，我们新建 `UserService` 和 `PostService` 两个 Service，并且他们有依赖关系。

<!--DOCUSAURUS_CODE_TABS-->
<!--user.service.ts-->

```js
import { Injectable } from '@tiejs/common'
import { ProfileService } from './profile.service'

@Injectable()
export class UserService {
  constructor(private postService: ProfileService) {}

  getUserPhone() {
    return this.postService.getPhone()
  }
}
```

<!--profile.service.ts-->

```js
import { Injectable } from '@tiejs/common'

@Injectable()
export class ProfileService {
  getPhone() {
    return 123456
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

现在我们来测试 `UserService`，因为它比 `ProfileService` 更复杂写，更具代表性。

## 简单测试

<!--DOCUSAURUS_CODE_TABS-->
<!--user.service.test.ts-->

```js
import { UserService } from '../src/user.service'
import { ProfileService } from '../src/profile.service'

describe('UserService', () => {
  test('getUser()', () => {
    const profileService = new ProfileService()
    const userService = new UserService(profileService)

    expect(userService.getUserPhone()).toBe(123456)
  })
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

上面的测试非常容易理解，并且能成功测试 UserService，但存在两个问题：

1. 依赖了真实的 profileService，其实我们只想测试 `userService.getUserPhone()` 逻辑的正确性，不在乎 profileService 到底是真实的还是模拟的，使用真实的 profileService 会更加复杂，因为 profileService 也可能依赖了其他 Service，所以合理的应该是往 userService 注入一个模拟的 profileService，解除它们之间的耦合。
2. profileService 的注入是有顺序的，因为 userService 可能会注入多个 Service，这样会导致 userService 源码中修改了依赖注入的顺序，测试代码也要跟着修改，所以耦合了顺序也是不合理的。

## 使用 `@tiejs/testing`

使用 Tie 提供的测试工具，可以很好地解决上面两个问题。

先安装 `@tiejs/testing`:

```bash
npm i @tiejs/testing -D
```

使用 `Tester.mock` 可以模拟被依赖的服务，并且你不用关心构造函数中的参数顺序，使用 `Tester.get` 获取被测试的服务。

<!--DOCUSAURUS_CODE_TABS-->
<!--user.service.test.ts-->

```js
import { Tester } from '@tiejs/testing'
import { UserService } from '../src/user.service'
import { ProfileService } from '../src/profile.service'

describe('UserService', () => {
  test('getUserPhone()', () => {
    Tester.mock(ProfileService, {
      getPhone: () => 123,
    })

    const userService = Tester.get(UserService)
    expect(userService.getUserPhone()).toBe(123)
  })
})
```

<!--END_DOCUSAURUS_CODE_TABS-->