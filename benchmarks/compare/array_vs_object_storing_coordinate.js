const { simple } = require("./helper/tools");

var matrix = [
  [1,2,3], [4,5,6], [7,8,9]
]

var arrayAccessor = ([x, y]) => matrix[x][y]
var objectAccessor = ({x, y}) => matrix[x][y]
var signatureAccessor = (x, y) => matrix[x][y]

simple({
  'passing in array': () => {
    arrayAccessor([1, 2]) === 6
  },
  'passing in object': () => {
    objectAccessor({ x: 1, y: 2 }) === 6
  },
  'passing in large signature': () => {
    signatureAccessor(1, 2) === 6
  },
})

// Summary: array is slow!!!
// 1. array x
//    73,415,163 ops/sec ±1.57% (82 runs sampled)
// 2. object x
//    569,065,963 ops/sec ±1.03% (88 runs sampled)
// 3. signature x
//    603,267,035 ops/sec ±0.86% (87 runs sampled)
// Fastest is passing in large signature
