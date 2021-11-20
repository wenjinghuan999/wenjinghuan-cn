---
category: 数学
tag:
  - 数学
  - Notebook
editLink: false
---

# 生成任意分布的随机数

一般的编程语言或库都有生成均匀分布的（伪）随机数的函数。但有时我们会需要生成一个具有指定分布函数的随机数。这就需要我们对均匀分布的随机数进行变换。

比如我们可能会经常遇到的，生成一个均匀分布于二维平面单位圆内的随机点。通常做法可以是生成 $x, y \sim U(-1, 1)$，然后判断是否在单位圆内，如果不在则重新取。

## 圆内均匀分布的简单实现


```python
import random
from typing import Tuple, List
from matplotlib import pyplot as plt

Point = Tuple[float, float]

def random_point_in_unit_circle_trivial() -> Point:
    while True:
        x = 2.0 * random.random() - 1.0
        y = 2.0 * random.random() - 1.0
        if x ** 2 + y ** 2 < 1:
            return x, y

# https://stackoverflow.com/questions/9081553/python-scatter-plot-size-and-style-of-the-marker/24567352#24567352
# https://stackoverflow.com/a/24568380/4635234
def draw_circle(center: Point, radius: float, **kwargs):
    import matplotlib.patches
    import matplotlib.collections
    patches = [matplotlib.patches.Circle(center, radius)]
    collection = matplotlib.collections.PatchCollection(patches, **kwargs)

    ax = plt.gca()
    ax.add_collection(collection)
    ax.autoscale_view()
    ax.axis('equal')

def draw_points(points: List[Point]):
    x, y = zip(*points)
    plt.scatter(x, y)

points = [random_point_in_unit_circle_trivial() for _ in range(500)]
draw_points(points)
draw_circle((0, 0), 1, alpha=0.2, edgecolor='b')
```


    
![png](random_dist_files/random_dist_3_0.png)
    




这当然是一个方法，但它局限于均匀分布。而且重复随机采样，虽然平均复杂度仍为 $O(1)$，但是似乎不太优雅。有没有一种更通用的方法呢？



## 基于分布函数的方法

