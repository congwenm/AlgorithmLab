import Heap from '../../data_structures/heap'
import surgeonkit from 'surgeonkit'
import util from '../../util'
const { reverse_order, ordered } = util
const { expand } = surgeonkit

fdescribe('#heap', () => {
  var heap;
  beforeEach(() => {
    heap = new Heap()
    // heap.print.call({ queue: expand(17) })
  })    

  it('expect heap to be 4, 3, 2, 1', function() {
    heap.insert(1)
    heap.insert(2) // swap 2 with 1
    heap.insert(3) // swap 3 with 2
    heap.insert(4) // swap 4 with 1, 4 with 3
    // heap.print()
    expect(heap.queue[1]).toBe(4) 
    expect(heap.queue[2]).toBe(3)
    expect(heap.queue[3]).toBe(2)
    expect(heap.queue[4]).toBe(1)
  })

  it('expect heap to not swap at all if inserted at reverse_order', function() {
    var rev_arr = reverse_order(10)
    rev_arr.forEach(n => heap.insert(n))
    expect(heap.queue).toEqual([null, ...rev_arr])
  })

  it('expect heap largest to be in index 1', function() {
    var orded_arr = ordered(10)
    orded_arr.forEach(n => heap.insert(n))
    expect(Math.max(...heap.queue)).toEqual(heap.queue[1])
  })  
})
