include('util');
import paullewisQuickSort, { partition } from "./paullewis_quick_sort";

var scrambledNumbers = [5,1,2,3,4];
describe('#paullewisQuickSort', () => {
  it ('should sort numbers', () => {
    expect(paullewisQuickSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(util.ascendingVerifier(
      paullewisQuickSort(
        util.expand(20).map(n => (Math.random() * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort 1,000 numbers', () => {
    expect(util.ascendingVerifier(
      paullewisQuickSort(
        util.expand(1000).map(n => (Math.random() * 1000) | 0)
      )
    )).toBe(true)
  })

  it('should sort objects based on key', () => {
    // copy out of the other one
  })
})