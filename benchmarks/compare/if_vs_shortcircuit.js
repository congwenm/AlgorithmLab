var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

suite.add('if block', function() {
  if (true) {
    return 1
  }
})
  .add('short circuit', function() {
    true && 1 
  })

// add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })

  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

suite.run({ async: true })

// if block x 91,947,843 ops/sec ±1.59% (88 runs sampled)
// short circuit x 91,050,265 ops/sec ±1.75% (84 runs sampled)
// Fastest is if block,short circuit
