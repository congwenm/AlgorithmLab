const { simple } = require("../helper/tools");

class Car {}
const car = new Car
class Volks {
  constructor() {
    this.manufacturer = "volks"
  }
}
const volks = new Volks
const string = "abcdefg"
simple({
  emptyObject: () => car === car,
  object: () => volks === volks,
  string: () => string === string
})

// emptyObject x 835,903,414 ops/sec ±0.93% (88 runs sampled)
// object x 838,759,834 ops/sec ±0.57% (92 runs sampled)
// string x 837,696,666 ops/sec ±0.67% (90 runs sampled)
// Fastest is object,string,emptyObject