/**/
import shuffle from './shuffle'
var tmp;
var quicksortCount = 0;
// var partitionCount = 0;

export default function quickSortMain(arr) {
  quickSort(arr, 0, arr.length-1)
  // console.log(`quickSort called ${quicksortCount} times`)
  // console.log(`partition called ${partitionCount} times`)
  return arr
}

function quickSort(arr, lo, hi) {
  // quicksortCount++;
  var pivot;
  // console.log('quicksorting', lo, hi, arr)
  if (lo < hi) {
    pivot = partition(arr, lo, hi)
    quickSort(arr, lo, pivot-1)
    quickSort(arr, pivot+1, hi)
  }

  return arr
}

export const partition = function(A, lo, hi) {
  // console.log('partion 之前', A)
  // partitionCount++;
  if (hi < 0) return 0;
  var pivotIndex = Math.ceil((hi + lo) / 2)
  var pivot = A[pivotIndex]
  // console.log('pivot value is', pivot)
  tmp = A[hi]; A[hi] = A[pivotIndex]; A[pivotIndex] = tmp
  var i = lo;
  for (var j = lo; j <= hi; j++) {
    if(A[j] < pivot) {
      // console.log('swapping i and j', i, j)
      // swap
      tmp = A[i]; A[i] = A[j]; A[j] = tmp
      i++;
    }
  }
  // console.log('swapping i and hi', i, hi)
  // swap A[i] with A[hi], basically puts the pivot where it belongs
  tmp = A[i]; A[i] = A[hi]; A[hi] = tmp

  // console.log('partion 之后', A)
  return i;
}
