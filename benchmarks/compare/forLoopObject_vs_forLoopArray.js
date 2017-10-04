const { simple } = require('./helper/tools')

const obj = { a: 1, b: 2, c: 3 }
const arr = [1,2,3]

simple({
  'for-loop object': function() {
    for (let i in obj) {
      obj[i].nice;
    }
  },
  'for-loop array': function() {
    for (let i in arr) {
      arr[i].nice;
    }
  },
  'forEach loop array': function() {
    arr.forEach(n => n.nice)
  }
})


// for-loop object x 14,208,359 ops/sec ±2.94% (87 runs sampled)
// for-loop array x 3,191,885 ops/sec ±3.78% (89 runs sampled)
// forEach loop array x 8,166,413 ops/sec ±3.43% (84 runs sampled)
// Fastest is for-loop object