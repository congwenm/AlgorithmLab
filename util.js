import surgeonkit from 'surgeonkit'
// methods that generates data implements caching to avoid data generation becoming part of the benchmark

var sample = function(num) {
  if (sample[num]) { return sample[num]; }
  return sample[num] = surgeonkit.expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
};

var ordered = function(num) {
  if(ordered[num]) { return ordered[num]; }
  return ordered[num] = surgeonkit.expand(num).map(
    n => n+1
  )
}

var reverse_order = function(num) {
  if(reverse_order[num]) { return reverse_order[num]; }
  return reverse_order[num] = ordered(num).reverse();
}

var padding = function(val, number, direction) {
  var pad = surgeonkit.expand(number).map(n => ' ').join('') 
  return (pad + val.toString()).slice(-number)
}

export default {
  sample,
  ordered,
  padding,
  reverse_order,
}