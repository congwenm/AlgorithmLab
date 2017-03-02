var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

var matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

var arrayAccessor = ([x, y]) => matrix[x][y]
var objectAccessor = ({x, y}) => matrix[x][y]
var signatureAccessor = (x, y) => matrix[x][y]
suite.add('passing in array', () => {
  arrayAccessor([1, 2]) === 6
})
.add('passing in object', () => {
  objectAccessor({ x: 1, y: 2 }) === 6
})
.add('passing in large signature', () => {
  signatureAccessor(1, 2) === 6
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

.run({ async: true })

// Summary: array is slow!!!
// passing in array x 7,995,622 ops/sec ±1.39% (87 runs sampled)
// passing in object x 61,069,917 ops/sec ±1.63% (88 runs sampled)
// passing in large signature x 75,377,709 ops/sec ±1.90% (84 runs sampled)
