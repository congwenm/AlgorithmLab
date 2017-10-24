const { simple } = require("./helper/tools");

simple({
  'Declaration#let': () => {
    let a,b,c,d,e,f,g;
    a = 'a';
    b = 'b';
    c = 'c';
    d = 'd';
    d = 'd';
    f = 'f';
    g = 'g';
  },
  'Declaration#var': () => {
    var a,b,c,d,e,f,g;
    a = 'a';
    b = 'b';
    c = 'c';
    d = 'd';
    d = 'd';
    f = 'f';
    g = 'g';
  },
})

// results:
//
// Declaration#let x 601,679,467 ops/sec ±0.98% (80 runs sampled)
// Declaration#var x 615,273,366 ops/sec ±0.83% (84 runs sampled)
// Fastest is Declaration#var