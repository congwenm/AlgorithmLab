var Benchmark = require('benchmark')
var suite  = new Benchmark.Suite

const expand = n => Object.keys([...Array(n)]).map(n=>+n)
const range = expand(100)
const range10by10 = expand(10).reduce(arr => arr.concat(expand(10)), [])

suite
  .add('Array contruction of 100 different numbers', function() {
    return [...range]
  })
  .add('Set contruction of 100 different numbers', function() {
    return new Set(range)
  })

  .add('Array construction of 10 x 10 nubmers', function() {
    return [...range10by10]
  })
  .add('Set construction of 10 x 10 nubmers', function() {
    return new Set(range10by10)
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

  .run({ async: true })

// result
// Array contruction of 100 different numbers x 176,813 ops/sec ±1.16% (88 runs sampled)
// Set contruction of 100 different numbers x 133,867 ops/sec ±1.70% (86 runs sampled)
// Array construction of 10 x 10 nubmers x 167,107 ops/sec ±1.41% (83 runs sampled)
// Set construction of 10 x 10 nubmers x 230,408 ops/sec ±1.25% (87 runs sampled)
// Fastest is Set construction of 10 x 10 nubmers
