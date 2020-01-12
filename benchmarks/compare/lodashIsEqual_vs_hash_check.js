const _ = require('lodash');
const { simple } = require("./helper/tools");

function hashCode(s) {
  for(var i = 0, h = 0; i < s.length; i++)
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}

const randomNumber = num => Math.ceil(Math.random() * num)

const object = [...Array(10).keys()].reduce(
  (accu, num) => {
    accu[num] = num;
    return accu;
  },
  {}
);
const object2 = {...object};

simple({
  'lodash isEqual': () => {
    if (_.isEqual(object, object2)) {
      return true;
    } else {
      console.error('Doesnt match')
    }
  },

  'hashing': () => {
    if (JSON.stringify(object) === JSON.stringify(object2)) {
      return true;
    } else {
      console.error('Doesnt match')
    }
  }
})

// result:
//  lodash isEqual x 727,618 ops/sec ±0.61% (92 runs sampled)
//  hashing x 464,146 ops/sec ±0.93% (91 runs sampled)
//  Fastest is lodash isEqual
