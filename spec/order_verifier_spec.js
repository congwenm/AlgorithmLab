import {ascendingVerifier, descendingVerifier} from './order_verifier' 

describe('ascending verifier', () => {
  it('should return `true` all next items are greater than previous', function() {
    expect(ascendingVerifier([1,2,3,4,5,6,7,8,9])).toBe(true)
  })

  it('should return `false` if next item is NOT greater than previous', function() {
    expect(ascendingVerifier([2,1,3,4,5,6,7,8,9])).toBe(false)
  })
})

describe('ascending verifier', () => {
  it('should return `true` all next items are less than previous', function() {
    expect(descendingVerifier([9,8,7,6,5,4,3,2,1])).toBe(true)
  })

  it('should return `false` if next item is NOT less than previous', function() {
    expect(descendingVerifier([9,8,7,6,5,4,3,1,2])).toBe(false)
  })
})