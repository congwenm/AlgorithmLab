const { simple } = require("./helper/tools");

const object1 = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 }
const object2 = { h: 1, i: 2, j: 3, k: 4, l: 5, m: 6, n: 7 }

const mergeObjects = (objA, objB) => {
  const res = {}
  for (let i in objA) {
    res[i] = objA[i]
  }
  for (let i in objB) {
    res[i] = objB[i]
  }
  return res
}

simple({
  // Not support
  // 'Spread merge': () => {
  //   return { ...object1, ...object2 }
  // },

  'Assign': () => {
    return Object.assign({}, object1, object2)
  },

  'For loop': () => {
    return mergeObjects(object1, object2)
  },
})

// Assign     x 397,222 ops/sec ±1.28% (84 runs sampled)
// For loop x 1,681,591 ops/sec ±1.41% (83 runs sampled)
// Fastest is For loop