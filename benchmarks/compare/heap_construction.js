import Benchmark from 'benchmark'
import Heap from '../../src/data_structures/heap'
import { sample } from '../../src/util.js'


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
  .on('cycle', handleCycle)
  .on('complete', handleComplete)
  .run({async: false}) // run size 10, reg vs bubbledown, size 100: reg vs bubble down, size 1000...
})
// 10, 100, 1000, 10,000, 100,000
// cycle report:  Regular Constructor size: 10 x 348,931 ops/sec ±1.49% (83 runs sampled)
// cycle report:  BubbleDown Constructor size: 10 x 532,113 ops/sec ±1.04% (87 runs sampled)
// Fastest is BubbleDown Constructor size: 10
// ---End---
//
// cycle report:  Regular Constructor size: 100 x 35,895 ops/sec ±1.49% (84 runs sampled)
// cycle report:  BubbleDown Constructor size: 100 x 61,231 ops/sec ±2.55% (87 runs sampled)
// Fastest is BubbleDown Constructor size: 100
// ---End---
//
// cycle report:  Regular Constructor size: 1000 x 3,608 ops/sec ±1.24% (88 runs sampled)
// cycle report:  BubbleDown Constructor size: 1000 x 6,166 ops/sec ±4.29% (85 runs sampled)
// Fastest is BubbleDown Constructor size: 1000
// ---End---
//
//
// cycle report:  Regular Constructor size: 10000 x 358 ops/sec ±1.34% (82 runs sampled)
// cycle report:  BubbleDown Constructor size: 10000 x 640 ops/sec ±2.28% (82 runs sampled)
// Fastest is BubbleDown Constructor size: 10000
// ---End---
//
// cycle report:  Regular Constructor size: 100000 x 24.97 ops/sec ±1.94% (45 runs sampled)
// cycle report:  BubbleDown Constructor size: 100000 x 55.82 ops/sec ±4.56% (58 runs sampled)
// Fastest is BubbleDown Constructor size: 100000
// ---End---
