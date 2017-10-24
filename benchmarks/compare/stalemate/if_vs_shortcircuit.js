const { simple } = require("../helper/tools");
var str = 'str'
simple({
  'if block': () => {
    if (str) {
      return 'done'
    }
  },
  'if else block': () => {
    if (str) {
      return 'done'
    }
    else {
      return;
    }
  },
  'short circuit': () => {
    return str && 'done'
  },
})

// results:
//
// if block x 607,762,087 ops/sec ±0.98% (83 runs sampled)
// if else block x 625,818,752 ops/sec ±0.91% (88 runs sampled)
// short circuit x 623,653,442 ops/sec ±0.81% (86 runs sampled)
// Fastest is if else block,short circuit