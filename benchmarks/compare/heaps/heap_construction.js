import Benchmark from 'benchmark'
import Heap from '../../../src/data_structures/heap'
import { sample } from '../../../src/util.js'
import EloquentJsHeap from '../../../src/data_structures/implementations/eloquent_js_heap'


var data = [10, 100, 1000, 10 * 1000, 100 * 1000].map(sample);

var handleComplete = function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
  console.log('---End---')
  console.log()
}

var handleCycle = function(event) {
  console.log('cycle report: ', String(event.target));
}

data.forEach(datum => {
  var suite = new Benchmark.Suite;
  suite.add('Regular Constructor size: ' + datum.length, function() {
    new Heap(datum)
  })
  .add('BubbleDown Constructor size: ' + datum.length, function() {
    Heap.BubbleDownConstructor(datum)
  })
  .add('Eloquent JS Implementation', function() {
    var heap = new EloquentJsHeap(v=>v)
    datum.forEach(n=>heap.push(n))
  })
  .on('cycle', handleCycle)
  .on('complete', handleComplete)
  .run({async: false}) // run size 10, reg vs bubbledown, size 100: reg vs bubble down, size 1000...
})


// cycle report:  Regular Constructor size: 10 x 388,860 ops/sec ±1.00% (88 runs sampled)
// cycle report:  BubbleDown Constructor size: 10 x 538,717 ops/sec ±1.39% (84 runs sampled)
// cycle report:  Eloquent JS Implementation x 704,446 ops/sec ±1.98% (87 runs sampled)
// Fastest is Eloquent JS Implementation
// ---End---
//
// cycle report:  Regular Constructor size: 100 x 38,829 ops/sec ±1.31% (86 runs sampled)
// cycle report:  BubbleDown Constructor size: 100 x 63,256 ops/sec ±5.60% (86 runs sampled)
// cycle report:  Eloquent JS Implementation x 69,925 ops/sec ±1.59% (87 runs sampled)
// Fastest is Eloquent JS Implementation
// ---End---
//
// cycle report:  Regular Constructor size: 1000 x 4,007 ops/sec ±1.54% (85 runs sampled)
// cycle report:  BubbleDown Constructor size: 1000 x 6,241 ops/sec ±2.63% (82 runs sampled)
// cycle report:  Eloquent JS Implementation x 6,796 ops/sec ±1.48% (88 runs sampled)
//
// Fastest is Eloquent JS Implementation
// ---End---
//
// cycle report:  Regular Constructor size: 10000 x 362 ops/sec ±6.23% (76 runs sampled)
// cycle report:  BubbleDown Constructor size: 10000 x 641 ops/sec ±2.48% (82 runs sampled)
// cycle report:  Eloquent JS Implementation x 611 ops/sec ±4.40% (80 runs sampled)
// Fastest is BubbleDown Constructor size: 10000
// ---End---
//
// cycle report:  Regular Constructor size: 100000 x 24.86 ops/sec ±3.85% (45 runs sampled)
// cycle report:  BubbleDown Constructor size: 100000 x 56.59 ops/sec ±4.28% (59 runs sampled)
// cycle report:  Eloquent JS Implementation x 37.22 ops/sec ±3.57% (49 runs sampled)
// Fastest is BubbleDown Constructor size: 100000
// ---End---
