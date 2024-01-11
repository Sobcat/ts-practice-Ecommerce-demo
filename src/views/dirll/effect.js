import { TrackOpTypes, TriggerOpTypes } from './operations.js'

let shoudTrack = true
let activeEffect = undefined

const targetMap = new WeakMap()

export function pauseTracking() {
  shoudTrack = false
}

export function resumeTracking() {
  shoudTrack = true
}

// 为依赖函数创建同一的环境，保证前后触发的运行函数一致
export function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn
      // 每次依赖时，清空上一次依赖函数
      cleanup()
      return fn()
    } finally {
      activeEffect = null
    }
  }
  effectFn.deps = []
  effectFn()
}
function cleanup(effectFn) {
  const { deps } = effectFn
  if (!deps.length) {
    return
  }
  for (const dep of deps) {
    dep.delete(effectFn)
  }
  deps.length = 0
}

// 依赖收集
export function track(target, type, key) {
  if (!shoudTrack || !activeEffect) {
    return
  }
  console.log(activeEffect)
  // propMap
  let propMap = targetMap.get(target)
  if (!propMap) {
    propMap = new Map()
    targetMap.set(target, propMap)
  }

  if (type === TrackOpTypes.ITERATE) {
    key = 'ITERATE_KEY'
  }
  // typeMap
  let typeMap = propMap.get(key)
  if (!typeMap) {
    typeMap = new Map()
    propMap.set(key, typeMap)
  }

  // depSet
  let depSet = typeMap.get(type)
  if (!depSet) {
    depSet = new Set()
    typeMap.set(type, depSet)
  }

  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect)
    activeEffect.deps.push(depSet)
  }

  console.log(`依赖收集`, targetMap)
}
// 派发更新
export function trigger(target, type, key) {
  const effectFns = getEffectFns(target, type, key)
  for (const effectFn of effectFns) {
    console.log(`派发更新`, key, target[key], type)
    effectFn()
  }
}

function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target)
  if (!propMap) {
    return
  }

  const keys = [key]
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push('ITERATE_KEY')
  }
  const effectFns = new Set()
  const triggerTypeMap = {
    [TriggerOpTypes.SET]: [TrackOpTypes.GET],
    [TriggerOpTypes.ADD]: [TrackOpTypes.GET, TrackOpTypes.HAS, TrackOpTypes.ITERATE],
    [TriggerOpTypes.DELETE]: [TrackOpTypes.GET, TrackOpTypes.HAS, TrackOpTypes.ITERATE]
  }
  for (const key of keys) {
    const typeMap = propMap.get(key)
    if (!typeMap) {
      continue
    }
    const trackTypes = triggerTypeMap[type]
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType)
      if (!dep) {
        continue
      }
      for (const effectFn of dep) {
        effectFns.add(effectFn)
      }
    }
  }
  return effectFns
}
