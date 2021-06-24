<!--
 * @Author: your name
 * @Date: 2021-06-11 18:13:42
 * @LastEditTime: 2021-06-11 18:15:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS/let/const.md
-->
1. let深入理解---let存在变量提升吗
https://www.jianshu.com/p/0f49c88cf169
https://zhuanlan.zhihu.com/p/28117094
let 的「创建」过程被提升了，但是初始化没有提升。
var 的「创建」和「初始化」都被提升了。
function 的「创建」「初始化」和「赋值」都被提升了。
最后看 const，其实 const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。

2. 如何理解 let x = x 报错之后，再次 let x 依然会报错？（这个问题是饥人谷的学生问我的）

这个问题说明：如果 let x 的初始化过程失败了，那么x 变量就将永远处于 created 状态。
你无法再次对 x 进行初始化（初始化只有一次机会，而那次机会你失败了）。
由于 x 无法被初始化，所以 x 永远处在暂时死区（也就是盗梦空间里的 limbo）！
有人会觉得 JS 坑，怎么能出现这种情况；其实问题不大，因为此时代码已经报错了，后面的代码想执行也没机会。

