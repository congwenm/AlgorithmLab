import TTTEval from '../../../src/algorithms/minimax/tic_tac_toe_evaluation'

fdescribe(TTTEval, () => {
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

    it('should calculate score of `x`', () => {
      expect(TTTEval(board)).toBe(4)
    })
  })
})
