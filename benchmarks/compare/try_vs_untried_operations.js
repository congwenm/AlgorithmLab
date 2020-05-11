const { simple } = require("./helper/tools");
const json = JSON.stringify({ a: { b: 1 }, c: 2, d: 3 });
const errorJson = json + ",";

simple({
  "try-catch": () => {
    try {
      return JSON.parse(json);
    } catch (error) {
      ("oh my god");
    }
  },
  "no-try-catch": () => {
    return JSON.parse(json);
  },

  "error-try-catch": () => {
    try {
      return JSON.parse(errorJson);
    } catch (error) {
      ("oh my god");
    }
  },
  "error-no-catch": () => {
    try {
      return JSON.parse(errorJson);
    } catch (error) {}
  },
});

// Result:
//
// try-catch          x 1,369,962 ops/sec ±1.09% (89 runs sampled)
// no-try-catch       x 1,403,743 ops/sec ±0.69% (89 runs sampled)
// error-try-catch    x 178,667 ops/sec   ±1.31% (87 runs sampled)
// error-no-try-catch x 180,643 ops/sec   ±0.85% (89 runs sampled)
// Fastest is no-try-catch
