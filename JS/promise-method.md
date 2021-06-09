<!--
 * @Author: your name
 * @Date: 2021-06-09 11:50:35
 * @LastEditTime: 2021-06-09 11:53:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS/promise-method.md
-->
1. promise中的超时处理
Promise.race()方法是将多个 Promise 实例，包装成一个新的 Promise 实例，和字面意思一样，“竞赛”就是这个方法的实质。只要其中一个Promise率先执行完（不论是解决或拒绝），Promise.race()都会有结果（解决或拒绝），至此我们也很容易想到怎么来解决这个问题了。

将拿取token的方法改成Promise对象，并另外需要一个超时任务的Promise对象
将两个Promise对象放在数组中，在race方法中执行。
```js
function getToken(timeout){
  return Promise.race([
    new Promise((resolve, reject) => {
        someFecth(bridge => {
          bridge.callHandler('gettoken', {foo: 'bar'}, newtoken => {
            resolve(newtoken)
          })
        })
    }),
    //超时任务
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('timeout'))
      }, timeout)
    })
  ])
}
// 当timeout毫秒后，gettoken没有返回token，race方法的参数数组中的第二个Promise对象将会执行完成，执行reject，抛出超时异常。至此，业务代码中执行getToken将不会再阻塞住之后的代码，而会被catch捕获从而进行异常处理。
```

链接：https://juejin.cn/post/6971411461767692325
