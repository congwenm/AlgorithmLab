export default function shellSort (arr){
  var len = arr.length
  var h = 1
  var temp
  while (h < len) h = 3 * h + 1;

  while (h >= 1) {
    // console.log('current h:', h)
    for (var i = h; i < len; i++) {
      // console.log('current i:', i)
      for (var j = i; j >= h && arr[j] < arr[j-h]; j -= h) {
        // console.log('comparing indices (i, j): ', i, j)
        // swap
        temp = arr[j]
        arr[j] = arr[j - h]
        arr[j - h] = temp
      }
    }
    h = Math.floor(h / 3);
  }

  return arr
}
