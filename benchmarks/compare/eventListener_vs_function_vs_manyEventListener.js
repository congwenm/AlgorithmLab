const { simple } = require("./helper/tools");
var Events = require('events');
const { EventEmitter } = Events;
var expand = n => [...Array(n).keys()]

const times1000 = expand(1000)
const times1000do = fn => times1000.forEach(fn)

const xsimple = () => {}


console.log(`you are in: ${__filename}`);





simple({
  'emitter': () => {
    let emitterCount = 0
    const emitter = new EventEmitter(); // synchronous
    emitter.on('event', () => {
      emitterCount += 1;
    });

    times1000do(
      () => emitter.emit('event')
    )
  },
  'N x emitter': () => {
    let NxEmitter = new EventEmitter;
    // otherwise we get error MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 1000 event listeners added. Use emitter.setMaxListeners() to increase limit
    NxEmitter.setMaxListeners(1100)
    let NxEmitterCount = 0
    expand(1000).forEach(() => NxEmitter.on('event', () => NxEmitterCount += 1))
    NxEmitter.emit('event')
  },
  'vanilla function': () => {
    let vanillaCount = 0
    times1000do(
      () => vanillaCount + 1
    )
  },
})


// Results:
// emitter            x 18,115 ops/sec    ±1.44% (83 runs sampled)
// N x emitter        x 7,087 ops/sec     ±1.29% (85 runs sampled)
// vanilla function   x 86,875 ops/sec    ±0.87% (86 runs sampled)
// Fastest is vanilla function
