import surgeonkit from 'surgeonkit'

var sample = function(num) {
  if (sample[num]) { return sample[num] }
  sample[num] = surgeonkit.expand(num).map(
    n => Math.ceil(Math.random() * num)
  )
  return sample[num]
};

var reverse_order = function(num) {
  return surgeonkit.expand(num).map(
    n => num - n
  )
}

export default {
  sample,
  reverse_order
}