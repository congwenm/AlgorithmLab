import surgeonkit from 'surgeonkit';
import quickSort, { partition } from '../../algorithms/quick_sort';
import { ascendingVerifier } from '../order_verifier';

var scrambledNumbers = [5,1,2,3,4];
describe('#quickSort', () => {
  it ('should sort numbers', () => {
    expect(quickSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(ascendingVerifier(
      quickSort(
        surgeonkit.expand(100).map(n => (Math.random() * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort 1,000 numbers', () => {
    expect(ascendingVerifier(
      quickSort(
        surgeonkit.expand(1000).map(n => (Math.random() * 1000) | 0)
      )
    )).toBe(true)
  })

  it('should sort 100,000 numbers', () => {
    expect(ascendingVerifier(
      quickSort(
        surgeonkit.expand(100 * 1000).map(n => (Math.random() * 1000 * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort 1,000,000 numbers', () => {
    expect(ascendingVerifier(
      quickSort(
        surgeonkit.expand(1000 * 1000).map(n => (Math.random() * 1000 * 1000) | 0)
      )
    )).toBe(true)
  })

  it('should sort objects based on key', () => {
    // copy out of the other one
  })
})

describe('#partition', () => {
  it('should partition the entire 4 len element', () => {
    var arr = [1,4,3,2]
    // 3 gets chosen as pivot
    expect(partition(arr, 0, 3)).toBe(2)
    expect( arr ).toEqual([1,2,3,4])
  })

  it('should partition the entire 7 len element', () => {
    var arr = [2,5,6,4,7,3,1]
    // pivot: 4
    expect(partition(arr, 0, 6)).toBe(3)
    // [2,(5),{6},(1),7,{3},4] // swapping 5 - 1, 6 - 3
    // [2,1,3,(5),7,6,(4)]  // final swap 4 - 5
    expect( arr ).toEqual([2,1,3,4,7,6,5])
  })

  it('should partition part of the array, [1-5]', () => {
    var arr = [2,5,6,4,7,3,1]
    expect(partition(arr, 1, 5)).toBe(2)
    // [2,(5),6,(3),7,4,1]  // swapping 5 - 3
    // [2,3,(6),5,7,(4),1]  // swapping 6 - 4
    expect( arr ).toEqual([2,3,4,5,7,6,1])
  })
})
