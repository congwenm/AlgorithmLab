var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

suite.add('Declaration#let', function() {
  let a,b,c,d,e,f,g;
  a = 'a';
  b = 'b';
  c = 'c';
  d = 'd';
  d = 'd';
  f = 'f';
  g = 'g';
})
.add('Declaration#var', function() {
  var a,b,c,d,e,f,g;
  a = 'a';
  b = 'b';
  c = 'c';
  d = 'd';
  d = 'd';
  f = 'f';
  g = 'g';
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

.run({ async: true })