const { simple } = require("./helper/tools");
const expand = n => [...Array(n).keys()]
const original = expand(100 * 1000);
let shift_arr = [...original]
let pop_arr = [...original]
let unshift_arr = []
let push_arr = []

/**
 * Test 1: Shfit vs Pop vs Index Accessor
 */

// simple({
//   "shift": function() {
//     const value = shift_arr.map(() => shift_arr.shift())
//     shift_arr = [...original]
//     return value;
//   },
//   "pop": function() {
//     const value = pop_arr.map((v, index) => pop_arr.pop())
//     shift_arr = [...original]
//     return value;
//   },
//   "index accessor": function() {
//     const value = original.map((v, index) => original[index]);
//     return value
//   }
// });

// shift            x 1.10 ops/sec      ±8.00% (7 runs sampled)
// pop              x 712 ops/sec       ±1.17% (83 runs sampled)
// index accessor   x 92.38 ops/sec     ±0.40% (76 runs sampled)
// Fastest is pop


/**
 * Test 2: Unshift vs Push
 */

simple({
  "unshift": function() {
    expand(10 * 1000).forEach(value =>
      unshift_arr.unshift(value)
    )
    unshift_arr = []
  },
  "push": function() {
    expand(10 * 1000).forEach(value =>
      push_arr.push(value)
    )
    push_arr = []
  },
})


// unshift x 172 ops/sec   ±1.08% (76 runs sampled)
// push    x 8,179 ops/sec ±7.31% (87 runs sampled)
// Fastest is push
