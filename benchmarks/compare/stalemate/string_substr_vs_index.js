const { simple, expand } = require("../helper/tools");

const string = expand(100).flatMap(() => 'falkdjflaksjdflkajsdlfkjalkdjflakjsdflkjasdlkfjalskdjflkja').join('')
// const set = new Set(range)

// NOTE: using integer deoptimizes caching capabilities of engines.
simple({
  'substr': () => {
    return string.substr(0, 1)
  },
  '[0]': () => {
    return string[0]
  },
  'sbustr(0, 3)': () => {
    return string.substr(0, 3)
  },
})

// results
// substr       x 775,897,936 ops/sec ±1.31% (88 runs sampled)
// [0]          x 803,343,782 ops/sec ±0.82% (82 runs sampled)
// sbustr(0, 3) x 821,499,326 ops/sec ±0.80% (88 runs sampled)
// Fastest is [0]
