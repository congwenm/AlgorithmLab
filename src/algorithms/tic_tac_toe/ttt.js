import TTTMinimax from './ttt_minimax_eval'
import Matrix, { Board } from './matrix'

const getter = x => x

export default class TicTacToe {
  constructor() {
    this.board = new Board({ width: 3, height: 3 })
    this.currentPlayer = 'X' // assuming x moves first
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    new TTTMinimax({
      game: this,
      player: 'O'
    }).respond(move => this.computerMove(move))
  }

  computerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'O'
  }

  playerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'X'
  }

  undoMove([x, y]) {
    if(this.board[x][y] == null) { throw new Error("Cannot undo a move thats not there")}
    this.board[x][y] = null
  }

  toString() { this.board.toString() }
  view() { console.log('Current Board:\n', this.board.toString()) }
}
