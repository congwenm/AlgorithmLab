const { simple } = require("./helper/tools");

const a = {};

let count = 0;
let runningCount = 0;
const action = newCount => (count = newCount);

const proxyObject = new Proxy(
  {},
  {
    set: function(obj, prop, value) {
      action(value);
      obj[prop] = value;
      return true;
    }
  }
);

// define property setup
const definePropertyObject = { a: 1 };
Object.defineProperty({}, "prop1", {
  set(value) {
    action(value);
  }
});

simple({
  proxies: () => {
    proxyObject.prop1 = runningCount++;
  },
  defineProperty: () => {
    definePropertyObject.prop1 = runningCount++;
  }
});

// result: (node v11.13.0)

// proxies x 29,968,211 ops/sec ±0.61% (90 runs sampled)
// defineProperty x 186,989,636 ops/sec ±0.75% (91 runs sampled)
