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


// cycle report:  My Heap Sort: 10 x 213,645 ops/sec ±1.03% (85 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 1,760,807 ops/sec ±1.78% (85 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 100 x 12,943 ops/sec ±2.76% (81 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 109,979 ops/sec ±1.97% (85 runs sampled)
//
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 1000 x 970 ops/sec ±2.30% (85 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 6,783 ops/sec ±1.74% (87 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 10000 x 71.72 ops/sec ±3.41% (62 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 532 ops/sec ±1.43% (82 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
//
// cycle report:  My Heap Sort: 100000 x 5.08 ops/sec ±3.08% (17 runs sampled)
// cycle report:  Eloquent JS Implementation Heap Sort x 43.13 ops/sec ±2.20% (56 runs sampled)
// Fastest is Eloquent JS Implementation Heap Sort
// ---End---
