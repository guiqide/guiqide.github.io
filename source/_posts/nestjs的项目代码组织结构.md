---
title: nestjs的项目代码组织结构
date: 2021-03-23 16:58:23
tags:
categories: 
  - 后端
---

通过nest命令，可以很容易开始一个nest项目，可以查看文档：()[https://docs.nestjs.com/#installation],这里默认大家已经初始化好了项目，
我们讲一下项目目录划分的最佳实践:

```
empty-nestjs-project
├─.eslintrc.js
├─.gitignore
├─.prettierrc
├─README.md
├─nest-cli.json
├─package-lock.json
├─package.json
├─tsconfig.build.json
├─tsconfig.json
├─test
|  ├─app.e2e-spec.ts
|  └jest-e2e.json
├─src
|  ├─app.controller.spec.ts
|  ├─app.controller.ts
|  ├─app.module.ts
|  ├─app.service.ts
|  └main.ts

```

刚生成的空项目中只有一个main入口文件和app，但真实项目肯定会创建多个类似的，所以需要一个友好的目录结构。
nest提供了多种不同职责的装饰器或者服务，有些需要和控制器放在一个目录，有些则需要放在公共的目录中，下面列出所有不同的职责文件类型，帮助大家理解：

- module
- controller
- service
- factory
- entity
- guard
- interceptor
- interface
- middleware
- pipes
- serializer
- job

## 我们的目录原则：

### 模型的目录

单个模型下的文件会放在同一个目录中，比如模型的控制器，model配置文件(entity)，模型的服务函数，模型的数据生成器（factory）
类似如下:

```
├─src
|  ├─app.controller.spec.ts
|  ├─app.controller.ts
|  ├─app.module.ts
|  ├─app.service.ts
|  ├─config.ts
|  ├─main.ts
|  ├─models
|  |   ├─user
|  |   |  ├─user.controller.ts
|  |   |  ├─user.entity.ts
|  |   |  ├─user.factory.ts
|  |   |  ├─user.module.ts
|  |   |  ├─user.service.ts
|  |   |  ├─interfaces
|  |   |  |     └user.interface.ts
|  |   |  ├─dto
|  |   |  |  ├─create-user.dto.ts
|  |   |  |  ├─index.ts
|  |   |  |  └login-user.dto.ts
|  |   ├─store
|  |   |   ├─store.controller.ts
|  |   |   ├─store.entity.ts
|  |   |   ├─store.factory.ts
|  |   |   ├─store.module.ts
|  |   |   ├─store.service.ts
|  |   |   ├─dto
|  |   |   |  ├─index.ts
|  |   |   |  └insert-order-with-store.ts

```

这里module文件负责模型的注入，因为nest是通过iOC的方式来进行调用。

controller控制器负责配置restful api的接口，以及入口函数。

DTO负责接口接受的数据的结构定义，以及参数校验工作

数据库表的访问通过service，当store需要调用user时可以通过StoreModule的import来导入UserModule。（user.module需要export: [UserService]）

### 公共的class和文件

```
├─src
|  ├─common
|  |   ├─serializers
|  |   |      ├─model.serializer.ts
|  |   |      ├─responses
|  |   |      |     ├─error.serializer.ts
|  |   |      |     └success.serializer.ts
|  |   ├─pipes
|  |   |   └validation.pipe.ts
|  |   ├─middleware
|  |   |     ├─logger.middleware.ts
|  |   |     └user.middleware.ts
|  |   ├─interfaces
|  |   ├─interceptors
|  |   |      ├─response.interceptor.ts
|  |   |      └sentry.interceptor.ts
|  |   ├─helpers
|  |   ├─guards
|  |   |   └test.guard.ts
|  |   ├─exceptions
|  |   ├─entities
|  |   |    └base.ts
|  |   ├─decorators
|  |   ├─constants

```

common有着最多的文件，主要负责一些公共的服务，并可以用在任何的模型中
比如

- response.interceptor.ts，负责包装返回的json结构
- validation.pipe.ts，负责实现class-validator的transform函数，校验请求的query参数
- logger.middleware.ts，负责对请求的时间做统计

### 其他的一些src下目录

- 数据库表的数据生成则是放在了database目录下

```
├─src
|  ├─database
|  |    ├─seeders
|  |    |    ├─address.seed.ts
|  |    |    ├─category.seed.ts
|  |    |    ├─sale-attr-key.seed.ts
|  |    |    ├─slate-attr-value.seed.ts
|  |    |    ├─spu.seed.ts
|  |    |    ├─staff.seed.ts
|  |    |    ├─store.seed.ts
|  |    |    └user.seed.ts
|  |    ├─migrations

```

- 异步队列放在jobs下

```
├─src
|  ├─jobs

```

- 配置放在config下

```
├─src
|  ├─config
|  |   ├─database.config.ts
|  |   └redis.config.ts

```

- 权限的相关模型放在了authentication目录下

```
├─src
|  ├─authentication
|  |       ├─auth.controller.ts
|  |       ├─auth.module.ts
|  |       ├─auth.service.ts
|  |       ├─authenticated.guard.ts
|  |       ├─local-auth.guard.ts
|  |       ├─local.strategy.ts
|  |       ├─session.serializer.ts
|  |       ├─wx-auth.service.ts
|  |       ├─interfaces
|  |       |     └code2session.ts
|  |       ├─dto
|  |       |  └wx-login.dto.ts

```

- 项目的相关文档

```
├─docs
|  ├─Booking Server.xmind
|  ├─Interface Order.xmind
|  └接口开发顺序.xmind

```

## FAQ:

1. nestjs，是怎么识别各种文件的职责的？

a. nestjs自己的职责文件是通过装饰器的定义和类实现，比如middleware的声明：

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

```

这里通过实现NestMiddleware后，通过反射，nest可以执行对应的middleware

P.S. 很多职责类，其实nestjs是不区分的，比如service，它是不实现nest内置类的，所以需要在使用的地方，比如controller的constructor手动注入

b. typeorm的entity则是通过配置实现的：

```
database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/database/migrations/*.js'],
    logging: false,
    cli: {
      migrationsDir: 'migration',
    },
    seeds: ['dist/database/seeders/**/*.seed.js'],
    factories: ['dist/**/*.factory.js'],
  },

```