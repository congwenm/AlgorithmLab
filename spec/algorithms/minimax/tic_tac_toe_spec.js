import TTC from '../../../src/algorithms/minimax/tic_tac_toe'

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

  describe('progression', () => {
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
