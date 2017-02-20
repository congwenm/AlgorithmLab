import TTT from '../../../src/algorithms/tic_tac_toe/ttt'

describe(TTT, () => {
  let ttt
  beforeEach(() => ttt = new TTT )
  
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
