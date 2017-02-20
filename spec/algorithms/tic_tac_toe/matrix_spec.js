import Matrix, { Board } from '../../../src/algorithms/tic_tac_toe/matrix'

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

describe(Board, () => {
  describe('#checkForVictory', () => {
    var board
    beforeEach(() => {
      board = new Board({ width: 3, height: 3 })
    })

    it('returns `x` if row match', () => {
      board[0][1] = 'X'
      board[1][1] = 'X'
      board[2][1] = 'X'
      expect(board.checkForVictory()).toBe('X')
    })

    it('returns `x` if col match', () => {
      board[0][0] = 'X'
      board[0][1] = 'X'
      board[0][2] = 'X'
      expect(board.checkForVictory()).toBe('X')
    })

    it('returns `x` if diagonal match', () => {
      board[0][0] = 'X'
      board[1][1] = 'X'
      board[2][2] = 'X'
      expect(board.checkForVictory()).toBe('X')
    })

    it('returns `o` if other player match', () => {
      board[0][1] = 'O'
      board[1][1] = 'O'
      board[2][1] = 'O'
      expect(board.checkForVictory()).toBe('O')
    })

    it('returns `null` if neither match', () => {
      expect(board.checkForVictory()).toBe(null)
    })
  })
})
