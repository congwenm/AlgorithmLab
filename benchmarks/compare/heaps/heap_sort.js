import Benchmark from 'benchmark'
import heap_sort, { eloquent_heap_sort } from '../../../src/sorting/heap_sort'
import { sample } from '../../../src/util.js'


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
  suite.add('My Heap Sort: ' + datum.length, function() {
    heap_sort(datum)
  })
  .add('Eloquent JS Implementation Heap Sort', function() {
    eloquent_heap_sort(datum)
  })
  .on('cycle', handleCycle)
  .on('complete', handleComplete)
  .run({async: false}) // run size 10, reg vs bubbledown, size 100: reg vs bubble down, size 1000...
})


// cycle report:  My Heap Sort: 10                      x 155,794 ops/sec ±1.03% (86 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort  x 1,897,383 ops/sec ±1.01% (89 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 100                     x 9,802 ops/sec ±2.81% (87 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort  x 102,908 ops/sec ±1.92% (83 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
//
// cycle report:  My Heap Sort: 1000                    x 506 ops/sec ±3.46% (76 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort  x 6,746 ops/sec ±1.86% (87 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 10000                   x 10.20 ops/sec ±12.61% (29 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort  x 519 ops/sec ±2.73% (82 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 100000                  x 0.06 ops/sec ±3.70% (5 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort  x 42.78 ops/sec ±2.10% (55 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
