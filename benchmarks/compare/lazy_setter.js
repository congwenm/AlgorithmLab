var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

var tmp = null
suite.add('if unset', function() {
  if(!tmp) tmp = { msg: 'tmp has been set' }
})
  .add('||=', function() {
    tmp = tmp || { msg: 'tmp has been set' }
  })

// add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })

  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

suite.run({ async: true, initCount: 1, maxTime: 1 })

// 'if unset' x 85,215,194 ops/sec ±1.73% (83 runs sampled)
// '||=' x 63,184,837 ops/sec ±10.22% (70 runs sampled)
// Fastest is if unset

