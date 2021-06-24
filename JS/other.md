<!--
 * @Author: your name
 * @Date: 2021-06-11 11:23:12
 * @LastEditTime: 2021-06-24 21:14:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS/other.md
-->
# 垃圾回收
https://segmentfault.com/a/1190000018605776
## WeakMap垃圾回收机制
http://www.ruanyifeng.com/blog/2017/04/memory-leak.html

# 模块机制
commonjs和es6有啥不同

# 内存空格
https://www.cnblogs.com/mcray/p/7002089.html
## 堆栈
1. 栈数据结构的一个特点就是后进先出，好比羽毛球盒子，在一头放羽毛球，在另外一头取羽毛球。
2. 堆数据结构，好比书架上的书，虽然已经按顺序放好了，但是我们只要知道书的名字，就可以对应的取下来，类似于JSON对象中的key-value
<!-- 另一说法 -->
在JavaScript中与对象有关系的内存区域有四部分组成：
堆空间， 栈空间，数据空间，代码空间。
其中
1. 栈空间
存放的数据大小比较小，一般固定大小的信息适合存放在该空间，例 如整型、boolean、对象的引用(名称)。
2. 堆空间
该空间存储的数据比较多，空间较大，一般数据长度不固定的信息在该空间存放，例如： string、Array、对象实体。
3. 数据空间
该空间存放常量、类的静态属性。
4. 代码空间
存放函数体、方法体代码。
## 内存泄漏
### 垃圾回收机制
https://zhuanlan.zhihu.com/p/60279001
https://zh.javascript.info/garbage-collection
[几种垃圾回收算法]：https://www.jianshu.com/p/a8a04fd00c3c
1. 引用计数垃圾回收机制
2. 标记清除垃圾回收机制
3. 标记-压缩
4. GC 复制算法
5. 保守式GC
6. 分代回收
7. 增量式GC
https://www.cnblogs.com/zhangguicheng/articles/12782167.html
### 什么算垃圾
一般来说没有被引用的对象就是垃圾，就是要被清除， 有个例外如果几个对象引用形成一个环，互相引用，但根访问不到它们，这几个对象也是垃圾，也要被清除。
### 内存泄漏情况
https://zhuanlan.zhihu.com/p/80762858
1. 意外的全局变量
```js
function foo() { 
  bar1 = 'some text';
}
```
bar1 实际上是一个全局变量。

2. 被遗忘的定时器和回调函数

在很多库中, 如果使用了观察者模式, 都会提供回调方法, 来调用一些回调函数。 要记得回收这些回调函数。举一个 setInterval的例子：
```js
var serverData = loadData();
setInterval(function() { 
  var renderer = document.getElementById('renderer'); 
  if(renderer) { 
    renderer.innerHTML = JSON.stringify(serverData); 
  }
}, 5000); 
```
每 5 秒调用一次复制代码如果后续 renderer 元素被移除，整个定时器实际上没有任何作用。 但如果你没有回收定时器，整个定时器依然有效, 不但定时器无法被内存回收， 定时器函数中的依赖也无法回收。在这个案例中的 serverData 也无法被回收。

3. 闭包（闭包并不是内存泄漏的原因，只是回收的问题[js闭包测试]https://www.cnblogs.com/rubylouvre/p/3345294.html）

在 JS 开发中，我们会经常用到闭包，一个内部函数，有权访问包含其的外部函数中的变量。 下面这种情况下，闭包也会造成内存泄露:
```js
var theThing = null;
var replaceThing = function () { 
  var originalThing = theThing; 
  var unused = function () { 
    if (originalThing) // 对于 'originalThing'的引用 
    console.log("hi"); 
  }; 
  theThing = { 
    longStr: new Array(1000000).join('*'), 
    someMethod: function () { 
      console.log("message"); 
    } 
  };
};
```
setInterval(replaceThing, 1000);
复制代码这段代码，每次调用 replaceThing 时，theThing 获得了包含一个巨大的数组和一个对于新闭包 someMethod 的对象。 同时 unused 是一个引用了 originalThing 的闭包。

这个范例的关键在于，闭包之间是共享作用域的，尽管 unused 可能一直没有被调用，但是 someMethod 可能会被调用，就会导致无法对其内存进行回收。 当这段代码被反复执行时，内存会持续增长。

4. DOM 引用

很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中。

var elements = { image: document.getElementById('image')};function doStuff() { elements.image.src = 'http://example.com/image_name.png';}function removeImage() { document.body.removeChild(document.getElementById('image')); 
这个时候我们对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.}复制代码上述案例中，即使我们对于 image 元素进行了移除，但是仍然有对 image 元素的引用，依然无法对齐进行内存回收。

另外需要注意的一个点是，对于一个 Dom 树的叶子节点的引用。 举个例子: 如果我们引用了一个表格中的td元素，一旦在 Dom 中删除了整个表格，我们直观的觉得内存回收应该回收除了被引用的 td 外的其他元素。 但是事实上，这个 td 元素是整个表格的一个子元素，并保留对于其父元素的引用。 这就会导致对于整个表格，都无法进行内存回收。所以我们要小心处理对于 Dom 元素的引用。

let a = {};
let b = () => {
  let c = a;
  console.log('c: ', c);
}
a = 8;
b();
### 引申闭包的概念
https://zhuanlan.zhihu.com/p/22486908
闭包是 JS 函数作用域的副产品。
换句话说，正是由于 JS 的函数内部可以使用函数外部的变量，所以这段代码正好符合了闭包的定义。而不是 JS 故意要使用闭包。
```js
function foo(){
  var local = 1
  function bar(){
    local++
    return local
  }
  return bar
}

var func = foo()
func()
// 隐藏local变量用于计数
```
闭包的作用
闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」。
假设我们在做一个游戏，在写其中关于「还剩几条命」的代码。