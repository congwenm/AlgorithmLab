import TTT from '../../../src/algorithms/tic_tac_toe/ttt'

const sdescribe = () => {}

describe(TTT, () => {
  let ttt
  beforeEach(() => {
    ttt = new TTT
  })

  describe('setup', () => {
    it('should be a 3 x 3 array', () => {
      // ttt.view()
    })
  })

  describe('#moveOptions', () => {
    it('should return remaining open spaces', () => {
      expect(ttt.moveOptions.length).toBe(9)
      ttt.playerMove(0, 1)
      expect(ttt.moveOptions.length).toBe(8)
    })
  })

  describe('#computerRespond', () => {
    it('should initially return center (1,1)', function() {
      ttt.computerRespond()
      // expect(ttt.moveOptions.length).toBe(7)
      // expect(ttt.board[1][1] != null).toBe(true)
    })
  })

  describe('#checkForVictory', () => {
    it('returns `x` if row match', () => {
      ttt.board[0][1] = 'x'
      ttt.board[1][1] = 'x'
      ttt.board[2][1] = 'x'
      expect(ttt.checkForVictory()).toBe('x')
    })

    it('returns `x` if col match', () => {
      ttt.board[0][0] = 'x'
      ttt.board[0][1] = 'x'
      ttt.board[0][2] = 'x'
      expect(ttt.checkForVictory()).toBe('x')
    })

    it('returns `x` if dia match', () => {
      ttt.board[0][0] = 'x'
      ttt.board[1][1] = 'x'
      ttt.board[2][2] = 'x'
      expect(ttt.checkForVictory()).toBe('x')
    })

    it('returns `o` if other player match', () => {
      ttt.board[0][1] = 'o'
      ttt.board[1][1] = 'o'
      ttt.board[2][1] = 'o'
      expect(ttt.checkForVictory()).toBe('o')
    })

    it('returns `null` if neither match', () => {
      expect(ttt.checkForVictory()).toBe(null)
    })
  })

  sdescribe('progression', () => {
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
