include('util');
import bubbleSort from "./bubble_sort"

var scrambled = [5,2,1,3,4]

describe('bubbleSort', () => {
  it('should sort `scrambled`', () =>
    expect(bubbleSort(scrambled)).toEqual([1,2,3,4,5])
  )

  it('should sort 100 numbers into the correct order', () =>
    expect(
      util.ascendingVerifier(
        util.expand(100).map(n => Math.ceil(Math.random(100)))
      )
    ).toBe(true)
  )

  var scrambledObjects = [
    { id: 6, name: 'p' },
    { id: 1, name: 'x' },
    { id: 3, name: 'i' }
  ];

  it('should sort objects by key', () => {
    expect(bubbleSort(scrambledObjects, 'id').map(obj => obj.id)).toEqual([
      1, 3, 6
    ])
    expect(bubbleSort(scrambledObjects, 'name').map(obj => obj.name)).toEqual([
      'i', 'p', 'x'
    ])
  })
})