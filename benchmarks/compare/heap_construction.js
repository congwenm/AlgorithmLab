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