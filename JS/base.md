<!--
 * @Author: your name
 * @Date: 2021-06-09 16:01:55
 * @LastEditTime: 2021-07-06 18:05:15
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
# Symbol 
https://zh.javascript.info/symbol
1. “Symbol” 值表示唯一的标识符。
2. Symbol 不会被自动转换为字符串.这是一种防止混乱的“语言保护”，因为字符串和 Symbol 有本质上的不同，不应该意外地将它们转换成另一个,如果需要显示symbol,需要调用toString方法
3. Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。
[使用 Symbol("id") 作为键，比起用字符串 "id" 来有什么好处呢][]
因为 user 对象属于其他的代码，那些代码也会使用这个对象，所以我们不应该在它上面直接添加任何字段，这样很不安全。但是你添加的 Symbol 属性不会被意外访问到，第三方代码根本不会看到它，所以使用 Symbol 基本上不会有问题。
另外，假设另一个脚本希望在 user 中有自己的标识符，以实现自己的目的。这可能是另一个 JavaScript 库，因此脚本之间完全不了解彼此。
[注意]1.Symbol 属性不参与 for..in 循环，Object.keys(user) 也会忽略它们，相反，Object.assign 会同时复制字符串和 symbol 属性， Reflect.ownKeys(obj) 的方法可以返回一个对象的 所有 键，包括 Symbol
4. 全局 symbol
正如我们所看到的，通常所有的 Symbol 都是不同的，即使它们有相同的名字。但有时我们想要名字相同的 Symbol 具有相同的实体。例如，应用程序的不同部分想要访问的 Symbol "id" 指的是完全相同的属性。
```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true
```
## 总结
### Symbol 是唯一标识符的基本类型

### Symbol 是使用带有可选描述（name）的 Symbol() 调用创建的。

### Symbol 总是不同的值，即使它们有相同的名字。如果我们希望同名的 Symbol 相等，那么我们应该使用全局注册表：Symbol.for(key) 返回（如果需要的话则创建）一个以 key 作为名字的全局 Symbol。使用 Symbol.for 多次调用 key 相同的 Symbol 时，返回的就是同一个 Symbol。

Symbol 有两个主要的使用场景：

1. “隐藏” 对象属性。 如果我们想要向“属于”另一个脚本或者库的对象添加一个属性，我们可以创建一个 Symbol 并使用它作为属性的键。Symbol 属性不会出现在 for..in 中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的 symbol。因此，该属性将受到保护，防止被意外使用或重写。
因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的对象中，但其他地方看不到它。

2. JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 Symbol.* 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 Symbol.iterator 来进行 迭代 操作，使用 Symbol.toPrimitive 来设置 对象原始值的转换 等等。

从技术上说，Symbol 不是 100% 隐藏的。有一个内置方法 Object.getOwnPropertySymbols(obj) 允许我们获取所有的 Symbol。还有一个名为 Reflect.ownKeys(obj) 的方法可以返回一个对象的 所有 键，包括 Symbol。所以它们并不是真正的隐藏。但是大多数库、内置方法和语法结构都没有使用这些方法。

# 类型转换
https://zh.javascript.info/type-conversions
有三种常用的类型转换：转换为 string 类型、转换为 number 类型和转换为 boolean 类型。

字符串转换 —— 转换发生在输出内容的时候，也可以通过 String(value) 进行显式转换。原始类型值的 string 类型转换通常是很明显的。

数字型转换 —— 转换发生在进行算术操作时，也可以通过 Number(value) 进行显式转换。

数字型转换遵循以下规则：

值	变成……
undefined	NaN
null	0
true / false	1 / 0
string	“按原样读取”字符串，两端的空白会被忽略。空字符串变成 0。转换出错则输出 NaN。
布尔型转换 —— 转换发生在进行逻辑操作时，也可以通过 Boolean(value) 进行显式转换。

