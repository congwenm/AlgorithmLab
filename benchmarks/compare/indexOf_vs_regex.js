var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;
var fs = require('fs');
var path = require('path')

var filename = path.basename(__filename);
var reportDir = `${__dirname}/${/(.*)\.js$/.exec(filename)[1]}`;
console.log(reportDir)
if (!(
  fs.existsSync(reportDir) && fs.lstatSync(reportDir).isDirectory()
  )) {
  fs.mkdirSync(reportDir)
}
var report = function(name, content) {
  fs.writeFile(`${reportDir}/${name}-stats`, JSON.stringify(content.stats, null, 2), (err) => console.log('err', err))
  fs.writeFile(`${reportDir}/${name}-hz`, JSON.stringify(content.hz, null, 2), (err) => console.log('err', err))
  return true;
}

suite.add('RegEx#test', function() {
  /o/.test('Hello World!')
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  report('test', this[0]);
  report('indexOf', this[1]);
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})

suite.run({ async: true, initCount: 1, maxTime: 1 })
debugger;
