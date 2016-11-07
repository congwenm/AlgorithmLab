import Heap from '../data_structures/heap'

export default function heap_sort(items) {
  var heap = Heap.of(items)
  var arr = []
  for(let item; heap.queue.length > 1;) {
    item = heap.extract_root()
    // console.log('extracted root', item)
    arr.push(item);
  }
  return arr
}
