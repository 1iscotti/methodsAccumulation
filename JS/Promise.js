/*
 * @Author: your name
 * @Date: 2020-08-17 16:25:22
 * @LastEditTime: 2021-06-01 19:16:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS方法/Promise.js
 */
function Promise(exector){
  let self = this;
  //标识
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;
  //存储then中成功和失败的回调
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  function resolve(value){
      if(self.status === 'pending'){
          self.value = value;
          self.status = 'resolved';
          //遍历then中成功的所有回调函数
          self.onResolvedCallbacks.forEach(fn=>fn());
      }
  }

  function reject(reason){
      if(self.status === 'pending'){
          self.reason = reason;
          self.status = 'rejected';
          self.onRejectedCallbacks.forEach((fn=>fn()));
      }
  }

  //对异常进行处理
  try{
      exector(resolve, reject);
  } catch(e) {
      reject(e);
  }
}
// 每个then方法都返回一个新的Promise对象（原理的核心）
// 如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
// 如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回。
// 如果then方法中没有return语句，就视为返回一个用Undefined包装的Promise对象
// 若then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
// 如果then方法没有传入任何回调，则继续向下传递（值的传递特性）。
//添加成功和失败的回调函数
Promise.prototype.then = function(onFulfilled, onRejected){
  let self = this;
  if(this.status === 'resolved') {
      onFulfilled(self.value);
  }
  if(this.status === 'rejected') {
      onRejected(self.reason);
  }
  //异步执行
  //在执行then方法时如果还在等待态（pending），
  //就把回调函数临时寄存到一个数组里，
  //当状态发生改变时依次从数组中取出执行：
  if(this.status === 'pending'){
      this.onResolvedCallbacks.push(()=>{
          onFulfilled(self.value);
      })

      this.onRejectedCallbacks.push(()=>{
          onRejected(self.reason);
      })
  }
}

//console.log('test');
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      if(Math.random() > 0.5) {
          resolve('成功');
      } else {
          reject('失败');
      }
  })
})

promise.then((data) => {
  console.log('success' + data);
}, (err) => {
  console.log('err' + err);
})}
}

console.log(Reflect.apply(Math.floor, undefined, [1.75]));
// expected output: 1

console.log(Function.prototype.apply.call(Math.floor, undefined, [1.75]));
// expected output: 1

