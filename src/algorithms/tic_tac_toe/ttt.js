import TTTMMEval from './ttt_minimax_eval'
import Matrix from './matrix'

const getter = x => x

export default class TicTacToe {
  constructor() {
    this.board = new Matrix({ width: 3, height: 3 })
    this.currentPlayer = 'X' // assuming x moves first
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    TTTMMEval(this, move => this.computerMove(move))
  }

  computerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'O'
    this.checkForVictory()
  }

  playerMove(x, y) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'X'
    this.checkForVictory()
  }

  undoMove([x, y]) {
    if(this.board[x][y] == null) { throw new Error("Cannot undo a move thats not there")}
    this.board[x][y] = null
  }

  toString() { this.board.toString() }
  view() { console.log('Current Board:\n', this.board.toString()) }
}