# 基础类型方法注意
## number
1. 函数 toFixed(n) 将数字舍入到小数点后 n 位，并以字符串形式返回结果，注意是字符串；
2. 不精确计算： 在内部，数字是以 64 位格式 IEEE-754 表示的，所以正好有 64 位可以存储一个数字：其中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号。
```js
console.log( 9999999999999999 ) // 10000000000000000
0 === -0 // true,运算符将它们视为相同的值
```
3. Infinity和NaN（和属于 number 类型
Infinity（和 -Infinity）是一个特殊的数值，比任何数值都大（小）。
NaN 代表一个 error，不是数字。
4. 对比
```js
// isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN
alert( isNaN(NaN) ); // true
alert( isNaN("str") ); // true
alert( NaN === NaN ); // false
// isFinite(value) 将其参数转换为数字，如果是常规数字，则返回 true，而不是 NaN/Infinity/-Infinity：
alert( isFinite("15") ); // true
alert( isFinite("str") ); // false，因为是一个特殊的值：NaN
alert( isFinite(Infinity) ); // false，因为是一个特殊的值：Infinity
// 请注意，在所有数字函数中，包括 isFinite，空字符串或仅有空格的字符串均被视为 0
// 与 Object.is 进行比较
// 有一个特殊的内建方法 Object.is，它类似于 === 一样对值进行比较，但它对于两种边缘情况更可靠：

// 它适用于 NaN：Object.is（NaN，NaN）=== true，这是件好事。
// 值 0 和 -0 是不同的：Object.is（0，-0）=== false，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。
// 在所有其他情况下，Object.is(a，b) 与 a === b 相同。
```
## string
1. 反引号允许字符串跨行;
2. 请注意 str.length 是一个数字属性，而不是函数,后面不需要添加括号;\n是一个单独特殊字符,length=1
### 数组
1. 数组是基于对象的。我们可以给它们添加任何属性。
但是 Javascript 引擎会发现，我们在像使用常规对象一样使用数组，那么针对数组的优化就不再适用了，然后对应的优化就会被关闭，这些优化所带来的优势也就荡然无存了。
数组误用的几种方式:
1). 添加一个非数字的属性，比如 arr.test = 5。
2). 制造空洞，比如：添加 arr[0]，然后添加 arr[1000] (它们中间什么都没有)。
3). 以倒序填充数组，比如 arr[1000]，arr[999] 等等。
2. push/pop 方法运行的比较快，而 shift/unshift 比较慢。
shift 操作必须做三件事:
1）移除索引为 0 的元素。
2）把所有的元素向左移动，把索引 1 改成 0，2 改成 1 以此类推，对其重新编号。
3）更新 length 属性。
push/pop只需做3）
3. for..in
1）for..in 循环会遍历 所有属性，不仅仅是这些数字属性。
在浏览器和其它环境中有一种称为“类数组”的对象，它们 看似是数组。也就是说，它们有 length 和索引属性，但是也可能有其它的非数字的属性和方法，这通常是我们不需要的。for..in 循环会把它们都列出来。所以如果我们需要处理类数组对象，这些“额外”的属性就会存在问题。
2）for..in 循环适用于普通对象，并且做了对应的优化。但是不适用于数组，因此速度要慢 10-100 倍。当然即使是这样也依然非常快。只有在遇到瓶颈时可能会有问题。但是我们仍然应该了解这其中的不同。
4. 清空数组最简单的方法就是：arr.length = 0，length减小数组会被截断并且不可逆转;
5. 使用单个参数（即数字）调用 new Array，那么它会创建一个 指定了长度，却没有任何项 的数组。
## 例子
```js
let arr = ["a", "b"];
arr.push(function() {
  alert( this );
})
arr[2](); // // a,b,function(){...}
// arr[2]() 调用从句法来看可以类比于 obj[method]()，与 obj 对应的是 arr，与 method 对应的是 2
```
获取最大子数组
```js
// Kadane算法的简单想法就是寻找所有连续的正的子数组，同时，记录所有这些连续的正的子数组中的和最大的连续数组。每一次我们得到一个正数，就将它与maxSum比较，如果它的值比maxSum大，则更新maxSum的值。

function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    partialSum += item;
    maxSum = Math.max(maxSum, partialSum);
    if (partialSum < 0) partialSum = 0;
  }
  return maxSum;
}
```
## 数组方法
1. delete方法可用
```js
let arr = ["I", "go", "home"];
delete arr[1];
arr // (3) ["I", empty, "home"]
```
2. 查找方法中，includes 的一个非常小的差别是它能正确处理NaN，而不像 indexOf/lastIndexOf
3. 更改原数组的方法：splice/map/sort/reverse(快排|Timsort 算法)
4. 全局方法 Array.from 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组()。

