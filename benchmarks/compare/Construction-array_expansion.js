const { simple } = require("./helper/tools");

simple({
  'for loop build up': () => {
    var a = []
    for(let i = 0; i < 100; i++) {
      a.push(i)
    }
    return a;
  },
  'array join split without 1 - 100': () => {
    return Array(100).join(',').split(',')
  },
  'array join split': () => {
    return Array(100)
      .join(',').split(',')
      .map((v, k) => k)
  },

  'es6 Array#from Array#keys()': () => {
    return Array.from(Array(10).keys())
  },

  'es6 spread Array#keys()': () => {
    return [...Array(10).keys()]
  },

  'es6 spread Object.keys([...Array(10)])': () => {
    return Object.keys([...Array(10)])
  }
})

// results
// for loop build up x
//    2,529,037 ops/sec ±0.66% (89 runs sampled)
// array join split without 1 - 100 x
//    234,051 ops/sec ±1.57% (90 runs sampled)
// array join split x
//    154,811 ops/sec ±1.72% (87 runs sampled)
// es6 Array#from Array#keys() x
//    756,776 ops/sec ±1.10% (82 runs sampled)
// es6 spread Array#keys() x
//    1,908,668 ops/sec ±1.91% (85 runs sampled)
// Fastest is for loop build up