import Heap from '../../data_structures/heap'
import surgeonkit from 'surgeonkit'
import util from '../../util'
const { reverse_order, ordered } = util
const { expand } = surgeonkit
import { descendingVerifier } from '../order_verifier';

describe('#Heap', () => {
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
    heap.insert(5) // swap 4 with 1, 4 with 3
    // heap.print()
    // 5,4,2,1,3
    expect(heap.queue[1]).toBe(5) 
    expect(heap.queue[2]).toBe(4)
    expect(heap.queue[3]).toBe(2)
    expect(heap.queue[4]).toBe(1)
    expect(heap.queue[5]).toBe(3)
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

  function expectations(heap) {
    expect(heap.queue).toEqual([null, 2,1])
  }

  describe('#constructor', function() {
    it('should construct heap from array', function() {
      var heap = new Heap([1,2])
      expectations(heap)
    })
  })

  describe('#of', function() {
    it('should convert array to a heap, even though this isnt part of Array#of', function() {
      var heap = Heap.of([1,2])
      expectations(heap)
    })
    it('should convert a number of args into a heap', function() {
      var heap = Heap.of(1,2)
      expectations(heap)
    })
    it('should convert a heap into a heap', function() {
      var heap = Heap.of(new Heap([1,2]))
      expectations(heap)
    })
  })

  describe('#extract_root', function() {
    it('should remove the the root of the queue and bubble down the changes', function() {
      heap.insert(1)
      heap.insert(2) // swap 2 with 1
      heap.insert(3) // swap 3 with 2
      heap.insert(4) // swap 4 with 1, 4 with 3
      heap.insert(5) // swap 5 with 3, 5 with 4, 5 4 2 1 3
      heap.print()
      expect(heap.extract_root()).toBe(5)
      expect(heap.queue[1]).toBe(4) 
      expect(heap.queue[2]).toBe(3)
      expect(heap.queue[3]).toBe(2)
      expect(heap.queue[4]).toBe(1)
      // heap.print()
    })

    it('should extract fine with array [ null, 6, 4, 5, 1, 3, 2 ] ', function() {
      heap.queue = [ null, 6, 4, 5, 1, 3, 2 ];
      expect(heap.extract_root()).toBe(6)
      expect(heap.queue).toEqual([null, 5, 4, 2, 1, 3])
    )
  })

  describe('#heapsort', function() {
    it('should extract out items in sorted order', function() {
      expect(Heap.heap_sort([
        7,6,5,4,3,2,1,8,9
      ])).toEqual([9,8,7,6,5,4,3,2,1])
    })

    it('should sort out 20 items in order', function() {
      expect(descendingVerifier(
        Heap.heap_sort(
          surgeonkit.expand(20).map(n => (Math.random() * 20) | 0)
        )
      )).toBe(true)
    })

    it('should sort out 100 items in order', function() {
      expect(descendingVerifier(
        Heap.heap_sort(
          surgeonkit.expand(100).map(n => (Math.random() * 100) | 0)
        )
      )).toBe(true)
    })
  })
})
