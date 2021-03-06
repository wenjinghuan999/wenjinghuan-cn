---
icon: computer
category: 图形学
tag:
  - 图形学
star: true
title: 从零开始搭建游戏引擎
---

这是一篇从零开始搭建游戏引擎的笔记。

目前我在做游戏引擎相关的开发工作，但是我自知对游戏引擎了解甚少，因此希望通过完成一个简单的**玩具引擎**来增加自己对游戏引擎的理解。在实现这个玩具引擎的过程中，一定会走不少弯路。即使这样我也希望把这个过程记录下来，供自己以后回忆、反思，也为本文的读者提供一些思路。

有句话说得好：“*多少人声称自己要写一个引擎，最后只写了一个渲染器。*”因此我的目标是尽可能多地涉及游戏引擎中的各方面功能，而不是仅仅局限在渲染方面。当然渲染是游戏引擎中比较重要的组成部分。

为了完成这个玩具引擎，我不会把引擎用到的每个部分都重新实现一遍，否则大概这辈子也写不完吧。我会使用一些开源的库，来实现引擎中的部分功能，包括但不限于 ECS、反射、GUI、物理系统等。

作为一个业余项目，我会写得很慢，希望自己能坚持下来。

玩具引擎的名字就叫`wengine`吧。

待办事项列表：

- [x] 初步框架、构建系统和图形 API 接入
- [ ] 更好的渲染管线
- [ ] ECS 系统和游戏对象
- [ ] C++ 反射系统和序列化
- [ ] GUI 系统
- [ ] 简易编辑器界面
- [ ] 物理系统
- [ ] 动画系统
- ...
