export default function mergeSort(arr) {
  return sort(arr, [], 0, arr.length - 1);
}


// not quite right
function sort(arr, aux, lo, hi){
  if (hi <= lo) return;
  var mid = lo + (hi - lo) / 2;
  sort (arr, aux, lo, mid);
  sort (arr, aux, mid + 1, hi);
  return merge(arr, aux, lo, mid, hi);
}


export const merge = function(arr, aux, lo, mid, hi) {
  // aux = arr.slice(); //maybe
  for(let k = lo; k <= hi; k++) {
    aux[k] = arr[k]
  }
  var i = lo
  var j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid)  // no more smaller set, i exceeds mid
      arr[k] = aux[j++]
    else if (j > hi) // no more larger set, j exceeds hi
      arr[k] = aux[i++];
    else if (aux[j] < aux[i]) // right[0] is smaller than left[0],
      arr[k] = aux[j++]
    else {  // remaining condition, left[0] is smaller than right[0]
      arr[k] = aux[i++]
    }
  }
  return arr;
}
