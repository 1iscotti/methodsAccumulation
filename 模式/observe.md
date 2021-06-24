<!--
 * @Author: your name
 * @Date: 2021-06-08 17:21:05
 * @LastEditTime: 2021-06-09 11:24:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/bianchen/observe.md
-->
# 观察者模式

所谓观察者模式，其实就是为了面向接口编程，实现松耦合(loosely coupled)
观察者模式定义对象一对多依赖关系，当一个对象发生改变时，其相关依赖对象得到通知并更新。在观察者模式中，发生改变的对象称作观察目标，其它作出反应的对象叫做观察者。



## 应用场景
？开发过程中，观察者模式经常被用到，最典型的例子就是事件监听。

```js
a.addEventListener('eventName', b)
a.addEventListener('eventName', c)
```

这里a是观察目标，b/c是观察者，当a更新时，通过event将消息传递给b/c，b/c作出自己的行为


## 实现

```typescript
class Subject{
  constructor(){
    this.subs = [];
  }
  addSub(sub){
    this.subs.push(sub);
  }
  notify(){
    this.subs.forEach(sub=> {
      sub.update();
    });
  }
}
class Observer{
  update(){
    console.log('update');
  }
}
let subject = new Subject();
let ob = new Observer();
//目标添加观察者了
subject.addSub(ob);
//目标发布消息调用观察者的更新方法了
subject.notify();   //update
// 观察者
class Observer {
    constructor() {

    }
    update(val) {

    }
}
或者：
// 观察者列表
class ObserverList {
    constructor() {
        this.observerList = []
    }
    add(observer) {
        return this.observerList.push(observer);
    }
    remove(observer) {
        this.observerList = this.observerList.filter(ob => ob !== observer);
    }
    count() {
        return this.observerList.length;
    }
    get(index) {
        return this.observerList[index];
    }
}
// 目标
class Subject {
    constructor() {
        this.observers = new ObserverList();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.remove(observer);
    }
    notify(...args) {
        let obCount = this.observers.count();
        for (let index = 0; index < obCount; index++) {
            this.observers.get(i).update(...args);
        }
    }
}
```

## 参考
- [维基百科](https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)
- [观察者模式](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/observer.html)
