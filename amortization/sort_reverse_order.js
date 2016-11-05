// argv[0] is /usr/local/bin/node
// argv[1] is __filename
import Benchmark, { Suite } from 'benchmark'
import util from '../util.js'
const { reverse_order } = util;
var filenames = process.argv.slice(2);
// import fn from `./algorithms/${filenames}`; // doesn't work today, may never work

var benchmarkOption = {
  onComplete: function() {
    console.log(`${this.name}: ${this.hz} per sec`)
  },
  // async: true
};


(filenames.length ? filenames : [
  'merge_sort',
  'quick_sort',
  'selection_sort',
  'insertion_sort',
  // 'bubble_sort', // too slow
  'shell_sort',
  'plain_sort'
]).map(function(method_name) {
  var method = require(`../algorithms/${method_name}.js`).default

  var sortSuite = new Suite(`sortSuite - ${method_name}`, {
    onStart () {
      console.log(`----------------START OF ${method_name}----------------`)
    },
    onComplete () {
      console.log(`suit completed!`)
      console.log(`-----------------END OF ${method_name}-----------------`)
      console.log()
    }
  })

  sortSuite.add('10 sort',    () => { method(reverse_order(10)) },         benchmarkOption)
  sortSuite.add('100 sort',   () => { method(reverse_order(100)) },        benchmarkOption)
  sortSuite.add('1k sort',    () => { method(reverse_order(1000)) },       benchmarkOption)
  sortSuite.add('10k sort',   () => { method(reverse_order(1000 * 10)) },  benchmarkOption)
  sortSuite.add('100k sort',  () => { method(reverse_order(1000 * 100)) }, benchmarkOption)

  sortSuite.run({ async: false })
})
