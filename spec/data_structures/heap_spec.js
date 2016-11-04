import Heap from '../../data_structures/heap.js'
fdescribe('#heap', () => {
  var heap;
  beforeEach(() => {
    heap = new Heap()
    heap.insert(1)
    heap.insert(2)
    heap.insert(3)
  })    

  it('expect heap to be 3, 2, 1', function() {
    expect(heap.q[0].value).toBe(3)
    expect(heap.q[1].value).toBe(2)
    expect(heap.q[2].value).toBe(1)
  })
})
