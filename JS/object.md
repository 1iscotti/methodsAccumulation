<!--
 * @Author: your name
 * @Date: 2021-06-10 11:50:31
 * @LastEditTime: 2021-06-24 17:52:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editjs
 * @FilePath: /methodsAccumulation/JS/object.md
-->
# 基础
https://zh.javascript.info/object
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