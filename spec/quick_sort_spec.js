import surgeonkit from 'surgeonkit';
import quickSort, { partition } from '../algorithms/quick_sort';
import { ascendingVerifier } from './order_verifier';

var scrambledNumbers = [5,1,2,3,4];
describe('#quickSort', () => {
  it ('should sort numbers', () => {
    expect(quickSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(ascendingVerifier(
      quickSort(
        surgeonkit.expand(20).map(n => (Math.random() * 100) | 0)
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


  it('should sort objects based on key', () => {
    // copy out of the other one
  })
})

describe('#partition', () => {
  beforeEach(function() {
    // spyOn(Math, 'random').and.returnValue(0.6) // 4
  })

  it('should partition the entire 4 len element', () => {
    var arr = [1,3,4,2]
    expect(partition(arr, 0, 3)).toBe(1)
    expect( arr ).toEqual([1,2,4,3])
  })

  it('should partition the entire 7 len element', () => {
    var arr = [2,5,6,1,7,3,4]
    expect(partition(arr, 0, 6)).toBe(3)
    // [2,(5),{6},(1),7,{3},4] // swapping 5 - 1, 6 - 3
    // [2,1,3,(5),7,6,(4)]  // final swap 4 - 5
    expect( arr ).toEqual([2,1,3,4,7,6,5])
  })

  it('should partition part of the array, [1-5]', () => {
    var arr = [2,5,6,1,7,3,4]
    expect(partition(arr, 1, 5)).toBe(2)
    // [2,(5),6,(1),7,3,4]  // swapping 5 - 1
    // [2,1,(6),5,7,(3),4] // final swap 6 - 3
    expect( arr ).toEqual([2,1,3,5,7,6,4])
  })
})
