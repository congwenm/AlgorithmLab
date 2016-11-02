/**/

var tmp;

export default function quickSortMain(arr) {
  return quickSort(arr, 0, arr.length-1)
}

function quickSort(arr, lo, hi) {
  var pivot;
  // console.log('quicksorting', lo, hi, arr)
  if ( arr.length > 1 && lo < hi) {
    pivot = partition(arr, lo, hi)
    quickSort(arr, lo, pivot-1)
    quickSort(arr, pivot+1, hi)
  }

  return arr
}

export const partition = function(A, lo, hi) {
  // console.log('partion 之前', A)
  if (hi < 0) return 0;
  var pivot = A[hi]
  var i = lo;
  for (var j = lo; j <= hi; j++) {
    if(A[j] < pivot) {
      // console.log('swapping i and j', i, j)
      // swap
      tmp = A[i]
      A[i] = A[j]
      A[j] = tmp
      i++;
    }
  }
  // console.log('swapping i and hi', i, hi)
  // swap A[i] with A[hi], basically puts the pivot where it belongs
  tmp = A[i]
  A[i] = A[hi]
  A[hi] = tmp

  // console.log('partion 之后', A)
  return i;
}
