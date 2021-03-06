---
category: 数学
tag:
  - 数学
  - 概率
---

# 经典问题——两男孩问题（三）

## 回到“另一个”歧义

我们还是回归到对“另一个”所引发的歧义上来。为此，我们可以讨论一下这个问题：

> - **问题一**：史密斯先生家有两个孩子，已知**其中一个**孩子的出生时刻在中午12:00之前（出生于上半天），求**另一个**孩子是男孩的概率。

直观来看，其中一个孩子出生于上半天和另一个孩子的性别毫无关系，所以答案应该是 $1/2$。但我们再来看下面一个问题：

分别用 $B$、$G$ 表示男孩和女孩，用下标 $A$、$P$ 表示出生于上、下半天的孩子。

> - **问题二**：史密斯先生家有两个孩子，已知其中一个孩子出生于上半天。求史密斯先生家的孩子类型为 $(?_A,B_?)$（顺序无关）的概率。

看起来问题一应该等价于问题二，并且两者答案应该都是 $1/2$。但实际上，问题二和“星期二男孩”类似，答案是反直觉的。我们用列表法试一下：

| ==$B_AB_A$== | ==$B_AB_P$== | ==$B_PB_A$== |   $B_PB_P$   |
|:------------:|:------------:|:------------:|:------------:|
| ==$B_AG_A$== |   $B_AG_P$   | ==$B_PG_A$== |   $B_PG_P$   |
| ==$G_AB_A$== | ==$G_AB_P$== |   $G_PB_A$   |   $G_PB_P$   |
|   $G_AG_A$   |   $G_AG_P$   |   $G_PG_A$   |   $G_PG_P$   |

表中每一项代表一种家庭，每种家庭出现的可能性相同。其中有 $12$ 种家庭满足“其中一个孩子出生于上半天”。而只有 $7$ 种家庭满足孩子类型的条件，因此答案为 $\frac{7}{12}$。

## “另一个”为什么有歧义

首先，“其中一个……，另一个……”的说法，会使人认为对两个孩子做出了“特指”或“指明”。

在上一篇文章中，我们已经讨论了，这是语言表述方面的歧义，完全可以理解为并非“特指”。另外，我们也说到，所谓“特指”可以理解为定义了一个只在一个个体上成立的事件作为条件。“其中一个……，另一个……”这种表述并没有明确提供这样的条件。所以，也许有人可以将“其中一个……，另一个……”理解为特指，但也不应一棒子打死所有不这么认为的人。

其次，“另一个”的表述会使人对样本空间及其概率分布产生误解。

从表述上看，“另一个是男孩的概率”的样本空间似乎是“孩子的性别”（$\{B, G\}$），而不是“两个孩子的性别和出生时刻的组合”（如 $\{B_AB_A, B_PG_A, \dots \}$）。如果样本空间是“孩子的性别”，看起来其概率分布也不应受到题设条件的影响，而是等可能分布的。但是实际上，我们在考虑概率问题时，需要先给定样本空间，然后再考虑条件。比如考虑下面这个问题：

> **问题三**：史密斯先生家有两个孩子。其中年长的是男孩，并且史密斯先生家有一名出生于星期二的男孩。求年幼的孩子是男孩的概率。

了解了“星期二男孩”问题再来看**问题三**，可以知道答案不是 $1/2$。用两个孩子的性别、出生星期的组合作为样本空间，可以比较方便地计算出结果，因为如此确定的样本空间中，任意样本的出现是等可能的。我们当然可以认为样本空间是“年幼的孩子的性别”，但此时每个样本（$B, G$ 两个样本）的概率是不同的。不能想当然地认为样本空间的概率分布就是均匀的。也不能因为觉得“年幼的”是特指，就认为他的性别是独立于题目条件之外的。

## 问题一的解法

> - **问题一**：史密斯先生家有两个孩子，已知**其中一个**孩子的出生时刻在中午12:00之前（出生于上半天），求**另一个**孩子是男孩的概率。

首先我们可以确定共有 $16$ 种等可能出现家庭，条件“其中一个孩子出生于上半天”将可能的家庭缩减为 $12$ 种。

