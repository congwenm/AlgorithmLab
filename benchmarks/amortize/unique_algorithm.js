import Benchmark, { Suite } from 'benchmark'
import util from '../../src/util'
const { sample } = util
import { intersection, uniq, uniqBy } from 'lodash'

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
  function lodashIntersection(arr) {
    return intersection(arr)
  },
  function lodashUniq(arr) {
    return uniq(arr)
  },
  function lodashUniqBy(arr) {
    return uniqBy(arr)
  }
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

  suite.run({ async: false })
})


// ----------------START OF filterUnique----------------
// 10 unique samples: 245225.11191164923 per sec
// 100 unique samples: 26837.61869691728 per sec
// 1k unique samples: 1349.993872117006 per sec
// 10k unique samples: 21.53642855482758 per sec
// suit completed!
// -----------------END OF filterUnique-----------------

//   ----------------START OF filterMethodWithSeen----------------
// 10 unique samples: 230332.6447046477 per sec
// 100 unique samples: 30442.415693120594 per sec
// 1k unique samples: 3155.4673535734764 per sec
// 10k unique samples: 299.03401257735646 per sec
// suit completed!
// -----------------END OF filterMethodWithSeen-----------------

//   ----------------START OF lodashIntersection----------------
// 10 unique samples: 274054.82212502474 per sec
// 100 unique samples: 35421.853331967875 per sec
// 1k unique samples: 3500.052838629674 per sec
// 10k unique samples: 332.7271645101262 per sec
// suit completed!
// -----------------END OF lodashIntersection-----------------

//   ----------------START OF lodashUniq----------------
// 10 unique samples: 305718.8597377027 per sec
// 100 unique samples: 36327.76012874685 per sec
// 1k unique samples: 3204.564704638108 per sec
// 10k unique samples: 326.51622314690565 per sec
// suit completed!
// -----------------END OF lodashUniq-----------------

//   ----------------START OF lodashUniqBy----------------
// 10 unique samples: 287634.76688254176 per sec
// 100 unique samples: 34294.32285548527 per sec
// 1k unique samples: 809.3774229714148 per sec
// 10k unique samples: 76.28289465845876 per sec
// suit completed!
// -----------------END OF lodashUniqBy-----------------