import TTC from '../../../src/algorithms/minimax/tic_tac_toe'

fdescribe(TTC, () => {
  let ttc
  beforeEach(() => {
    ttc = new TTC
  })

  describe('setup', () => {
    it('should be a 3 x 3 array', () => {
      ttc.view()
    })
  })

  describe('progression', () => {
    it('should evaluate a continuous game', () => {


      ttc.playerMove(1, 1)
    })
  })
})
