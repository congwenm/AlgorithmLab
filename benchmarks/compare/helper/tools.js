var Benchmark = require('benchmark')

const simple = (tests, opts = {}) => {
  var suite = new Benchmark.Suite;

  for (let test_name in tests) {
    suite.add(test_name, tests[test_name])
  }

  const { teardown } = opts;
  if (teardown) {
    suite.on('teardown', teardown)
  }

  suite.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  suite.run({ async: true })
}

module.exports = {
  simple,
  expand: n => [...Array(n).keys()]
}
