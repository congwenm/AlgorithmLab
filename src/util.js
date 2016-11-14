import surgeonkit from 'surgeonkit'

// methods that generates data implements caching to avoid data generation becoming part of the benchmark

export const sampleWithCache = function(num) {
  if (sample[num]) { return sample[num]; }
  return sample[num] = surgeonkit.expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
};

export const sample = function(num) {
  return surgeonkit.expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
};


export const ordered = function(num) {
  if(ordered[num]) { return ordered[num]; }
  return ordered[num] = surgeonkit.expand(num).map(
    n => n+1
  )
}

export const reverse_order = function(num) {
  if(reverse_order[num]) { return reverse_order[num]; }
  return reverse_order[num] = ordered(num).reverse();
}

export const padding = function(val, number, direction) {
  var pad = surgeonkit.expand(number).map(n => ' ').join('')
  return (pad + val.toString()).slice(-number)
}

export const max_by = function(arr, callback) {
  var maxValue = 0
  var maxIndice
  var tempValue
  for (let i = 0; i < arr.length; i++) {
    tempValue = callback(arr[i])
    if (maxValue < tempValue) {
      maxValue = tempValue
      maxIndice = arr[i]
    }
  }
  return maxIndice
}

export const shuffle = function(arr, { lo, hi, mutable = false } = {}) {
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

export const ascendingVerifier = (arr) => {
  return surgeonkit.every(2)(arr, greaterThanOrEqualTo).every(t => t)
}

export const descendingVerifier = (arr) => {
  return surgeonkit.every(2)(arr, lessThanOrEqualTo).every(t => t)
}

export default {
  sample,
  sampleWithCache,
  ordered,
  padding,
  reverse_order,
  max_by,
  shuffle,
  ascendingVerifier,
  descendingVerifier,
}
