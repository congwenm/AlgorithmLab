var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

suite.add('for loop build up', function() {
  var a = []
  for(let i = 0; i < 100; i++) {
    a.push(i)
  }
  return a;
})
.add('array join split without 1 - 100', function() {
  return Array(100)
    .join(',').split(',')
})
.add('array join split', function() {
  return Array(100)
    .join(',').split(',')
    .map((v, k) => k)
})

.add('es6 Array#from Array#keys()', function() {
  return Array.from(Array(10).keys())
})
.add('es6 spread Array#keys()', function() {
  return [...Array(10).keys()]
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

.run({ async: true })


// for loop build up                  x 2,138,372 ops/sec ±1.61% (78 runs sampled)
// array join split without 1 - 100   x 170,673 ops/sec ±2.43% (78 runs sampled)
// array join split                   x 38,418 ops/sec ±4.34% (78 runs sampled)
// es6 Array#from Array#keys()        x 556,699 ops/sec ±3.58% (74 runs sampled)
// es6 spread Array#keys()            x 437,154 ops/sec ±2.19% (81 runs sampled)