## Symbol.iterator
1. 可以应用 for..of 的对象被称为 可迭代的
1. 可迭代对象必须实现 Symbol.iterator 方法, 一个专门用于使对象可迭代的内置 symbol
1）当 for..of 循环启动时，它会调用这个方法（如果没找到，就会报错）。这个方法必须返回一个 迭代器（iterator） —— 一个有 next 方法的对象。
2）从此开始，for..of 仅适用于这个被返回的对象。
3）当 for..of 循环希望取得下一个数值，它就调用这个对象的 next() 方法。
next() 方法返回的结果的格式必须是 {done: Boolean, value: any}，当 done=true 时，表示迭代结束，否则 value 是下一个值。
```js
let range = [1,6]
range[Symbol.iterator] = function() {
  return {
    current: this[0],
    last: this[this.length - 1],
    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current+=2 };
      } else {
        return { done: true };
      }
    }
  }
}
for (let num of range) { 
  console.log('num: ', num);
}
// 3,5,7
```
2. 一个可迭代对象也许不是类数组对象。反之亦然，类数组对象可能不可迭代。
1）Iterable 如上所述，是实现了 Symbol.iterator 方法的对象。
2）Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组。
```js
let arrayLike = { // 有索引和 length 属性 => 类数组对象
  0: "Hello",
  1: "World",
  length: 2
};
```
3)全局方法 Array.from 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组，不跳空项。
```js
let arrayLike = { // 有索引和 length 属性 => 类数组对象
  0: "Hello",
  1: "World",
  2: 'sss',
  length: 2
};
Array.from(arrayLike); // ["Hello", "World"], length属性相关，2被忽略
Array.from({length:2}) // (2) [undefined, undefined]，length属性相关
Array.from([1,2], item => item + 1); //[2,3]，数组浅拷贝，与map不同，不会跳过空项
Array.from({a: 1}) // []
Array.from('str') // [s,t,r]，与 str.split 方法不同，它依赖于字符串的可迭代特性
Array.from(new Set(array)) // 可迭代对象去重
Array.prototype.slice.call(arguments) // 也可将可迭代对象转为数组
```
3. 总结
1)可以应用 for..of 的对象被称为 可迭代的。
2)技术上来说，可迭代对象必须实现 Symbol.iterator 方法。
3)obj[Symbol.iterator]() 的结果被称为 迭代器（iterator）。由它处理进一步的迭代过程。
4)一个迭代器必须有 next() 方法，它返回一个 {done: Boolean, value: any} 对象，这里 done:true 表明迭代结束，否则 value 就是下一个值。
5)Symbol.iterator 方法会被 for..of 自动调用，但我们也可以直接调用它。
6)内置的可迭代对象例如字符串和数组，都实现了 Symbol.iterator。
7)字符串迭代器能够识别代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）

# Map和Set(可迭代对象)
## Map —— 是一个带键的数据项的集合。
方法和属性如下：
new Map([iterable]) —— 创建 map，可选择带有 [key,value] 对的 iterable（例如数组）来进行初始化。
map.set(key, value) —— 根据键存储值。
map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
map.delete(key) —— 删除指定键的值。
map.clear() —— 清空 map 。
map.size —— 返回当前元素个数。
与普通对象 Object 的不同点：
1)任何键、对象都可以作为键。
2)有其他的便捷方法，如 size 属性。

## Set —— 是一组唯一值的集合。
方法和属性：
new Set([iterable]) —— 创建 set，可选择带有 iterable（例如数组）来进行初始化。
set.add(value) —— 添加一个值（如果 value 存在则不做任何修改），返回 set 本身。
set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
set.clear() —— 清空 set。
set.size —— 元素的个数。
在 Map 和 Set 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。
```js
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
for (let value of map) console.log(value);
// ["1", "str1"]
// [1, "num1"]
// [true, "bool1"]
let set = new Set(["oranges", "apples", "bananas"]);
for (let value of set) console.log(value);
// oranges
// apples
// bananas
```

# WeakMap and WeakSet
1. 不能迭代并且无法获取所有当前内容
2. 它们都不支持引用所有键或其计数的方法和属性。仅允许单个操作。
3. WeakMap 和 WeakSet 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 WeakMap 或 WeakSet 的键，那么它将被自动清除。WeakMap 的主要应用场景是 额外数据的存储。
## WeakMap
https://zh.javascript.info/weakmap-weakset#weakmap
1. WeakMap 是类似于 Map 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问它们，便会将它们与其关联值一同删除。清理时机由JavaScript 引擎决定，所以WeakMap当前元素的数量是未知的，限制不可获取。 只有以下方法
weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)
```js
let john = { name: "John" };
let array = [ john ];
john = null; // 覆盖引用
// 前面由 john 所引用的那个对象被存储在了 array 中
// 所以它不会被垃圾回收机制回收

let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "...");
john = null; // 覆盖引用
// 不会阻止垃圾回收机制对作为键的对象（key object）的回收)
```
2. 使用案例：存储额外的数据&缓存
1）存储额外的数据
假如我们正在处理一个“属于”另一个代码的一个对象，也可能是第三方库，并想存储一些与之相关的数据，那么这些数据就应该与这个对象共存亡 —— 这时候 WeakMap 正是我们所需要的利器。
我们将这些数据放到 WeakMap 中，并使用该对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除。
2）缓存
```js
// 当一个函数的结果需要被记住（“缓存”），这样在后续的对同一个对象的调用时，就可以重用这个被缓存的结果
let cache = new WeakMap();
// 计算并记结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ '第一次执行计算结果';

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};
let result1 = process(obj);
let result2 = process(obj);

// ……稍后，我们不再需要这个对象时：
obj = null;

// 无法获取 cache.size，因为它是一个 WeakMap，
// 要么是 0，或即将变为 0
// 当 obj 被垃圾回收，缓存的数据也会被清除
```
## WeakSet
1. WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问它们，便会将其删除。

# 内建对象 Date
# JSON https://zh.javascript.info/json
JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。即：
函数属性（方法）。
Symbol 类型的属性。
存储 undefined 的属性。