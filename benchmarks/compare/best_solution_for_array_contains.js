const { simple } = require("./helper/tools");

const range = Object.keys([...Array(100)]).map(n => +n)
const array = range
const set = new Set(range)

simple({
  'Array#includes': () => {
    return array.includes(50)
  },
  'Array#indexof': () => {
    return array.indexOf(50) !== -1
  },
  'Set#has': () => {
    return set.has(50)
  },
})

// result
// Array#includes x 8,582,833 ops/sec ±0.86% (88 runs sampled)
// Array#indexof x 8,276,849 ops/sec ±3.31% (83 runs sampled)
// Set#has x 52,401,169 ops/sec ±1.62% (87 runs sampled)
// Fastest is Set#has