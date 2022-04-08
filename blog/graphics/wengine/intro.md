---
icon: computer
category: 图形学
tag:
  - 图形学
title: 从零开始搭建游戏引擎（一）：介绍
---

如[引言](./readme.md)所述，我们要搭建一个叫做`wengine`的玩具引擎。本篇对引擎的设计思路、总体结构、组件和技术的选型进行介绍。

## 设计思路

我们希望这个玩具引擎能够：

- 尽可能设计引擎中的各方面技术内容；
- 比较简单、便于修改；
- 能实现一些简单的 Demo，以验证某些技术的可行性；
- 使用开源库实现其中的一些模块；
- 可以跨平台，最好能在移动端运行。

## 语言和构建系统

处于性能、图形 API 接入的便利性等考虑，使用`C++`进行编写。这也与大部分商业引擎相同。至于是否接入脚本语言用于游戏逻辑等的编写，暂时没有计划；如果有，可能是`javascript`。

虽然有各种 fancy 的和自称小巧快速的构建系统，最终我还是选择了`CMake`。主要原因是：

- 相对简单而又足够成熟，相关文档、社区讨论比较多；
- `Modern CMake`在处理依赖关系上已经足够方便和优雅；
- 许多模块（如`Vulkan`）可以直接使用`find_package`来获取，或者引用库/第三方提供的`.cmake`文件；
- 可以直接通过`FetchContent`等方法从`Github`上引用开源库。

## 图形 API

引擎对图形 API 的需求包括：

- 是现代图形 API，便于尝试各种比较新的 feature；
- 便于跨平台，并且不用为每种图形 API 重新写一遍各种函数；

因此我们使用`Vulkan`。`Vulkan` 是一个 “very verbose API”，既符合我们的上述需求，又可以对渲染相关的细节进行比较细粒度的定制。`Vulkan` 还有比较友好的 Debug 机制（`validation layers`）。

缺点当然是比较复杂。但是这能学习到更多细节，忍了吧。另外在苹果的基于`Metal`的系统上截帧似乎不大好使。目前的考虑是在`Windows`上测试渲染正确性。

目前已经初步搭建了基于`Vulkan`的渲染管线（*流程跑通*的程度），主要参考资料：

- [Vulkan Tutorial](https://vulkan-tutorial.com/)
- [Vulkan 学习笔记](https://gavinkg.github.io/ILearnVulkanFromScratch-CN/)

考虑到便捷性、跨平台性，参考`Vulkan Tutorial`，初步采用了 [GLFW](https://www.glfw.org/) 进行窗口和输入的管理，采用 [glm](https://github.com/g-truc/glm) 进行图形相关的数学计算。后续可能会引入更多平台系统（比如为了实现移动端）。可能会为`glm`套一层接口，以便进行游戏对象相关的计算；也可能就裸着用`glm`。

## ECS 系统和游戏对象

出于内存访问效率等方面的考虑，游戏引擎通常会使用“实体-组件系统”（Entity component system, ECS）进行游戏对象的管理。重新写一个 ECS 系统有些复杂且不能保证运行效率，这里我应该会接入开源的 ECS 库，并在此基础上构建游戏对象系统。

可能使用的 ECS 库是 [EnTT](https://github.com/skypjack/entt)。

## 渲染相关

可能会尝试如下渲染相关的技术：

- PBR（Physicallly Based Rendering，基于物理渲染）材质；
- `Forward`和`Deferred`渲染管线；
- 多线程指令录制；
- GPU Scene 等。

## C++反射系统和序列化

为了实现编辑器，反射系统似乎是必不可少的。初步考虑使用运行时反射，主要原因是：

- 希望使用简单，最好不要依赖代码生成；
- 由于反射只针对部分类或类的部分成员，并且可能需要实现自定义的 setter/getter 等，所以希望具有较高的灵活性；
- 应用场景主要是序列化和编辑器控件，似乎没有必要为了零开销而搞出一大堆模板；
- 希望库相对成熟。

可能使用的 C++ 运行时反射库是 [RTTR](https://github.com/rttrorg/rttr)。

为了可读性，可能会将对象序列化为`json`格式。目前的初步框架中已经使用了 [JSON for Modern C++](https://github.com/nlohmann/json) 库进行配置文件的读取，所以可能会基于反射库和`json`库写一个简单的序列化系统。

## GUI 系统

GUI 系统主要用于编辑器，次要用于游戏内 UI 或 Debugging。

虽然我很想用 Web 方式写 GUI，但是看了一圈下来，从方案的完整性、库的成熟性角度来看，还是 [Dear ImGui](https://github.com/ocornut/imgui) 的可用性强一些。比如可以直接在`Vulkan` context 中进行绘制、直接接受`GLFW`事件等。

## 物理系统

大概会接入 [PhysX](https://developer.nvidia.com/physx-sdk)。

## 其他

诸如动画系统、Gameplay 相关特性等还没有调研。
