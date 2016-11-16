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

// Eloquent implementation of my heap sort
// cycle report:  My Heap Sort: 10 x 332,481 ops/sec ±1.25% (87 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 1,672,887 ops/sec ±1.42% (85 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 100 x 30,895 ops/sec ±2.93% (79 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 103,485 ops/sec ±1.85% (88 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
//
// ---End---
//
// cycle report:  My Heap Sort: 1000 x 2,780 ops/sec ±1.41% (87 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 6,556 ops/sec ±1.67% (85 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 10000 x 253 ops/sec ±1.48% (82 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 541 ops/sec ±1.56% (85 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 100000 x 17.44 ops/sec ±2.62% (46 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 43.01 ops/sec ±1.60% (55 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
