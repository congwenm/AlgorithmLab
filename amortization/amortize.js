import surgeonkit from 'surgeonkit';
// argv[0] is /usr/local/bin/node
// argv[1] is __filename
var Benchmark = require('benchmark')
var filename = process.argv.slice(2)[0];
// import fn from `./algorithms/${filename}`;
var fn = require(`../algorithms/${filename}.js`).default;


function run() {
  console.log(fn(
    surgeonkit.expand(20).map(n => Math.ceil(Math.random() * 100))
  ))
}

run();