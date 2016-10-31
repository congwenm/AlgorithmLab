// linear
export default function shuffle(arr, { mutable = false } = {}) {
  if (!mutable) arr = arr.slice()

  var len = arr.length
  var temp
  if (len <= 1) return arr;
  for (var i = 0; i < len; i++) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    temp = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = temp
  }

  return arr
}
