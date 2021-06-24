<!--
 * @Author: your name
 * @Date: 2021-06-09 14:36:01
 * @LastEditTime: 2021-06-09 14:47:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/性能/problem.md
-->
https://juejin.cn/post/6970987477133705252
1. 什么是前端性能优化？
2. 你为前端性能优化做过什么？
3. 前端性能优化到底应该如何答复？

性能指标设定（FPS、页面秒开率、报错率、请求数等）
性能标准确定
收益评估
诊断清单
[重]优化手段
# 首屏秒开
## 懒加载
[.]在长页面加载过程时，先加载关键内容，延迟加载非关键内容。比如当我们打开一个页面，它的内容超过了浏览器的可视区口大小，我们可以先加载前端的可视区域内容，剩下的内容等它进入可视区域后再按需加载。
1）图片懒加载
图片是native做过缓存的。
在可视区域出现才会加载
1.1 卡片预先加载（懒加载的时机改变）
并不是进入可视区域才加载卡片的。而是当上一张卡片进入可视区域就预先加载下一张卡片。 因为相对于图片，加载卡片UI会快得多。 这也是无痕浏览的保障之一。
1.2 动画懒加载
假如你快速的进行划屏滚动，List滚动高度发生很大变化，那请求数据最终还是会敌不过你的高速滑动。也就是说，在没有新的数据之前你看不到下一张卡片了，这是你必须等待了。这时候就会有一个loading的动画显示，接着等拿到了新数据，新卡片就会出现并且自动完全滑入可视区域。
这里会有人说了，IOS的阻尼本来就会使得动画、滚动效果更加顺畅。在这里为想说的是，Android也一样可以。
2） 缓存
接口和静态资源缓存
3） 离线化
保证首次加载为秒开的离线包设计
4） 并行化

# 骨架屏
## 组件骨架屏（fallback）
```js
<React.Suspense fallback = { <LoadingIndicator /> }>
```
## 图片骨架屏（懒加载组件失败提示页面）
```js
React.lazy(() => import(`../../src/containers/${item.componentName}/index.tsx`).catch((err) => {
  // 如果路径不存在，则降级为LoadingErrorPage；
  return import('../pages/LoadingErrorPage/index')
}))
```
3）ssr
4) webView层及代码架构层面优化
## WebView 性能优化
## 并行初始化
## 资源预加载
## 数据接口请求优化
## 前端架构性能调优
## 长列表性能优化
## 打包优化