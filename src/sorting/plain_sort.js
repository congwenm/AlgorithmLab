export default function plainSort(arr) {
  return [].sort.call(arr, (a, b) => a - b)
}
