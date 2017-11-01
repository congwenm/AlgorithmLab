// argv[0] is /usr/local/bin/node
// argv[1] is __filename
import Benchmark, { Suite } from 'benchmark'
import { sample } from '../../src/util'

var filenames = process.argv.slice(2);

var benchmarkOption = {
  onComplete: function () {
    console.log(`${this.name}: ${this.hz} per sec`)
  },
};

[
  function filterUnique(num) {
    Array.prototype.unique = function () {
      return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      })
    }
  },
  function forEachUnique(num) {

  },
].map(function (method) {
  const method_name = method.name
  var sortSuite = new Suite(`sortSuite - ${method_name}`, {
    onStart() {
      console.log(`----------------START OF ${method_name}----------------`)
    },
    onComplete() {
      console.log(`suit completed!`)
      console.log(`-----------------END OF ${method_name}-----------------`)
      console.log()
    }
  })

  sortSuite.add('10 unique samples', () => { method(sample(10)) }, benchmarkOption)
  sortSuite.add('100 unique samples', () => { method(sample(100)) }, benchmarkOption)
  sortSuite.add('1k unique samples', () => { method(sample(1000)) }, benchmarkOption)
  sortSuite.add('10k unique samples', () => { method(sample(1000 * 10)) }, benchmarkOption)

  sortSuite.run({ async: false })
})