可能有人会认为，根据条件将家庭缩减为 $12$ 种之后，再在这 $12$ 种家庭中观察事件“其中一个出生于上半天，另一个孩子是男孩”发生与否，有 $7$ 个家庭发生了，所以问题一的答案应该是 $\frac{7}{12}$。这和我们对问题的理解是不符的。试想，如果说另一个孩子是男孩的概率是 $\frac{7}{12}$，难道是女孩的概率是 $\frac{5}{12}$ 吗？显然，用同样的方法计算，另一个孩子是女孩的概率也是 $\frac{7}{12}$。那么这两个事件的概率之和为什么大于 $1$ 呢？只能认为这两个事件并不是互斥事件。这就更奇怪了，难道另一个孩子可以既是男孩又是女孩吗？

### 直接求解

为了解释这个问题，我们还要重申之前的观点：不能将“另一个”和“其中一个”割裂开来看。具体地说，不能将事件“其中一个孩子出生于上半天”和事件“其中一个孩子出生于上半天，另一个是男孩”分裂开来看。也就是说，虽然根据条件“其中一个孩子出生于上半天”，我们得到了满足条件的 $12$ 种等可能出现的家庭，但在这些家庭中，“另一个孩子是男孩”的概率是不同的。

- 对于 $B_AB_A$、$B_AB_P$、$B_PB_A$ 家庭，“另一个孩子是男孩”的概率为 $1$，因为这些家庭只有男孩；
- 对于 $B_PG_A$、$G_AB_P$ 家庭，“另一个孩子是男孩”的概率也为 $1$，因为“其中一个孩子出生于上半天”限制了“另一个孩子”具体是哪一个；
- 对于 $B_AG_A$、$G_AB_A$ 家庭，“另一个孩子是男孩”的概率为 $1/2$，因为我们并不知道另一个孩子具体是哪一个，只能认为是等可能地从两个孩子中选取。
- 其余家庭“另一个孩子是男孩”的概率为 $0$。

这样可以计算得，“另一个孩子是男孩”的概率为：
$$
\begin{aligned}
&P(\text{另一个孩子是男孩}|\text{其中一个孩子出生于上半天}) \\
=& \frac{5}{12} \times 1 + \frac{2}{12} \times \frac{1}{2} \\
=&\frac{1}{2}
\end{aligned}
$$

这一答案是符合我们的认知的。

当然这样叙述是不完美的，因为我们没有说明为什么对于 $B_AG_A$、$G_AB_A$ 家庭，“另一个孩子”为什么需要等可能地从两个孩子中选取。

### 样本空间描述

我们可以尝试使用样本空间来描述此问题。首先我们还是可以确定共有 $16$ 种等可能出现家庭。但由于我们不能确定“另一个”指的是哪一个，所以我们将样本空间分为 $32$ 种等可能的情况，即：“另一个”指 $1$ 号孩子的 $16$ 种情况，以及“另一个”指 $2$ 号孩子的 $16$ 种情况。注意，由于“另一个”与“其中一个”的具体指代有关，所以这 $32$ 种情况**不是**等可能出现的。

我们根据条件可以将家庭缩减为 $12$ 种，这 $12$ 种家庭是等可能出现的。但是，它们的“另一个”指代的是哪个是不均匀的。具体列表如下。

“另一个”指 $1$ 号孩子（即 $2$ 号孩子出生于上半天）：

| ==$B_AB_A$== |   $B_AB_P$   | ==$B_PB_A$== |   $B_PB_P$   |
|:------------:|:------------:|:------------:|:------------:|
| ==$B_AG_A$== |   $B_AG_P$   | ==$B_PG_A$== |   $B_PG_P$   |
| ==$G_AB_A$== |   $G_AB_P$   | ==$G_PB_A$== |   $G_PB_P$   |
| ==$G_AG_A$== |   $G_AG_P$   | ==$G_PG_A$== |   $G_PG_P$   |

“另一个”指 $2$ 号孩子（即 $1$ 号孩子出生于上半天）：

| ==$B_AB_A$== | ==$B_AB_P$== |   $B_PB_A$   |   $B_PB_P$   |
|:------------:|:------------:|:------------:|:------------:|
| ==$B_AG_A$== | ==$B_AG_P$== |   $B_PG_A$   |   $B_PG_P$   |
| ==$G_AB_A$== | ==$G_AB_P$== |   $G_PB_A$   |   $G_PB_P$   |
| ==$G_AG_A$== | ==$G_AG_P$== |   $G_PG_A$   |   $G_PG_P$   |

