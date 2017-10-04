const { simple } = require('./helper/tools')

const magic_const = new Proxy({}, {
  get: (target, name) => name
})

simple({
  'magic_const': function() {
    const { CONST1, CONST2, CONST3 } = magic_const
  },
  'regular const': function() {
    const CONST1 = 'CONST1'
    const CONST2 = 'CONST2'
    const CONST3 = 'CONST3'
  },
  'destructure const': function() {
    const { CONST1, CONST2, CONST3 } = {
      CONST1:'CONST1',
      CONST2:'CONST2',
      CONST3:'CONST3',
    }
  }
})

// magic_const x 1,955,540 ops/sec ±1.18% (87 runs sampled)
// regular const x 88,857,358 ops/sec ±1.94% (81 runs sampled)
// destructure const x 65,601,179 ops/sec ±1.27% (86 runs sampled)
// Fastest is regular const
