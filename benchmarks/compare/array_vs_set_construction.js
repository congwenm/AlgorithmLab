const { simple } = require("./helper/tools");

const expand = n => Object.keys([...Array(n)]).map(n=>+n)
const range = expand(100)
const range10by10 = expand(10).reduce(arr => arr.concat(expand(10)), [])

simple({
  'Array contruction of 100 numbers': () => {
    return [...range]
  },
  'Set contruction of 100 numbers': () => {
    return new Set(range)
  },

  'Array construction of 10 x 10 nubmers': () => {
    return [...range10by10]
  },
  'Set construction of 10 x 10 nubmers': () => {
    return new Set(range10by10)
  },
})

// result
// Array contruction of 100 numbers x 243,820 ops/sec ±1.40% (85 runs sampled)
// Set contruction of 100 numbers x 157,268 ops/sec ±1.62% (86 runs sampled)
// Array construction of 10 x 10 nubmers x 240,652 ops/sec ±0.84% (88 runs sampled)
// Set construction of 10 x 10 nubmers x 294,021 ops/sec ±3.43% (84 runs sampled)
// Fastest is Set construction of 10 x 10 nubmers