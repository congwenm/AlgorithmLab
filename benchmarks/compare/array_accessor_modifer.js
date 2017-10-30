const { simple } = require("./helper/tools");

const original = [...Array(100).keys()];
let arr = [...original]
const reset = () => arr = [...original]

simple({
  "shift": function() {
    arr.shift()
    reset()
  },
  "pop": function() {
    arr.shift();
    reset()
  },
  "unshift": function() {
    arr.unshift(1)
    reset();
  },
  "push": function() {
    arr.push(1)
    reset();
  },
  "index accessor": function() {
    return arr[0]
  }
});

// Results:
// shift x 229,148 ops/sec ±2.55% (89 runs sampled)
// pop x 225,653 ops/sec ±3.55% (89 runs sampled)
// unshift x 229,416 ops/sec ±2.77% (90 runs sampled)
// push x 222,601 ops/sec ±3.41% (86 runs sampled)
// index x 75,489,168 ops/sec ±1.39% (85 runs sampled)
// Fastest is shift,unshift,pop,push


// simple({
//   'slice': () => arr.slice(),
//   'spread': () => [...arr]
// })

// Results:
// slice x 4,958,680 ops/sec ±3.13% (87 runs sampled)
// spread x 237,268 ops/sec ±2.61% (91 runs sampled)
// Fastest is slice