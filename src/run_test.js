import Jasmine from 'jasmine'
import util from './util'
import path from 'path';

var jasmine = new Jasmine()
jasmine.loadConfig({
  "spec_dir": "./src",
  "spec_files": [
    "**/*[sS]pec.js"
  ],
  "helpers": [
    "helpers/**/*.js"
  ],
  "stopSpecOnExpectationFailure": false,
  "random": false
});

jasmine.onComplete(function(passed) {
  if(passed) {
    console.log('All specs have passed');
  }
  else {
    console.log('At least one spec has failed');
  }
});

jasmine.execute()