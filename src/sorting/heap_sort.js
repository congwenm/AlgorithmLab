import Heap from '../data_structures/heap'
import EloquentJsHeap from '../data_structures/implementations/eloquent_js_heap'
var heap = new Heap();

export default function heap_sort(items) {
  Heap.call(heap, items)
  var arr = []
  for(let item; heap.queue.length > 1;) {
    item = heap.extract_root()
    arr.push(item)
  }
  return arr
}

var eloquent_heap = new EloquentJsHeap(v=>-v)
export const eloquent_heap_sort = function(items) {
  for (let i = 0; i < items.length; i++) {
    eloquent_heap.push(items[i])
  }
  var arr = []

  for (let item; eloquent_heap.content.length;) {
    item = eloquent_heap.pop()
    arr.push(item)
  }
  return arr
}
