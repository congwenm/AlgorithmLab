const { simple } = require('./helper/tools')

const arr = [...Array(100).keys()]
simple({
  'forEach': () => {
    var tmp = []
    arr.forEach(n => tmp.push(n + 1))
    return tmp
  },
  'map': () => {
    return arr.map(n => n + 1)
  },
  'for loop': () => {
    var tmp = []
    for (let i = 0, len = arr.length; i < arr.length; i++) {
      tmp.push(arr[i] + 1)
    }
    return tmp
  },
  'do while': () => {
    let i = 0, tmp = []
    while (i < arr.length) {
      tmp.push(arr[i++] + 1)
    }
    return tmp
  }
})


// forEach x 539,331 ops/sec ±2.74% (90 runs sampled)
// map x 466,971 ops/sec ±2.27% (91 runs sampled)
// for loop x 2,131,972 ops/sec ±5.17% (83 runs sampled)
// do while x 2,236,282 ops/sec ±3.32% (85 runs sampled)
// Fastest is do while