<!--
 * @Author: your name
 * @Date: 2021-06-08 17:38:24
 * @LastEditTime: 2021-06-08 21:12:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/bianchen/publish-subscribe.md
-->
1. 发布订阅模式里，发布者和订阅者是完全解耦的。
实现思路
[]创建一个对象
[]在该对象上创建一个缓存列表（调度中心）
[]on 方法用来把函数 fn 都加到缓存列表中（订阅者注册事件到调度中心）
[]emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）
[]off 方法可以根据 event 值取消订阅（取消订阅）
[]once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
```typescript
let eventEmitter = {
    // 缓存列表
    list: {},
    // 订阅
    on (event, fn) {
        let _this = this;
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (_this.list[event] || (_this.list[event] = [])).push(fn);
        return _this;
    },
    // 监听一次
    once (event, fn) {
        // 先绑定，调用后删除
        let _this = this;
        function on () {
            _this.off(event, on);
            fn.apply(_this, arguments);
        }
        on.fn = fn;
        _this.on(event, on);
        return _this;
    },
    // 取消订阅
    off (event, fn) {
        let _this = this;
        let fns = _this.list[event];
        // 如果缓存列表中没有相应的 fn，返回false
        if (!fns) return false;
        if (!fn) {
            // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
            fns && (fns.length = 0);
        } else {
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            let cb;
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cb = fns[i];
                if (cb === fn || cb.fn === fn) {
                    fns.splice(i, 1);
                    break
                }
            }
        }
        return _this;
    },
    // 发布
    emit () {
        let _this = this;
        // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        let event = [].shift.call(arguments),
            fns = [..._this.list[event]];
        // 如果缓存列表里没有 fn 就返回 false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历 event 值对应的缓存列表，依次执行 fn
        fns.forEach(fn => {
            fn.apply(_this, arguments);
        });
        return _this;
    }
};

function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

// eventEmitter.on('article1', user3).emit('article1', 'test111');

/*
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户4订阅了: Javascript 观察者模式
*/
或者：
type Listener = (eventName: String, info: unknown) => unknown;

class EventBus {
  listenerMap: Map<string, Listener[]>;
  constructor() {
    this.listenerMap = new Map();
  }
  // 订阅
  on(eventName: string, fn: Listener) {
    const { listenerMap } = this;
    if (!listenerMap.has(eventName)) {
      listenerMap.set(eventName, []);
    }

    listenerMap.get(eventName).push(fn);
  }
  // 发布
  emit(eventName: string, info?: unknown) {
    const { listenerMap } = this;
    if (!listenerMap.has(eventName)) {
      return;
    }

    const listeners = listenerMap.get(eventName);
    listeners.forEach(listener => listener(eventName, info));
  }
  // 移除
  off(eventName: string) {
    const { listenerMap } = this;
    if (listenerMap.has(eventName)) {
      listenerMap.delete(eventName);
    }
  }
}

const test = new EventBus();
test.on('something', (info) => {console.log('sssss', info)});
test.emit('something', 'aa')
```

观察者模式：观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

发布订阅模式：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

差异：

在观察者模式中，观察者是知道 Subject 的，Subject 一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。