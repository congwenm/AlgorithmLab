const { simple } = require("./helper/tools");

const superString = Object.keys([...Array(100)]).map(n => n).join(',')
// const set = new Set(range)

// NOTE: using integer deoptimizes caching capabilities of engines.
simple({
  'String#includes': () => {
    return superString.includes(99)
  },
  'String#indexof': () => {
    return superString.indexOf(99) !== -1
  },
})

// result
// Array#includes x 8,582,833 ops/sec ±0.86% (88 runs sampled)
// Array#indexof x 8,276,849 ops/sec ±3.31% (83 runs sampled)
// Set#has x 52,401,169 ops/sec ±1.62% (87 runs sampled)
// Fastest is Set#has
