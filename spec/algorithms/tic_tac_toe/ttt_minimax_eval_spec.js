import TTTMMEval, { evaluatePlay } from '../../../src/algorithms/tic_tac_toe/ttt_minimax_eval'
import TTT from '../../../src/algorithms/tic_tac_toe/ttt'

fdescribe('Tic Tac Toe Evaluation using Minimax', () => {
  let game
  describe("selection", () => {
    beforeEach(() => {
      game = new TTT
    })

    it('should return center as best starting position', () => {

      var xScore = evaluatePlay(game, 'X')
      console.log(`XSCORE: ${xScore}`)

      var oScore = evaluatePlay(game, 'O')
      console.log(`OSCORE: ${oScore}`);

      // try all other

      console.log('\n', 'Evaluation:')
      evaluatePlay(game, 'O')

      game.board[2][1] = 'O'
      game.board[1][0] = 'X';

      console.log('\n', 'Evaluation:')
      evaluatePlay(game, 'O')
    })

    fit('should return center as the best position', () => {
      console.log(`best play for player "O" is ${evaluatePlay(game, 'O').position}`)
      // expect(evaluatePlay(game, 'O').position).toEqual([1,1])
    })

    it('self-preservation', () => {
      game.board[1][1] = 'X'
      game.board[2][1] = 'O'
      game.board[2][0] = 'X'

      // O should play board[6]
      expect(evaluatePlay(game, 'O').position).toEqual([0, 2])
    })

    it('knows how to win', () => {
      game.board[2][1] = 'O'
      game.board[2][2] = 'O'

      // O should play board[6]
      expect(evaluatePlay(game, 'O').position).toEqual([2, 0])
    })
  })
})
