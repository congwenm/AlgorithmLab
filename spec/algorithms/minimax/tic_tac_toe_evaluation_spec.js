import TTTEval, { xWinningOdds, getRows } from '../../../src/algorithms/minimax/tic_tac_toe_evaluation'

describe(TTTEval, () => {
  it('should validate isValid', () => {
    expect(() => TTTEval([1,])).toThrow()
    expect(() => TTTEval([[], [], []])).toThrow()

    expect(() => TTTEval([
      [,,,], [,,,], [,,1]
    ])).toThrow()

    expect(() => TTTEval([
      [,,,], [,,,], [,,,]
    ])).not.toThrow()

    expect(() => TTTEval([
      [,,,], [,,,], [,,'x']
    ])).not.toThrow()
  })

  describe('should score player `x`', () => {
    let board = [
      // each is a row
      [,,,],
      [,'x',,],
      [,,,]
    ]

    describe('helper xWinningOdds()', () => {
      it('should return # of rows of xCanWin - oCanWin', () => {
        var nul = null;
        expect(xWinningOdds([
          ['x', nul, 'o'],
          ['x', nul, nul],
          [nul, nul, 'o'],
          [nul, 'x', 'x'],
          ['x', 'x', 'o']
        ])).toBe(1)
      })
    })

    describe('helper getRows()', () => {
      it('should return yRows intead of xCols', () => {
        expect(getRows([
          [1, 2], // col 1
          [3, 4]  // col 2
        ])).toEqual([
          [1, 3],
          [2, 4]
        ])

        expect(getRows([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ])).toEqual([
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9]
        ])
      })
    })

    it('should calculate score of `x`', () => {
      expect(TTTEval(board)).toBe(4)

      board[2][1] = 'o'
      expect(TTTEval(board)).toBe(2)

      board[2][0] = 'x'
      console.log("BOARD", board)
      expect(TTTEval(board)).toBe(4)
    })
  })
})
