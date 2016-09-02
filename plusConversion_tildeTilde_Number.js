var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;
const number = '12345';

suite.add('tilde~tilde', function() {
  ~~number
})
.add('Number', function() {
  Number(number)
})
.add('+', function() {
  +(number)
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

.run({ async: true })