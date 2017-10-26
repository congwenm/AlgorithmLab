import Jasmine from 'jasmine'
import * as util from './util'
import surgeonkit from 'surgeonkit'
import path from 'path';

// test setup helper methods
for (let meth in util) {
  global[meth] = util[meth]
}

for (let meth in surgeonkit) {
  global[meth] = surgeonkit[meth]
}

var jasmine = new Jasmine()
jasmine.loadConfigFile(path.join(__dirname, "support/jasmine.json"));
jasmine.onComplete(function(passed) {
  if(passed) {
    console.log('All specs have passed');
  }
  else {
    console.log('At least one spec has failed');
  }
});

jasmine.execute()