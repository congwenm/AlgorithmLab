const { simple } = require("../helper/tools");
const expand = n => Object.keys([...Array(n)]).map(n => +n);
const stringKeys = expand(1000);
const objectKeys = stringKeys.map(num => ({ value: num }));

simple({
  "string key": () => {
    const stringKeyMap = new Map();
    stringKeys.forEach(key => {
      stringKeyMap.set(key, key);
    });

    // return stringKeyMap;

    var result = stringKeys.map(key => stringKeyMap.get(key));

    return result;
  },
  "object key": () => {
    const objectKeyMap = new Map();
    objectKeys.forEach(key => {
      objectKeyMap.set(key, key);
    });
    // return objectKeyMap;

    var result = objectKeys.map(key => objectKeyMap.get(key));
    return result;
  }
});

// Result:
//
// string key x 17,657 ops/sec ±2.71% (85 runs sampled)
// object key x 19,278 ops/sec ±2.76% (82 runs sampled)
// Fastest is object key
