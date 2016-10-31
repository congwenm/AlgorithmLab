/**/

var tmp;

export default function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++ ) {
    let j = i;
    while (j > 0 && arr[j-1] > arr[j]) { // change this fom '>' to '<' will change ascending to descending sort
      tmp = arr[j]
      arr[j] = arr[j-1]
      arr[j-1] = tmp
      j--;
    }
  }
  return arr;
}
