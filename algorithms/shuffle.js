// linear
export default function shuffle(arr, { lo, hi, mutable = false } = {}) {
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
