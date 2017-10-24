const { simple } = require("./helper/tools");

const expand = n => Object.keys([...Array(n)]).map(n=>+n)
var obj = { a: 1 }

var largeObj = expand(1000).reduce((obj, key) => {
  obj[key] = key
  return obj
}, {})

var takeObject = (obj) => obj.a
var takeValue = a => a

simple({
  'passing in object': () => {
    takeObject(obj)
  },
  'passing in minimum required attr': () => {
    takeValue(obj.a)
  },
  'passing in redundant': () => {
    takeValue(obj.a, 1, 2, 3, 4, 5)
  },
  'passing in large object': () => {
    takeObject(largeObj)
  },
})

// result:
//
// passing in object x 623,994,058 ops/sec ±1.01% (80 runs sampled)
// passing in minimum required attr x 628,838,350 ops/sec ±1.39% (87 runs sampled)
// passing in redundant x 611,647,232 ops/sec ±0.92% (88 runs sampled)
// passing in large object x 603,330,198 ops/sec ±0.84% (87 runs sampled)
// Fastest is passing in minimum required attr,passing in object