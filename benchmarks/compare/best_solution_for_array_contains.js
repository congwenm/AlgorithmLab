var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

const range = Object.keys([...Array(100)]).map(n => +n)
const array = range
const set = new Set(range)

suite.add('Array#includes', function() {
    return array.includes(50)
  })
  .add('Array#indexof', function() {
    return array.indexOf(50) !== -1
  })
  .add('Set#has', function() {
    return set.has(50)
  })

  .on('cycle', function(event) {
    console.log(String(event.target));
  })

  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

  .run({ async: true })


// result
// Fastest is
// Array#includes x 9,605,261 ops/sec ±0.96% (86 runs sampled)
// Array#indexof x 10,803,403 ops/sec ±0.95% (87 runs sampled)
// Set#has x 38,795,320 ops/sec ±1.29% (86 runs sampled)
