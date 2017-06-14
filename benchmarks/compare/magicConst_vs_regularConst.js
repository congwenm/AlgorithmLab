var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

const magic_const = new Proxy({}, { 
  get: (target, name) => name 
})

suite.add('magic_const', function() {
  const { CONST1, CONST2, CONST3 } = magic_const
})
  .add('regular const', function() {
    const CONST1 = 'CONST1'
    const CONST2 = 'CONST2'
    const CONST3 = 'CONST3'
  })
  .add('destructure const', function() {
    const { CONST1, CONST2, CONST3 } = {
      CONST1:'CONST1',
      CONST2:'CONST2',
      CONST3:'CONST3',
    }
  })

// add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })

  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

suite.run({ async: true, initCount: 1, maxTime: 1 })

// magic_const x 1,955,540 ops/sec ±1.18% (87 runs sampled)
// regular const x 88,857,358 ops/sec ±1.94% (81 runs sampled)
// destructure const x 65,601,179 ops/sec ±1.27% (86 runs sampled)
// Fastest is regular const
