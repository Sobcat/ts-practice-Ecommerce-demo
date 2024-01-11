import { track, trigger, pauseTracking, resumeTracking } from './effect.js'
import { TrackOpTypes, TriggerOpTypes } from './operations.js'
import { reactive } from './reactive.js'
import { isObject, hasChanged } from './utils.js'

const RAW = Symbol('raw')
const arrayFuntionObj = {}
// 为了让数组元素里面的代理对象正确
;['includes', 'indexOf', 'lastIndexOf'].forEach((key) => {
  arrayFuntionObj[key] = function (...args) {
    // this-->proxy
    // 正常在代理数组对象上找
    let res = Array.prototype[key].apply(this, args) // 外面的 state 代理数组对象调用 includes 后， 相当于原本正常执行 state.includes，但这里用原型 Array.includes 去找，因为我们已经对 includes 属性做了拦截处理，不是默认了，如果直接再次 state.includes 的话会导致下面代码死循环
    // 找不到去原始数组找
    if (res < 0 || res === false) {
      res = Array.prototype[key].apply(this[RAW], args) // 上面不行之后，读取 state[RAW] 属性, 返回了原始数组，用 [原始数组].includes
    }
    return res
  }
})
;['push'].forEach((key) => {
  arrayFuntionObj[key] = function (...args) {
    pauseTracking() // 暂停依赖收集
    const res = Array.prototype[key].apply(this, args)
    resumeTracking() // 恢复依赖收集
    return res
  }
})

// receiver: this 指向，内部方法默认的
function get(target, key, receiver) {
  if (key === RAW) {
    console.log(1, key)
    return target
  }
  // 依赖收集
  track(target, TrackOpTypes.GET, key)
  if (Reflect.has(arrayFuntionObj, key) && Array.isArray(target)) {
    return arrayFuntionObj[key]
  }
  const result = Reflect.get(target, key, receiver)
  if (isObject(result)) {
    return reactive(result)
  }
  return result
}

function set(target, key, newValue, receiver) {
  const type = Reflect.has(target, key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
  const oldValue = target[key] // 不能用 reflect.get, 因为对象里面如果有类似 get key(){ return this.a + this.b } 的属性, 会触发依赖收集
  const oldLen = Array.isArray(target) ? target.length : undefined
  const result = Reflect.set(target, key, newValue, receiver)
  if (!result) {
    return result
  }
  const newLen = Array.isArray(target) ? target.length : undefined
  // 派发更新
  if (hasChanged(oldValue, newValue) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key)
    if (Array.isArray(target) && oldLen !== newLen) {
      if (key !== 'length') {
        trigger(target, TriggerOpTypes.SET, 'length')
      } else {
        for (let i = newLen; i < oldLen; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString())
        }
      }
    }
  }
  return result
}

function deleteProperty(target, key) {
  const hadkey = Reflect.has(target, key)
  const result = Reflect.deleteProperty(target, key)
  if (hadkey && result) {
    trigger(target, TriggerOpTypes.DELETE, key)
  }
  return result
}

function has(target, key) {
  track(target, key)
  return Reflect.has(target, key)
}

function ownKeys(target) {
  track(target, TrackOpTypes.ITERATE)
  return Reflect.ownKeys(target)
}

export const handlers = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty
}
