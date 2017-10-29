include('util');
import mergeSort, { merge } from "./merge_sort";

var scrambledNumbers = [5,1,2,3,4];
describe('#mergeSort', () => {
  it ('should sort numbers', () => {
    expect(mergeSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(util.ascendingVerifier(
      mergeSort(
        util.expand(20).map(n => (Math.random() * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort objects based on key', () => {
    // copy out of the other one
    expect(
      util.ascendingVerifier(
        mergeSort(
          util.expand(20).map(n =>
            ({
              specialValue: (Math.random() * 100) | 0
            })
          ),
          'specialValue'
        ),
        'specialValue'
      )
    ).toBe(true)
  })
})


describe('#merge', () => {
  it('should merge two arrays into one in order', () => {
    expect(merge([1,4,5,2,3,6], [], 0, 2, 5)).toEqual([1,2,3,4,5,6])
  })
})
