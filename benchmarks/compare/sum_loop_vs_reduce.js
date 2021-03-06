const { simple } = require('./helper/tools')

const expand = n => Object.keys([...Array(n)]).map(n=>+n)
const range = expand(100)

simple({
  'using for loop': function() {
    var sum = 0
    for (let i of range) {
      sum += i
    }
    return sum
  },
  'using reduce': function() {
    return range.reduce((sum, i) => sum + 1, 0)
  },
  'cycle': function(event) {
    console.log(String(event.target));
  },
  'complete': function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  }
})

// result:
//
// using for loop x 527,849 ops/sec ±1.31% (86 runs sampled)
// using reduce x 560,575 ops/sec ±1.55% (82 runs sampled)
// Fastest is using reduce
