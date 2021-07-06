<!--
 * @Author: your name
 * @Date: 2021-06-10 11:50:31
 * @LastEditTime: 2021-06-25 18:03:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editjs
 * @FilePath: /methodsAccumulation/JS/object.md
-->
# 基础
https://zh.javascript.info/object
1. 对象的属性键只能是字符串类型或者 Symbol 类型
它们存储属性（键值对），其中：
属性的键必须是字符串或者 symbol（通常是字符串）。
值可以是任何类型。
# 判断object类型
```js
//判断object类型
const type = (data) => Object.prototype.toString.call(data)
                     .replace(/^\[object (.+)\]$/, '$1')
                     .toLowerCase()
type({})//object
```
# 判断object属性
1. hasOwnProperty：检测一个对象是否含有特定的自身属性。
所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
2. in运算符

# 对象排序
[对象有顺序吗] 有的，遍历对象时，“有特别的顺序”：整数属性会被进行排序，其他属性则按照创建的顺序显示。
为了让整数属性按照创建顺序显示，可以这么操作：
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};
for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}

# 对象拷贝
为了创建“真正的拷贝”（一个克隆），我们可以使用 Object.assign 来做所谓的“浅拷贝”（嵌套对象被通过引用进行拷贝）或者使用“深拷贝”函数，例如 _.cloneDeep(obj)。
1. 浅拷贝Object.assign
```js
Object.assign(dest, [src1, src2, src3...])
// 第一个参数 dest 是指目标对象。
// 更后面的参数 src1, ..., srcN（可按需传递多个参数）是源对象。
// 该方法将所有源对象的属性拷贝到目标对象 dest 中。换句话说，从第二个开始的所有参数的属性都被拷贝到第一个参数的对象中。
// 调用结果返回 dest。
```
2. 深拷贝

# this关键字
1. “this” 不受限制。在 JavaScript 中，this 关键字与其他大多数编程语言中的不同。JavaScript 中的 this 可以用于任何函数，即使它不是对象的方法。
this 的值是在代码运行时计算出来的，它取决于代码上下文。
2. this 的值就是在点之前的这个对象，即调用该方法的对象。
3. 在没有对象的情况下调用：this == undefined
在这种情况下，严格模式下的 this 值为 undefined。如果我们尝试访问 this.name，将会报错。
在非严格模式的情况下，this 将会是 全局对象（浏览器中的 window，我们稍后会在 全局对象 一章中学习它）。这是一个历史行为，"use strict" 已经将其修复了。
通常这种调用是程序出错了。如果在一个函数内部有 this，那么通常意味着它是在对象上下文环境中被调用的。
```js
function sayHi() {
  alert(this);
}
sayHi(); // undefined
```
4. 箭头函数没有自己的 “this”
```js
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow =  function() { console.log(this.firstName) };
    arrow();
  }
};
user.sayHi(); // undefined
----------
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => console.log(this.firstName);
    arrow();
  }
};
// 箭头函数有些特别：它们没有自己的 this。如果我们在这样的函数中引用 this，this 值取决于外部“正常的”函数
// 这里的 arrow() 使用的 this 来自于外部的 user.sayHi() 方法
user.sayHi(); // Ilya
-----------
let user = {
  firstName: "Ilya",
  sayHi() {
    firstName = 'aaaa';
    console.log('sayHi: ', this.firstName);
    let arrow = function() { console.log(this.firstName) };
    arrow();
  }
};

user.sayHi();
// sayHi:  Ilya (sayHi调用过程中的this值是user)
// aaaa (arrow调用自己对象的this)
```
## 案例
实现链式调用以及在对象字面量中使用 "this"
```js
// 链式调用
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert( this.step );
    return this;
  }
}

ladder.up().up().down().up().down().showStep()

// <!-- 对象字面量即key: value方式 -->
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

console.log( user.ref.name ); // ''||严格模式下Uncaught TypeError: Cannot read property 'name' of undefined
console.log( user.ref ); // globalThis||严格模式下Uncaught TypeError: Cannot read property 'name' of undefined
// 这是因为设置 this 的规则不考虑对象定义。只有调用那一刻才重要。
// 这里 makeUser() 中的 this 的值是 undefined，因为它是被作为函数调用的，而不是通过点符号被作为方法调用。
// this 的值是对于整个函数的，代码段和对象字面量对它都没有影响。
// 所以 ref: this 实际上取的是当前函数的 this。
// 获取全局对象globalThis
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
var globals = getGlobal();

```
[总结]
存储在对象属性中的函数被称为“方法”。
方法允许对象进行像 object.doSomething() 这样的“操作”。
方法可以将对象引用为 this。
this 的值是在程序运行时得到的。

一个函数在声明时，可能就使用了 this，但是这个 this 只有在函数被调用时才会有值。
可以在对象之间复制函数。
以“方法”的语法调用函数时：object.method()，调用过程中的 this 值是 object。
请注意箭头函数有些特别：它们没有 this。在箭头函数内部访问到的 this 都是从外部获取的。
## 'use static';
https://www.runoob.com/js/js-strict.html

# 构造函数
## 构造函数在技术上是常规函数。不过有两个约定：
它们的命名以大写字母开头。
它们只能由 "new" 操作符来执行。
当一个函数被使用 new 操作符执行时，它按照以下步骤：
1. 一个新的空对象被创建并分配给 this。
2. 函数体执行。通常它会修改 this，为其添加新的属性。
3. 返回 this 的值。
```js
// 换句话说，new User(...) 做的就是类似的事情：
function User(name) {
  // this = {};（隐式创建）
  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;
  // return this;（隐式返回）
}
new function() { … }
// new function只是被创建和调用。因此，这个技巧旨在封装构建单个对象的代码，而无需将来重用
```
[构造器的目的]实现可重用的对象创建代码
## 构造器模式测试：new.target
在一个函数内部，我们可以使用 new.target 属性来检查它是否被使用 new 进行调用了。
```js
function User() {
  alert(new.target);
}
```
## 构造器的 return
带有对象的 return 返回该对象，在所有其他情况下返回 this。
## 总结
1. 构造函数，或简称构造器，就是常规函数，但大家对于构造器有个共同的约定，就是其命名首字母要大写。
2. 构造函数只能使用 new 来调用。这样的调用意味着在开始时创建了空的 this，并在最后返回填充了值的 this。
我们可以使用构造函数来创建多个类似的对象。

JavaScript 为许多内置的对象提供了构造函数：比如日期 Date、集合 Set 以及其他我们计划学习的内容。