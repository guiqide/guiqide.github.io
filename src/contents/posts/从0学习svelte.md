---
title: 从0学习svelte
published: 2025-08-25 14:53:19
category: 学习笔记
tags: [svelte]
---
## 笔记
Svelte 响应式是基于赋值触发的，数组/对象修改必须重新赋值。

比如 let numbers = $state([0, 1, 2, 3, 4]);

```
# 生效
numbers = [...numbers, numbers.length + 1]

# 不更新响应
numbers.push(numbers.length + 1)

```