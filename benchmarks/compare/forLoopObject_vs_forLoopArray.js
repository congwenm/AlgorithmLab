const { simple } = require('./tools')

const obj = { a: 1, b: 2, c: 3 }
const arr = [1,2,3]

simple({
  'for-loop object': function() {
    for (let i in obj) {
      obj[i].nice;
    }
  },
  'for-loop array': function() {
  },
})

// magic_const x 1,955,540 ops/sec ±1.18% (87 runs sampled)

simple({
  'for-loop object': function() {
    const { CONST1, CONST2, CONST3 } = magic_const
  },
  'for-loop array': function() {
    const CONST1 = 'CONST1'
    const CONST2 = 'CONST2'
    const CONST3 = 'CONST3'
  },
})