还是同样的问题。我们可以看出，在单位圆内均匀分布的点，用笛卡尔坐标表示为 $(X, Y)$，满足如下分布函数：
$$
f_{XY}(x, y) = \left\{
\begin{aligned}
&\frac{1}{\pi}, & x^2 + y^2 < 1 \\
&0, & \text{otherwise}
\end{aligned}
\right.
$$
这看起来并不是一个非常简单的分布函数。我们不妨用极坐标表示为 $(R, \Theta)$。（其中 $R, \Theta$ 为随机变量，$\Theta$ 是 $\theta$ 的大写。）这样有
$$
g_{R\Theta}(r, \theta) = \left\{
\begin{aligned}
&\frac{r}{\pi}, & r < 1 \\
&0, & \text{otherwise}
\end{aligned}
\right.
$$
（以下将两个分布函数简写为 $f$、$g$。）

这个分布函数是如何得到的呢？这就是多元微积分的知识了。实际上我们可以先验证一下这个分布函数是否正确，至少它应满足积分为$1$。
$$
\int_0^{2\pi}d\theta \int_0^1 g(r, \theta) dr = 1
$$
确实没错。

教材上会告诉我们，要对分布函数进行变换，需要计算 Jacobi 矩阵的行列式，然后可能会给出一堆证明，令人头秃。实际上，我们可以通过极坐标和笛卡尔坐标的微分转换关系，用一个比较形象的方法得到上述分布函数。

![Cartesian vs. Polar](./imgs/random_dist/cartesian_polar.png)

在单位圆内取一个微小的区域 $d\Omega$。无论用何种坐标系，点落在这个微小区域内的概率应该是一样的，即
$$
p_{d\Omega} = P(x < X < x + dx, y < Y < y + dy) = P(r < R < r + dr, \theta < \Theta < \theta + d\theta)
$$
用分布函数的积分值表示上述点落在这个区域内的概率，即
$$
f(x, y)dxdy = g(r, \theta) dr d\theta
$$
而根据微分的转换关系，有
$$
dxdy = r dr d\theta
$$
这可以由 Jacobi 矩阵的行列式得到，也可以用上图来看出。$dx dy$ 是用直角坐标系计算 $d\Omega$ 的面积，而 $r dr d\theta$ 是用极坐标系计算 $d\Omega$ 的面积，其中 $dr$ 是沿极坐标径向的长度，$r d\theta$ 是垂直于径向的弧长。注意这只是形象的解释，具体计算原则还是应该按照教科书上的推导。

所以有
$$
g(r, \theta) = f(x, y) r = \frac{r}{\pi}, \quad 0 < r < 1
$$

那么可以看出 $r$ 和 $\theta$ 的分布函数相互独立，即
$$
g_{R\Theta}(r, \theta) = h_{R}(r)\cdot t_{\Theta}(\theta) = 2r \cdot \frac{1}{2\pi} 
$$
我们只需要生成一个 $[0, 2\pi)$ 均匀分布的 $\Theta$，和一个在 $[0, 1)$ 上、分布函数为 $h(r) = 2r$ 的 $R$ 即可。

接下来问题就是如何生成分布函数为 $h(r) = 2r, r \in [0, 1)$ 的随机变量了。

## 生成服从某分布函数的随机变量

考虑服从以下分布函数的随机变量 $R$：
$$
f_R(r)=2r, \quad r \in [0, 1)
$$
我们在程序中可以直接随机生成的随机数 $Z$ 一般是服从 $U(0, 1)$ 的。即分布函数为
$$
f_Z(z) = 1, \quad z \in [0, 1)
$$

现在我们希望建立 $R$、$Z$ 之间的函数关系，这样我们就可以通过一个变换，从随机生成的 $Z$ 得到 $R$。这个函数关系我们还不知道。那么我们仍然可以用两个分布函数分别表示随机数落在某一微小区间 $d\Omega$ 内的概率：
$$
p_{d\Omega} = P(r < R < r + dr) = P(z < Z < z + dz)
$$
用分布函数的微分表示：
$$
f_R(r)dr = f_Z(z)dz
$$
那么
$$
\frac{dz}{dr} = \frac{f_R(r)}{f_Z(z)} = 2r
$$
神奇了，我们得到了 $z$ 关于 $r$ 的导数。那么对其积分，可得
$$
z = r^2 + C
$$
根据 $z$ 和 $r$ 的定义域，我们可以约定 $z = 0$ 时 $r = 0$，那么 $C = 0$，于是
$$
z = r^2
$$
即
$$
r = \sqrt{z}
$$

也就是说，我们生成一个 $Z \sim U(0, 1)$，然后求根号，就得到了服从分布函数 $f_R$ 的 $R$ 了。

我们试试用这个方法生成单位圆内均匀分布的点。


```python
import math

def random_point_in_unit_circle() -> Point:
    while True:
        r = math.sqrt(random.random())
        theta = 2 * math.pi * random.random()
        return r * math.cos(theta), r * math.sin(theta)

points = [random_point_in_unit_circle() for _ in range(500)]
draw_points(points)
draw_circle((0, 0), 1, alpha=0.2, edgecolor='b')
```


    
![png](random_dist_files/random_dist_7_0.png)
    


也可以验证一下 $R$ 的分布是不是服从上述函数。


```python
def draw_density(x, nbins=20):
    import matplotlib.cm
    cmap = matplotlib.cm.get_cmap()
    plt.hist(x, nbins, density=True, facecolor='w', edgecolor=cmap(0.25))

r = [math.sqrt(random.random()) for _ in range(2000)]
draw_density(r)
# draw f(r) = 2r
_ = plt.plot([0, 1], [0, 2])
```


    
![png](random_dist_files/random_dist_9_0.png)
    


## 方法总结

为了生成服从某分布函数 $f_X(x)$ 的随机变量 $X$，我们需要首先利用已有函数生成服从 $U(0, 1)$ 均匀分布的随机变量 $Z$，然后根据
$$
f_X(x)dx = f_Z(z)dz
$$
推导出
$$
\frac{dz}{dx} = \frac{f_X(x)}{f_Z(z)} = f_X(x)
$$
对其积分得到
$$
z = \int f_X(x) dx
$$
然后根据 $X$ 的取值范围确定不定积分需要的常数 $C$，得到 $z$ 关于 $x$ 的函数
$$
z = g(x)
$$
最后求其反函数得
$$
x = g^{-1}(z)
$$
对随机数 $Z$ 进行该变换后即可得到服从 $f_X(x)$ 的 $X$。

## 再实践一次

利用上述方法，我们尝试一下生成服从标准正态分布 $N(0,1)$ 的随机变量 $X$。可知
$$
f_X(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{1}{2}x^2}
$$
其不定积分
$$
\int f_X(x) dx = \frac{1}{2} \left(1 + \text{erf}\left(\frac{x}{\sqrt{2}}\right)\right) + C
$$
其中 $\text{erf}(\cdot)$ 是[误差函数](https://en.wikipedia.org/wiki/Error_function)。若我们希望取随机数 $z = 0$ 时对应 $x = -\infty$，那么由于
$$
\lim_{x \to -\infty}{\text{erf}(x)} = -1
$$
所以 $C = 0$。因此我们有 $z$ 和 $x$ 之间的变换关系：
$$
z = g(x) = \frac{1}{2} \left(1 + \text{erf}\left(\frac{x}{\sqrt{2}}\right)\right)
$$
取其反函数
$$
x = g^{-1}(z) = \sqrt{2} \cdot \text{erf}^{-1}(2z - 1)
$$
让我们用代码验证一下。


```python
import scipy.special
import numpy as np

def random_normal() -> float:
    z = random.random()
    x = math.sqrt(2) * scipy.special.erfinv(2 * z - 1)
    return x

x = [random_normal() for _ in range(2000)]
draw_density(x)
# draw normal distribution function
t = np.linspace(-4.0, 4.0, 100)
y = np.exp(-0.5 * t ** 2) / math.sqrt(2 * math.pi)
_ = plt.plot(t, y)
```


    
![png](random_dist_files/random_dist_12_0.png)
    


:::slot content-bottom
<div class="page-meta">
    <div class="edit-link">
        <a href="https://nbviewer.org/github/wenjinghuan999/wenjinghuan-cn/blob/main/notebook/random_dist.ipynb" target="_blank" rel="noopener noreferrer">查看原始Notebook</a>
    </div>
</div>
:::
