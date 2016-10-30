var suite = new Benchmark.Suite;

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
  debugger
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

Benchmark.options.maxtime = 1
suite.run({ async: true, initCount: 1, maxTime: 1 })
