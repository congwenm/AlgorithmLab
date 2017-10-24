const { simple } = require("./helper/tools");

simple({
  'RegEx#test': () => {
    /o/.test('Hello World!')
  },
  'String#indexOf': () => {
    'Hello World!'.indexOf('o') > -1
  },
})
// results:
// RegEx#test x 9,157,513 ops/sec ±1.91% (85 runs sampled)
// String#indexOf x 606,214,967 ops/sec ±1.05% (87 runs sampled)
// Fastest is String#indexOf