表中高亮的样本是满足条件“其中一个孩子出生于上半天”的样本。注意，这些样本出现的可能性是不一致的，但满足条件“其中一个孩子出生于上半天”的**家庭**的可能性是均匀的。也就是说，把这个两个表中左侧三列对应位置样本相加，得到的概率分布是均匀的（每个格子 $\frac{1}{12}$）。于是我们可以得知：

- 位于上面两个表的第一列的样本，每个样本出现的条件概率为 $\frac{1}{24}$；
- 第二、三列的样本，每个样本出现的条件概率为 $\frac{1}{12}$；
- 第四列的样本出现的条件概率为 $0$。

因此，“另一个是男孩”的概率为 $1/2$。

## 小结

- 概率是定义在样本空间上的函数；
- 样本空间的各个样本出现的可能性不一定相同。

对于诸如“其中一个……，求另一个……的概率”的描述，**不能**将其理解为：

> - 事件 $X$：“其中一个……”；
> - 事件 $Y$：“其中一个……，另一个……”；
>
> 求 $P(Y|X)$。

而应理解为：

> - 事件 $X(i)$：“$i$ 满足……”；
> - 事件 $Y(i)$：“$i$ 满足……，且 $3-i$ 满足……”；
>
> 求 $P(Y|X)$。

也就是说，应将事件 $Y(i)$ 和事件 $X(i)$ 均依赖 $i$ 的两个事件。所求概率应为消除变量 $i$ 之后的边缘概率，即

$$
\begin{aligned}
P(Y|X)&=\sum_i P(i)P(Y(i)|X(i)) \\
&=\frac{1}{2}P(Y(1)|X(1)) + \frac{1}{2}P(Y(2)|X(2))
\end{aligned}
$$

### 用该思路解释“两男孩问题”

“两男孩问题”的“另一个”歧义版本：

> - 史密斯先生有两个孩子。**其中一个**是男孩。则**另一个**也是男孩的概率是多少？

- 事件 $X(i)$：$Sex(i)=B$。
- 事件 $Y(i)$：$Sex(i)=B$ 且 $Sex(3-i) = B$。

样本空间：

| $i$ | $Sex$ | $P(\cdot)$    | $P(\cdot \| X(i))$ [^1]|
|:---:|:-----:|:-------------:|:-------------:|
| $1$ | $BB$  | $\frac{1}{8}$ | $\frac{1}{6}$ |
| $1$ | $BG$  | $\frac{1}{8}$ | $\frac{1}{3}$ |
| $1$ | $GB$  | $\frac{1}{8}$ | $0$           |
| $1$ | $GG$  | $\frac{1}{8}$ | $0$           |
| $2$ | $BB$  | $\frac{1}{8}$ | $\frac{1}{6}$ |
| $2$ | $BG$  | $\frac{1}{8}$ | $0$           |
| $2$ | $GB$  | $\frac{1}{8}$ | $\frac{1}{3}$ |
| $2$ | $GG$  | $\frac{1}{8}$ | $0$           |

[^1]: 应为 $P(\cdot | X(i))$，但 Markdown 在表格中似乎不能输入竖线。

注意在 $X(i)$ 的条件下，各样本出现概率不同，但各种家庭出现概率仍然相同（$BB$、$BG$、$GB$ 均为 $1/3$）。可见所求答案为 $1/3$。

## 结语

无论如何，我都不想否认的是“其中一个……，另一个……”的表述容易出现歧义。通过这几篇文章的复杂描述，我想表达的是，不能一刀切地认为“其中一个……，另一个……”必须被理解为像“一号孩子……二号孩子……”这样带有明确指代的描述方式。完全可以通过自洽的逻辑来将其理解为非明确指代的形式。

因此，诸如“其中一个是男孩，求另一个也是男孩的概率”的描述，可以理解为等价于“至少一个是男孩，求两个都是男孩的概率”。当然，如果你一定要认为它等价于“随机抽取一个发现是男孩，求两个都是男孩的概率”也未尝不可，只要清晰明确地描述问题，在此基础上讨论，就一定能得到正确的答案。

最后，我还想强调的是，理解概率问题本身比关注歧义更重要。关于“两男孩”问题本身，我们需要意识到：

- 概率是在已知部分信息的基础上，对未知事件发生的可能性的度量；
- 信息的获取方式潜在地影响概率（上帝视角、抽样次数）；
- 获取额外的信息会影响概率（抽样一次、抽样更多次）。
