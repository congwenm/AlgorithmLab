import Board from '../../src/tic_tac_toe/board'

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
