var Benchmark = require('benchmark')
var suite  = new Benchmark.Suite

const expand = n => Object.keys([...Array(n)]).map(n=>+n)
var obj = { a: 1 }

var largeObj = expand(1000).reduce((obj, key) => {
  obj[key] = key
  return obj
}, {})

var takeObject = (obj) => obj.a
var takeValue = a => a

suite
  .add('passing in object', function() {
    takeObject(obj)
  })
  .add('passing in minimum required attr', function() {
    takeValue(obj.a)
  })
  .add('passing in large object', function() {
    takeObject(largeObj)
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

  .run({ async: true })

// result:
//
// passing in object x 91,832,740 ops/sec ±1.36% (88 runs sampled)
// passing in minimum required attr x 91,325,570 ops/sec ±1.43% (86 runs sampled)
// passing in large object x 88,782,491 ops/sec ±1.65% (83 runs sampled)
// Fastest is passing in object,passing in minimum required attr

