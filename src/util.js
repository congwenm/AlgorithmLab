const expand = n => [...Array(n).keys()];

const every = groupsOf => {
  return function (arr, callback) {
    let ending = arr.length - groupsOf;
    var newArr = []
    for (let i = 0; i <= ending; i++) {
      let group = arr.slice(i, i + groupsOf);
      newArr.push(callback.apply(this, group))
    }
    return newArr;
  }
}


// methods that generates data implements caching to avoid data generation becoming part of the benchmark
const sampleWithCache = function(num) {
  if (sample[num]) { return sample[num]; }
  return sample[num] = expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
};

const sample = function(num) {
  return expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
};


const ordered = function(num) {
  if(ordered[num]) { return ordered[num]; }
  return ordered[num] = expand(num).map(
    n => n+1
  )
}

const reverse_order = function(num) {
  if(reverse_order[num]) { return reverse_order[num]; }
  return reverse_order[num] = ordered(num).reverse();
}

const padding = function(val, number, direction) {
  var pad = expand(number).map(n => ' ').join('')
  return (pad + val.toString()).slice(-number)
}

const max_by = function(arr, callback) {
  var maxValue = 0
  var maxIndice
  var tempValue
  for (let i = 0; i < arr.length; i++) {
    tempValue = callback(arr[i])
    if (!maxValue || maxValue < tempValue) {
      maxValue = tempValue
      maxIndice = arr[i]
    }
  }
  return maxIndice
}

const shuffle = function(arr, { lo, hi, mutable = false } = {}) {
  if (!mutable) arr = arr.slice(lo, hi)

  var len = arr.length
  var temp
  lo = lo || 0
  hi = hi || arr.length
  if (len <= 1) return arr;
  for (var i = lo; i < hi; i++) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    temp = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = temp
  }

  return arr
}

const greaterThanOrEqualTo = (unit1, unit2) => unit2 >= unit1

const lessThanOrEqualTo = (unit1, unit2) => unit2 <= unit1

const ascendingVerifier = (arr, key) => {
  return every(2)(
    arr.map(item => key ? item[key] : item),
    greaterThanOrEqualTo
  ).every(t => t)
}

const descendingVerifier = (arr, key) => {
  return every(2)(
    arr.map(item => key ? item[key] : item),
    lessThanOrEqualTo
  ).every(t => t)
}

let zeglobal = null
try {
  zeglobal = global
} catch(e) {
  zeglobal = window
}

const util = zeglobal.util = {
  expand,
  every,
  sampleWithCache,
  sample,
  ordered,
  reverse_order,
  padding,
  max_by,
  shuffle,
  ascendingVerifier,
  descendingVerifier,
}

// pollution global space
// for (let meth in util) {
//   zeglobal[meth] = util[meth]
// }

zeglobal.base_dir = __dirname
zeglobal.abs_path = path => base_dir + path
zeglobal.include = file => require(abs_path('/' + file))

export default util