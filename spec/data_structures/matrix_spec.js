import Matrix from '../../src/data_structures/matrix'

describe(Matrix, () => {
  describe('getRows()', () => {
    it('should return yRows intead of xCols', () => {
      expect(Matrix.from([
        [1, 2], // col 1
        [3, 4]  // col 2
      ]).getRows()).toEqual([
        [1, 3],
        [2, 4]
      ])

      expect(Matrix.from([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]).getRows()).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
      ])
    })
  })
})
