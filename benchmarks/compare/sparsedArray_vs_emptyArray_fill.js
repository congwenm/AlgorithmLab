
const { simple } = require('./helper/tools')

const NUMBER = 1000
simple({
  sparsed: () => {
    var arr = [];
    for (var i = 0; i < NUMBER; i++) {
      arr.push(i)
    }
    return arr
  },
  empty: () => {
    var arr = new Array(NUMBER);
    for (var i = 0; i < NUMBER; i++) {
      arr[i] = i
    }
  }
})

// Results invalid according to Peter's experiments in v8
// sparsed x 242, 842 ops / sec ±0.98 % (85 runs sampled)
// empty x 668, 075 ops / sec ±0.86 % (85 runs sampled)