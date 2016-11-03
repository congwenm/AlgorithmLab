import surgeonkit from 'surgeonkit';
import paullewisQuickSort, { partition } from '../../../algorithms/implementations/paullewis_quick_sort';
import { ascendingVerifier } from '../../order_verifier';

var scrambledNumbers = [5,1,2,3,4];
describe('#paullewisQuickSort', () => {
  it ('should sort numbers', () => {
    expect(paullewisQuickSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(ascendingVerifier(
      paullewisQuickSort(
        surgeonkit.expand(20).map(n => (Math.random() * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort 1,000 numbers', () => {
    expect(ascendingVerifier(
      paullewisQuickSort(
        surgeonkit.expand(1000).map(n => (Math.random() * 1000) | 0)
      )
    )).toBe(true)
  })

  it('should sort 100,000 numbers', () => {
    expect(ascendingVerifier(
      paullewisQuickSort(
        surgeonkit.expand(100 * 1000).map(n => (Math.random() * 1000 * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort 1,000,000 numbers', () => {
    expect(ascendingVerifier(
      paullewisQuickSort(
        surgeonkit.expand(1000 * 1000).map(n => (Math.random() * 1000 * 1000) | 0)
      )
    )).toBe(true)
  })

  it('should sort objects based on key', () => {
    // copy out of the other one
  })
})