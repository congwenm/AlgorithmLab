const { simple } = require("../helper/tools");

var arr = [...Array(10).keys()]

simple({
  'One Check': () => {
    var len = arr.length
    for(var i; i < len; i++) i;
  },
  'N Check': () => {
    for(var i; i < arr.length; i++) i;
  },
})

// results:
//
// One Check x 609,241,997 ops/sec ±1.05% (87 runs sampled)
// N Check x 618,021,574 ops/sec ±0.97% (82 runs sampled)
// Fastest is N Check