<!--
 * @Author: your name
 * @Date: 2021-06-09 15:25:45
 * @LastEditTime: 2021-06-09 15:49:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/react/hooks.md
-->
# useImperativeHandle和forwardRef
REACT HOOKS: USEREF, USEIMPERATIVEHANDLE, FORWARDREF
https://www.freesion.com/article/5234762826/
官方建议useImperativeHandle和forwardRef同时使用，减少暴露给父组件的属性，避免使用 ref 这样的命令式代码
## forwardref
https://www.xinran001.com/frontend/493.html
1. 通过forwardRef可以将ref转发给子组件,子组件拿到父组件创建的ref, 绑定到自己的某一个元素中
2. forwardRef的做法本身没有什么问题, 但是我们是将子组件的DOM直接暴露给了父组件:
1)直接暴露给父组件带来的问题是某些情况的不可控
2)父组件可以拿到DOM后进行任意的操作
3)我们只是希望父组件可以操作的focus，其他并不希望它随意操作其他方法
## useImperativeHandle
useImperativeHandle(ref, createHandle, [deps])
1. 通过useImperativeHandle可以只暴露特定的操作
2. 通过useImperativeHandle的Hook, 将父组件传入的ref和useImperativeHandle第二个参数返回的对象绑定到了一起
所以在父组件中, 调用inputRef.current时, 实际上是返回的对象

useImperativeHandle使用简单总结:
作用: 减少暴露给父组件获取的DOM元素属性, 只暴露给父组件需要用到的DOM方法,用于减少父组件中通过forward+useRef获取子组件DOM元素暴露的属性过多
参数1: 父组件传递的ref属性
参数2: 返回一个对象, 以供给父组件中通过ref.current调用该对象中的方法

总结：
useRef: 用于获取元素的原生DOM或者获取自定义组件所暴露出来的ref方法(父组件可以通过ref获取子组件，并调用相对应子组件中的方法)
useImperativeHandle:在函数式组件中，用于定义暴露给父组件的ref方法。
React.forwardRef: 将ref父类的ref作为参数传入函数式组件中，本身props只带有children这个参数，这样可以让子类转发父类的ref,当父类把ref挂在到子组件上时，子组件外部通过forwrardRef包裹，可以直接将父组件创建的ref挂在到子组件的某个dom元素上