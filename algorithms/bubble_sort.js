const bubbleSort = function(arr, key) {
  var len = arr.length;
  var tmp;
  for (var i = 0; i < len-2; i++) {
    for (var j = 0, k = 1; k < len; j++, k++) {
      // console.log('comparison: ', j, k)
      if (key ? arr[j][key] > arr[k][key] : arr[j] > arr[k]) {
        // swap
        tmp = arr[j]
        arr[j] = arr[k]
        arr[k] = tmp
      }
    }
  }
  return arr;
}

export default bubbleSort;