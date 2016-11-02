import surgeonkit from 'surgeonkit'
// argv[0] is /usr/local/bin/node
// argv[1] is __filename
import Benchmark, { Suite } from 'benchmark'

var filename = process.argv.slice(2)[0];
// import fn from `./algorithms/${filename}`; // doesn't work today, may never work

var sample = function(num) {
  if (sample[num]) { return sample[num] }
  sample[num] = surgeonkit.expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
  return sample[num]
};

var benchmarkOption = {
  onComplete: function() {
    console.log(`${this.name}: ${this.hz} per secs`)
  },
  async: true
};


(filename ? [filename] : [
  'merge_sort',
  'selection_sort',
  'insertion_sort',
  // 'bubble_sort', 
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

  sortSuite.add('10 sort',    () => { method(sample(10)) },         benchmarkOption)
  sortSuite.add('100 sort',   () => { method(sample(100)) },        benchmarkOption)
  sortSuite.add('1k sort',    () => { method(sample(1000)) },       benchmarkOption)
  sortSuite.add('10k sort',   () => { method(sample(1000 * 10)) },  benchmarkOption)
  sortSuite.add('100k sort',  () => { method(sample(1000 * 100)) }, benchmarkOption)

  sortSuite.run({ async: false })
})
