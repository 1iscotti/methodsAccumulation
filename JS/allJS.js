/*
 * @Author: your name
 * @Date: 2021-06-02 11:50:29
 * @LastEditTime: 2021-06-02 11:54:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS方法/allJS.js
 */
// setTimout第三个参数
setTimeout(function(x) {
  console.log(x);
}, 1000, 1);
// 输出1
setTimeout(function(x,y) {
  console.log(x+y);
}, 1000, 1, 2);
// 输出3
// 从第三个参数开始就是可选参数，setTimeout
// var timeoutID = scope.setTimeout(function[, delay, arg1, arg2, ...]);
// var timeoutID = scope.setTimeout(function[, delay]);
// var timeoutID = scope.setTimeout(code[, delay]);
// 可以不通过闭包解决输出问题0～5问题
// 当然还是作用域的问题，但是在这里setTimeout第三个参数却把i的值给保存了下来。这种解决方法比使用闭包轻快的多
for(var i=0;i<6;i++) {

  setTimeout(function(j) {

      console.log(j);

  }, 1000, i);

}