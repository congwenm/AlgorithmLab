import TTC from '../../../src/algorithms/minimax/tic_tac_toe'

const sdescribe = () => {}

fdescribe(TTC, () => {
  let ttc
  beforeEach(() => {
    ttc = new TTC
  })

  describe('setup', () => {
    it('should be a 3 x 3 array', () => {
      // ttc.view()
    })
  })

  describe('#moveOptions', () => {
    it('should return remaining open spaces', () => {
      expect(ttc.moveOptions.length).toBe(9)
      ttc.playerMove(0, 1)
      expect(ttc.moveOptions.length).toBe(8)
    })
  })

  fdescribe('#computerRespond', () => {
    it('should initially return center (1,1)', function() {
      ttc.computerRespond()
      // expect(ttc.moveOptions.length).toBe(7)
      // expect(ttc.board[1][1] != null).toBe(true)
    })
  })

  describe('#checkForVictory', () => {
    it('returns `x` if row match', () => {
      ttc.board[0][1] = 'x'
      ttc.board[1][1] = 'x'
      ttc.board[2][1] = 'x'
      expect(ttc.checkForVictory()).toBe('x')
    })

    it('returns `x` if col match', () => {
      ttc.board[0][0] = 'x'
      ttc.board[0][1] = 'x'
      ttc.board[0][2] = 'x'
      expect(ttc.checkForVictory()).toBe('x')
    })

    it('returns `x` if dia match', () => {
      ttc.board[0][0] = 'x'
      ttc.board[1][1] = 'x'
      ttc.board[2][2] = 'x'
      expect(ttc.checkForVictory()).toBe('x')
    })

    it('returns `o` if other player match', () => {
      ttc.board[0][1] = 'o'
      ttc.board[1][1] = 'o'
      ttc.board[2][1] = 'o'
      expect(ttc.checkForVictory()).toBe('o')
    })

    it('returns `null` if neither match', () => {
      expect(ttc.checkForVictory()).toBe(null)
    })
  })

  sdescribe('progression', () => {
    it('should evaluate a continuous game', () => {
      ttc.playerMove(1, 1)
      ttc.view()

      ttc.computerRespond()
      expect(ttc.moveOptions.length).toBe(7)
      ttc.view()

      ttc.playerMove(1, 0)
      ttc.view()
      ttc.computerRespond()
      ttc.view()
    })
  })
})
