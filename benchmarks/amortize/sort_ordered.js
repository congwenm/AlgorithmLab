// argv[0] is /usr/local/bin/node
// argv[1] is __filename
import Benchmark, { Suite } from 'benchmark'
import { ordered } from '../../src/util'

var filenames = process.argv.slice(2);

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
  var method = require(`../../src/sorting/${method_name}.js`).default

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

  sortSuite.add('10 sort',    () => { method(ordered(10)) },         benchmarkOption)
  sortSuite.add('100 sort',   () => { method(ordered(100)) },        benchmarkOption)
  sortSuite.add('1k sort',    () => { method(ordered(1000)) },       benchmarkOption)
  sortSuite.add('10k sort',   () => { method(ordered(1000 * 10)) },  benchmarkOption)
  sortSuite.add('100k sort',  () => { method(ordered(1000 * 100)) }, benchmarkOption)

  sortSuite.run({ async: false })
})
