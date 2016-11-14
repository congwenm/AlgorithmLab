import UnionFind from '../../src/data_structures/union_find'
const { QuickFind, QuickUnion, WeightedQuickUnion } = UnionFind

// https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf

const shared_expectations = function(qf) {
  console.log('should verify items are connected by their id')
  expect(qf.find(3,4)).toBe(true) 

  console.log('should fail if items are not connected')
  expect(qf.find(4,5)).toBe(false)    
}

describe('QuickFind', () => {
  var qf;
  beforeEach(() => {
    qf = new QuickFind(10, [
      [3, 4],
      [4, 9],
      [8, 0],
      [2, 3],
      [5, 6]
      // at this point
      // 0 1 2 3 4 5 6 7 8 9 
      // 0 1 9 9 9 6 6 7 0 9 
    ])
  })
  it('shared_expectations', () => shared_expectations(qf))
  it('should be in this order', () => expect(qf.id).toEqual([0,1,9,9,9,6,6,7,0,9]) )
})

describe('QuickUnion', () => {
  var qu;
  beforeEach(() => {
    qu = new QuickUnion(10, [
      [3, 4],
      [4, 9],
      [8, 0],
      [2, 3],
      [5, 6]
      // at this point
      // 0 1 2 3 4 5 6 7 8 9 
      // 0 1 9 4 9 6 6 7 0 9
    ])
  })
  it('shared_expectations', () => shared_expectations(qu))
  it('should be in this order', () => expect(qu.id).toEqual([0,1,9,4,9,6,6,7,0,9]) )
})

describe('WeightedQuickUnion', () => {
  var wqu;
  beforeEach(() => {
    wqu = new WeightedQuickUnion(10, [
      [3, 4],
      [4, 9],
      [8, 0],
      [2, 3],
      [5, 6]
      // at this point
      // 0 1 2 3 4 5 6 7 8 9 
      // 8 1 3 3 3 5 5 7 8 3 
    ])
  })
  it('shared_expectations', () => shared_expectations(wqu))
  it('should be in this order', () => expect(wqu.id).toEqual([8,1,3,3,3,5,5,7,8,3]) )
})