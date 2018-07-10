const { simple } = require("./helper/tools");


simple({
  '1M objects, same structure': () => {
    const arr = []
    for (let i = 0; i++; i < 1000*1000) {
      let obj = {}
      obj['value'] =i
      arr.push(obj)
    }
    return arr;
  },
  '1M objects, 1M different structure': () => {
    const arr = []
    for (let i = 0; i++; i < 1000*1000) {
      let obj = {};
      obj['value'+i] =i
      arr.push(obj)
    }
    return arr;
  }
})
// results:
// 1M objects, same structure x 815,403,489 ops/sec ±0.99% (85 runs sampled)
// 1M objects, 1M different structure x 828,629,766 ops/sec ±0.81% (86 runs sampled)
// Fastest is 1M objects, 1M different structure
