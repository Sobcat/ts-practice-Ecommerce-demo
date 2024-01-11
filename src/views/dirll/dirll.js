import { effect } from './effect.js'
import { reactive } from './reactive.js'

// const o = {}
const obj = {
  a: 1,
  b: 2
}

const state = reactive(obj)

// state[5] = 3 // 默认不会触发 proxy length：get/set，因为内部方法隐式利用 defineProperty 修改了 length 长度

/* function fn() {
  // 如果数组里面元素是一个对象的话
  // 此时打印为 fasle，因为 state 数组里面的 o 元素已经也是代理对象了，与原始对象 o 不是同一个，所以 state.includes 方法返回 fasle
  console.log(state[1])
  console.log(state.includes(o))
  // state[4] = 4
}
fn() */

function fn() {
  console.log(state.a)
}

effect(fn)
state.a = 3
