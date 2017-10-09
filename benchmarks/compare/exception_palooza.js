const { simple } = require("./helper/tools");

simple({
  "handled": () => {
    try {
      [].toString();
      return [].asdf();
    }
    catch(e) {}
  },
  "no exception": () => {
    return [].toString()
  }
});

// result:
//
// handled        x 87,897 ops/sec      ±2.51% (79 runs sampled)
// no exception   x 54,236,873 ops/sec  ±4.00% (81 runs sampled)
// Fastest is no exception