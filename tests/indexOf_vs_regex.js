var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;
var fs = require('fs');

debugger;
suite.add('RegEx#test', function() {
  /o/.test('Hello World!')
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  debugger;
  fs.writeFile('./result-stats', this.stats, (err) => console.log('err', err))
  fs.writeFile('./result-hz', this.hz, (err) => console.log('err', err))
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

suite.run({ async: true, initCount: 1, maxTime: 1 })
debugger;
