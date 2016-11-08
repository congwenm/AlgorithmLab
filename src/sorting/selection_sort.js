export default function selectionSort(arr) {
  var tmp;
  for (var i = 0; i < arr.length-1; i++) {
    // determine minimal in remaining array
    var minIndex = i
    // console.log('array status', arr, i)
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    // swap
    tmp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = tmp
  }
  return arr
}
