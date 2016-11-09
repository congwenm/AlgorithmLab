import Heap from '../data_structures/heap'
var heap = new Heap();

export default function heap_sort(items) {
  Heap.constructor.call(heap, items)
  var arr = []
  for(let item; heap.queue.length > 1;) {
    item = heap.extract_root()
    // console.log('extracted root', item)
    arr.push(item);
  }
  return arr
}
