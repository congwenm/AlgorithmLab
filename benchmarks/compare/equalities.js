const { simple } = require("./helper/tools");

const str = '1'
const int = 1
const str2 = '1'

const object = { valueOf: () => '1' }

simple({
  'string == int': () => {
    return str == int 
  },
  'string === string': () => {
    return str === str2
  },
  'object == int': () => {
    return object == int
  }
})

// results:
//
// string == int x 154,167,551 ops/sec ±1.02% (89 runs sampled)
// string === string x 898,800,160 ops/sec ±0.87% (88 runs sampled)
// object == int x 31,159,839 ops/sec ±0.80% (88 runs sampled)
// Fastest is string === string

