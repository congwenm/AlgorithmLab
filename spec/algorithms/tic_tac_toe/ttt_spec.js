import TTT from '../../../src/algorithms/tic_tac_toe/ttt'

describe(TTT, () => {
  let ttt
  beforeEach(() => ttt = new TTT )

  describe('#checkForVictory', () => {
    it('returns `x` if row match', () => {
      ttt.board[0][1] = 'X'
      ttt.board[1][1] = 'X'
      ttt.board[2][1] = 'X'
      expect(ttt.checkForVictory()).toBe('X')
    })

    it('returns `x` if col match', () => {
      ttt.board[0][0] = 'X'
      ttt.board[0][1] = 'X'
      ttt.board[0][2] = 'X'
      expect(ttt.checkForVictory()).toBe('X')
    })

    it('returns `x` if diagonal match', () => {
      ttt.board[0][0] = 'X'
      ttt.board[1][1] = 'X'
      ttt.board[2][2] = 'X'
      expect(ttt.checkForVictory()).toBe('X')
    })

    it('returns `o` if other player match', () => {
      ttt.board[0][1] = 'O'
      ttt.board[1][1] = 'O'
      ttt.board[2][1] = 'O'
      expect(ttt.checkForVictory()).toBe('O')
    })

    it('returns `null` if neither match', () => {
      expect(ttt.checkForVictory()).toBe(null)
    })
  })

  xdescribe('progression E2E', () => {
    it('should evaluate a continuous game', () => {
      ttt.playerMove(1, 1)
      ttt.view()

      ttt.computerRespond()
      expect(ttt.moveOptions.length).toBe(7)
      ttt.view()

      ttt.playerMove(1, 0)
      ttt.view()
      ttt.computerRespond()
      ttt.view()
    })
  })
})
