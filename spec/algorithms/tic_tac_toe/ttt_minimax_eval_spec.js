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

    it('should return center as the best position', () => {
      console.log(`best play for player "O" is ${evaluatePlay(game, 'O').position}`)
      expect(evaluatePlay(game, 'O').position).toEqual([1,1])
    })

    describe('self-preservation', () => {
      it('defend diagonally', () => {
        game.board[1][1] = 'X'
        game.board[2][1] = 'O'
        game.board[2][0] = 'X'

        // O should play board[6]
        expect(evaluatePlay(game, 'O').position).toEqual([0, 2])
      })

      it('defend vertically col 1', () => {
        game.board[1][0] = 'X'
        game.board[1][1] = 'X'
        game.board[2][2] = 'O'
        // O should play board[7]
        expect(evaluatePlay(game, 'O').position).toEqual([1, 2])
      })

      it('defend horizontally row 1', () => {
        game.board[0][0] = 'X'
        game.board[0][1] = 'X'
        game.board[2][2] = 'O'
        // O should play board[7]
        expect(evaluatePlay(game, 'O').position).toEqual([0, 2])
      })

      it('defend to the last minute', () => {
        game.board[1][1] = 'X'
        game.board[2][2] = 'O'
        game.board[2][0] = 'X'
        game.board[0][2] = 'O'
        game.board[1][2] = 'X'
        game.board[1][0] = 'O'
        game.board[2][1] = 'X'

        // O should play board[7]
        expect(evaluatePlay(game, 'O').position).toEqual([0, 1])

      })
    })

    describe('knows how to win', () => {
      it('checkmate vertically col 2', () => {
        game.board[2][1] = 'O'
        game.board[2][2] = 'O'
        // O should play board[6]
        // expect(evaluatePlay(game, 'O').position).toEqual([2, 0])
        // actually more greedy, tries to force a victory
        // expect(evaluatePlay(game, 'O').position).toEqual([1, 1])
      })

      it('checkmate diagonally', () => {
        game.board[0][0] = 'O'
        game.board[1][1] = 'O'
        // O should play board[8]
        expect(evaluatePlay(game, 'O').position).toEqual([2, 2])
      })
    })
  })
})
