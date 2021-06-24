<!--
 * @Author: your name
 * @Date: 2021-06-09 16:01:55
 * @LastEditTime: 2021-06-23 21:14:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS/base.md
-->
8种内置类型：类型分为基本类型和复合类型两种，除了对象，其它都是基本类型
```js
number 用于任何类型的数字：整数或浮点数，在 ±(253-1) 范围内的整数。
bigint 用于任意长度的整数。(ESNext stage 4)
string 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
boolean 用于 true 和 false。
null 用于未知的值 —— 只有一个 null 值的独立类型。
undefined 用于未定义的值 —— 只有一个 undefined 值的独立类型。
symbol 用于唯一的标识符。(ES2015)
object 用于更复杂的数据结构。(函数、数组为子类型)
```
extra：隐式转换https://mp.weixin.qq.com/s/HQtF7A6_sdYPQOzsu6LOgQ
{} + [] === 0; // true
{ a: 2 } + [] === 0; // true
这是{}其实代表的是代码块，最后就变成了+ []，根据前面的原则，数组先被转换成字符串""，接着因为+x的运算，字符串被转成数字0。
那 { a: 2 } 总该是对象了吧？其实这时候a不是代表对象属性，而是被当成了标签（label），标签这东西IE6就已经有了。所以如果我们写成对象是会报错的，逗号要改成分号才能通过编译。
// Uncaught SyntaxError: Unexpected token ':'
{ a: 2, b: 3 } + []
// 分号OK
{ a: 2; b: 3 } + [] === 0;
代码块 {} 必须在最前面，否则它就是对象，但也有特例（分号）
;{} + [] === 0 // true

8. toPrimitive()函数是如何执行的
https://segmentfault.com/a/1190000016325587
应用场景：在JavaScript中，如果想要将对象转换成基本类型时，也就是所谓的拆箱时，会调用toPrimitive()。
函数结构：toPrimitive(input,preferedType?)
参数解释：
input是输入的值，即要转换的对象，必选；
preferedType是期望转换的基本类型，他可以是字符串，也可以是数字。选填，默认为number；
执行过程：
如果转换的类型是number，会执行以下步骤：
1）. 如果input是原始值，直接返回这个值；
2）. 否则，如果input是对象，调用input.valueOf()，如果结果是原始值，返回结果；
3）. 否则，调用input.toString()。如果结果是原始值，返回结果；
4）. 否则，抛出错误。
如果转换的类型是String，2和3会交换执行，即先执行toString()方法。
你也可以省略preferedType，此时，日期会被认为是字符串，而其他的值会被当做Number。

# null和undefined的区别？
https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html
```JS
Number(undefined) // NaN
Number(null) // 0
```

null表示"没有对象"，即该处不应该有值。典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。


Object.getPrototypeOf(Object.prototype)
// null

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。


var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
