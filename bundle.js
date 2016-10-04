/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].e;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			e: {},
/******/ 			i: moduleId,
/******/ 			l: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.e, module, module.e, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.e;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Benchmark = __webpack_require__(2)

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
	  console.log('Fastest is ' + this.filter('fastest').map('name'))
	})

	suite.run({ async: true })


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var indexOf_vs_regex = __webpack_require__(0);

	indexOf_vs_regex.run({ async: true })


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.e = benchmark;

/***/ }
/******/ ]);