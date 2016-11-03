import surgeonkit from 'surgeonkit';
import insertionSort from '../../algorithms/insertion_sort';
import { ascendingVerifier } from '../order_verifier';

var scrambledNumbers = [4,1,2,3,5];
describe('#insertionSort', () => {
  it ('should sort numbers', () => {
    expect(insertionSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(ascendingVerifier(
      insertionSort(
        surgeonkit.expand(20).map(n => (Math.random() * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort 1,000 numbers', () => {
    expect(ascendingVerifier(
      insertionSort(
        surgeonkit.expand(1000).map(n => (Math.random() * 1000) | 0)
      )
    )).toBe(true)
  })

  it('should sort objects based on key', () => {
    // copy out of the other one
  })
})
