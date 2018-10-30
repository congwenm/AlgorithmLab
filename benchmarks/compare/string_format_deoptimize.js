const { simple } = require("./helper/tools");
const arr = [...Array(100).keys()];

String.prototype.format = function() {
  var pattern = /\{\d+\}/g;
  var args = arguments;
  return this.replace(pattern, function(capture) {
    return args[capture.match(/\d+/)];
  });
};

simple({
  standard: () => {
    return arr.map(n => "a-" + n + "-b");
  },
  "cast to string": () => {
    return arr.map(n => new String("a-" + n + "-b"));
  },
  template: () => {
    return arr.map(n => `a-${n}-b`);
  },
  "#format string": () => {
    return arr.map(n => "a-{0}-b".format(n));
  },

  "10 var template": () => {
    return arr.map(n => `${n}-${n}-${n}-${n}-${n}-${n}-${n}-${n}-${n}-${n}`);
  },
  "10 var #format": () => {
    return arr.map(n => "{0}-{0}-{0}-{0}-{0}-{0}-{0}-{0}-{0}-{0}".format(n));
  }
});

// Results
// format is 40x slower

// standard x 413,221 ops/sec ±0.95% (92 runs sampled)
// cast to string x 208,202 ops/sec ±1.54% (91 runs sampled)
// template x 432,874 ops/sec ±0.57% (92 runs sampled)
// #format string x 10,788 ops/sec ±0.87% (89 runs sampled)

// 10 var template x 79,109 ops/sec ±1.00% (91 runs sampled)
// 10 var #format x 2,128 ops/sec ±0.94% (87 runs sampled)
