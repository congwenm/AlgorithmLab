var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

var arr = [...Array(10).keys()]

suite.add('One Check', function() {
  var len = arr.length
  for(var i; i < len; i++) i;
})
.add('N Check', function() {
  for(var i; i < arr.length; i++) i;
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

.run({ async: true })

// One Check  x 60,648,962 ops/sec ±1.29% (83 runs sampled)
// N Check    x 60,778,244 ops/sec ±1.62% (83 runs sampled)
// Optimized doesn't matter
