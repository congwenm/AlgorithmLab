// seems the aux is passed in specifically to save the amount of []s created for the sort

export default function mergeSort(arr, key) {
  return sort(arr, [], 0, arr.length - 1, key);
}

// not quite right
function sort(arr, aux, lo, hi, key){
  // console.log('sorting', arr, aux, lo, hi, `current array ${arr.slice(lo, hi+1)}`)

  // if they are equal, most likely
  // if (hi <= lo) console.log('no need to sort');
  if (hi <= lo) return;
  var mid = Math.floor(lo + (hi - lo) / 2);
  sort(arr, aux, lo, mid, key);
  sort(arr, aux, mid + 1, hi, key);

  return merge(arr, aux, lo, mid, hi, key);
}

export const merge = function(arr, aux, lo, mid, hi, key) {
  // console.log('-------------------------')
  // console.log('merging and sorting', arr.slice(lo, hi+1))
  for(let k = lo; k <= hi; k++) {
    aux[k] = arr[k]
  }
  var i = lo
  var j = mid + 1;
  for (let k = lo; k <= hi; k++) {

    // no more smaller set, i exceeds mid (used up all of firt half)
    if (i > mid) {
      // console.log('i EXCEED mid (index boundary)', i, mid)
      // console.log('adding', aux[j])
      arr[k] = aux[j++]
    }
    // no more larger set, j exceeds hi, (used up all of second half)
    else if (j > hi) {
      // console.log('j EXCEED hi (index boundary)', j, hi)
      // console.log('adding', aux[i])
      arr[k] = aux[i++];
    }
    // right[0] is smaller than left[0],
    else if (key ?
      aux[j][key] < aux[i][key] :
      aux[j] < aux[i]
    ) {
      // console.log('RIGHT is smaller than LEFT', `${aux[j]} > ${aux[i]}`)
      // console.log('adding', aux[j])
      arr[k] = aux[j++]
    }
    // remaining condition, left[0] is smaller than right[0]
    else {
      // console.log('LEFT is smaller than RIGHT', `${aux[i]} < ${aux[j]}`)
      // console.log('adding', aux[i])
      arr[k] = aux[i++]
    }
  }
  // console.log('-------------------------')
  // console.log()
  return arr;
}
