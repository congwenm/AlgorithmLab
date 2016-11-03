import surgeonkit from 'surgeonkit';
import selectionSort from '../../algorithms/selection_sort';
import { ascendingVerifier } from '../order_verifier';

var scrambledNumbers = [5,1,2,3,4];
describe('#selectionSort', () => {
  it ('should sort numbers', () => {
    expect(selectionSort(scrambledNumbers)).toEqual([1,2,3,4,5])
  })

  it('should sort 100 numbers', () => {
    expect(ascendingVerifier(
      selectionSort(
        surgeonkit.expand(20).map(n => (Math.random() * 100) | 0)
      )
    )).toBe(true)
  })

  it('should sort objects based on key', () => {
    // copy out of the other one
  })
})
