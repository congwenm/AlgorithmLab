const { simple } = require('./tools')

simple({
  'return': function() {
    return 1 + 1;
  },
  'no return': function() {
    1 + 1; 
  },
  'no context return': () => 1 + 1,
})

// Stalemate
// return x 89,656,505 ops/sec ±1.74% (85 runs sampled)
// no return x 90,494,794 ops/sec ±1.57% (85 runs sampled)
// no context return x 88,708,449 ops/sec ±1.78% (82 runs sampled)
// Fastest is no return,return,no context return
