import Benchmark, { Suite } from 'benchmark'
import { sample } from '../../src/util'

var benchmarkOption = {
  onComplete: function () {
    console.info(this.hz)
    console.log(`${this.name}: ${this.hz} per sec`)
  },
};

[
  function filterUnique(num) {
    return num.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
  },
  function filterMethodWithSeen(num) {
    var seen = {}
    return num.filter(function (x) {
      if (seen[x])
        return
      seen[x] = true
      return x
    })
  },
].map(function (method) {
  const method_name = method.name
  var suite = new Suite(`Unique - ${method_name}`, {
    onStart() {
      console.log(`----------------START OF ${method_name}----------------`)
    },
    onComplete() {
      console.log(`suit completed!`)
      console.log(`-----------------END OF ${method_name}-----------------`)
      console.log()
    }
  })

  // console.info('method', method)
  // console.info('execution', method([1,2,1,3,2]))

  suite.add('10 unique samples', () => { method(sample(10)) }, benchmarkOption)
  suite.add('100 unique samples', () => { method(sample(100)) }, benchmarkOption)
  suite.add('1k unique samples', () => { method(sample(1000)) }, benchmarkOption)
  suite.add('10k unique samples', () => { method(sample(1000 * 10)) }, benchmarkOption)
  suite.add('100k unique samples', () => { method(sample(1000 * 100)) }, benchmarkOption)
  suite.add('1M unique samples', () => { method(sample(1000 * 1000)) }, benchmarkOption)

  suite.run({ async: false })
})
