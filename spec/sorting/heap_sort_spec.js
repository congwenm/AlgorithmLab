import heap_sort, { eloquent_heap_sort } from '../../src/sorting/heap_sort';
import Heap from '../../src/data_structures/heap'
import EloquentHeap from '../../src/data_structures/implementations/eloquent_js_heap'


describe('heapsorts', function() {
  beforeEach(function() {
    spyOn(Heap.prototype, 'bubble_down').and.callThrough()
    spyOn(Heap.prototype, 'extract_root').and.callThrough()
    spyOn(EloquentHeap.prototype, 'sinkDown').and.callThrough()
    spyOn(EloquentHeap.prototype, 'pop').and.callThrough()
    spyOn(EloquentHeap.prototype, 'countSwap').and.callThrough()
  })

  describe('my heapsort', function() {
    it('should extract out items in sorted order', function() {
      expect(heap_sort([
        7,6,5,4,3,2,1,8,9
      ])).toEqual([9,8,7,6,5,4,3,2,1])
      // console.log(
      //   '\nmy heap call statistics:',
      //   '\nsink downs: ', Heap.prototype.bubble_down.calls.count(),
      //   '\nextraction: ', Heap.prototype.extract_root.calls.count()
      // )
    })

    it('should sort out 20 items in order', function() {
      expect(descendingVerifier(
        heap_sort(
          expand(20).map(n => (Math.random() * 20) | 0)
        )
      )).toBe(true)
    })

    it('should sort out 100 items in order', function() {
      expect(descendingVerifier(
        heap_sort(
          expand(100).map(n => (Math.random() * 100) | 0)
        )
      )).toBe(true)
    })

    it('should sort out 10 * 1000 items in order', function() {
      expect(descendingVerifier(
        heap_sort(
          expand(10000).map(n => (Math.random() * 10000) | 0)
        )
      )).toBe(true)

      // console.log(
      //   '\nmy heap call statistics:',
      //   '\nsink downs: ', Heap.prototype.bubble_down.calls.count(),
      //   '\nextraction: ', Heap.prototype.extract_root.calls.count()
      // )
    })
  })

  describe('eloquentJs heapsort', function() {
    it('should extract out items in sorted order', function() {
      expect(eloquent_heap_sort([
        7,6,5,4,3,2,1,8,9
      ])).toEqual([9,8,7,6,5,4,3,2,1])
    })

    it('should sort out 20 items in order', function() {
      expect(descendingVerifier(
        eloquent_heap_sort(
          expand(20).map(n => (Math.random() * 20) | 0)
        )
      )).toBe(true)
    })

    it('should sort out 100 items in order', function() {
      expect(descendingVerifier(
        eloquent_heap_sort(
          expand(100).map(n => (Math.random() * 100) | 0)
        )
      )).toBe(true)
    })

    it('should sort out 10 * 1000 items in order', function() {
      expect(descendingVerifier(
        eloquent_heap_sort(
          expand(10000).map(n => (Math.random() * 10000) | 0)
        )
      )).toBe(true)

      // console.log(
      //   '\neloquent call statistics:',
      //   '\nsink downs: ', EloquentHeap.prototype.sinkDown.calls.count(),
      //   '\nsink downs swaps: ', EloquentHeap.prototype.countSwap.calls.count(),
      //   '\nextraction: ', EloquentHeap.prototype.pop.calls.count()
      // )
    })
  })
})
