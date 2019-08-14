const { simple } = require("./helper/tools");
const expand = n => Object.keys([...Array(n)]).map(n => +n);
const stringKeys = expand(100000000);

var preMadeMap = new Map();
stringKeys.map(key => preMadeMap.set(key, key));

const preMadeObject = {};
stringKeys.map(key => {
  preMadeObject[key] = key;
});

simple({
  "map set": () => {
    var map = new Map();
    stringKeys.map(key => map.set(key, key));
    return map;
  },

  "map access": () => {
    return stringKeys.map(key => preMadeMap.get(key));
  },
  "object set": () => {
    const object = {};
    stringKeys.map(key => {
      object[key] = key;
    });

    return object;
  },
  "object access": () => {
    return stringKeys.map(key => preMadeObject[key]);
  }
});

// Result:
//
// string key x 17,657 ops/sec ±2.71% (85 runs sampled)
// object key x 19,278 ops/sec ±2.76% (82 runs sampled)
// Fastest is object key
