const { simple } = require('./helper/tools');
const expand = n => [...Array(n).keys()]
const arr100 = expand(100);
const arr1000 = expand(1000);
const arr10000 = expand(10000)

simple({
	'filter 100x': () => {
		return arr100.filter((item) => item === '50');
	},
	'filter 1,000x': () => {
		return arr1000.filter((item) => item === '500');
	},
	'filter 10,000x': () => {
		return arr10000.filter((item) => item === '5000');
	},

	'indexOf + splice 100x': () => {
    const arr = arr100.slice()
		const foundIndex = arr.indexOf('50');
		if (foundIndex > -1) {
			arr.splice(foundIndex, 1);
		}
		return arr;
	},
	'indexOf + splice 1,000x': () => {
    const arr = arr1000.slice()
		const foundIndex = arr.indexOf('500');
		if (foundIndex > -1) {
			arr.splice(foundIndex, 1);
		}
		return arr;
	},
	'indexOf + splice 10,000x': () => {
    const arr = arr10000.slice()
		const foundIndex = arr.indexOf('5000');
		if (foundIndex > -1) {
			arr.splice(foundIndex, 1);
		}
		return arr;
	}
});

// result:
//  filter 100x              x 3,151,689 ops/sec ±1.50% (84 runs sampled)
//  filter 1,000x            x 332,546 ops/sec ±11.95% (88 runs sampled)
//  filter 10,000x           x 15,611 ops/sec ±14.58% (90 runs sampled)
//  indexOf + splice 100x    x 9,438,355 ops/sec ±0.80% (91 runs sampled)
//  indexOf + splice 1,000x  x 1,147,173 ops/sec ±0.53% (92 runs sampled)
//  indexOf + splice 10,000x x 92,687 ops/sec ±0.65% (93 runs sampled)
//
//  Fastest is indexOf + splice 100x