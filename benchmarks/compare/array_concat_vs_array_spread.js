const { simple } = require("./helper/tools");

const expand = n => [...Array(n).keys()]
const original = expand(1000 * 1000)

simple({
  "spread...": () => [...original],
  "concat": () => [].concat(original),
  'slice': () => original.slice(),
});

// spread... x 49.30 ops/sec ±0.65% (64 runs sampled)
// concat    x 196 ops/sec   ±0.99% (82 runs sampled)
// slice     x 193 ops/sec   ±0.62% (81 runs sampled)
// Fastest is concat
