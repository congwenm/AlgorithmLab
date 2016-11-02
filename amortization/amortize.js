import surgeonkit from 'surgeonkit'
// argv[0] is /usr/local/bin/node
// argv[1] is __filename
import Benchmark, { Suite } from 'benchmark'

var filename = process.argv.slice(2)[0];
// import fn from `./algorithms/${filename}`; // doesn't work today, may never work
var method = require(`../algorithms/${filename}.js`).default;

var sample = function(num) {
  if (sample[num]) { return sample[num] }
  sample[num] = surgeonkit.expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
  return sample[num]
};

var handleComplete = {
  onComplete: function() {
    console.log(`${this.name}: ${this.hz} per secs`)
  }
};

var sortSuite = new Suite('sortSuite', {
  onStart () {
    console.log('----------------START OF BENCHMARK----------------')
  },
  onComplete () {
    console.log('suitComplete')
    console.log('-----------------END OF BENCHMARK-----------------')
    console.log()
  }
})

sortSuite.add('10 sort',    () => { method(sample(10)) },    handleComplete)
sortSuite.add('20 sort',    () => { method(sample(20)) },    handleComplete)
sortSuite.add('50 sort',    () => { method(sample(50)) },    handleComplete)
sortSuite.add('100 sort',   () => { method(sample(100)) },   handleComplete)
sortSuite.add('1000 sort',  () => { method(sample(1000)) },  handleComplete)
sortSuite.add('10000 sort', () => { method(sample(10000)) }, handleComplete)

sortSuite.run({ async: true })