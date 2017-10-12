const { simple } = require('./helper/tools')

let assignee
simple({
  'if assign': function() {
    if (!assignee) assignee = 1
  },
  'or assign': function() {
    assignee = assignee || 1
  },
}, {
  teardown: () => {
    assignee = undefined;
  }
})

// if assign x 245,793,465 ops/sec ±0.82% (88 runs sampled)
// or assign x 161,681,725 ops/sec ±1.51% (87 runs sampled)
// Fastest is if assign