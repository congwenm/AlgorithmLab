const { simple } = require("./helper/tools");
const number = "12345";

simple({
  'double tilde': () => {
    return ~~number
  },
  'Number': () => {
    return Number(number)
  },
  '+': () => {
    return +(number)
  },
})

// result:
//
// double tilde x 634,355,149 ops/sec ±0.89% (88 runs sampled)
// Number x 598,005,488 ops/sec ±1.14% (85 runs sampled)
// + x 577,437,350 ops/sec ±1.16% (82 runs sampled)
// Fastest is double tilde