import TTTMinimax from './ttt_minimax_eval'
import Board from './board'

const getter = x => x

export default class TicTacToe {
  constructor() {
    this.board = new Board({ width: 3, height: 3 })
    this.currentPlayer = 'X' // assuming x moves first
    this.winner = null
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    new TTTMinimax({
      game: this,
      player: 'O'
    }).respond(move => this.computerMove(move.position))
  }

  computerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'O'
    this.checkForEndGame()
  }

  playerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'X'
    this.checkForEndGame()
  }

  undoMove([x, y]) {
    if(this.board[x][y] == null) { throw new Error("Cannot undo a move thats not there")}
    this.board[x][y] = null
  }

  checkForEndGame() {
    this.winner = this.board.checkForVictory();
    if (this.board.vacant.length === 0 && !this.winner) {
      this.winner = "NO ONE"
    }
    return this.winner
  }

  get hasEnded() { return !!this.winner }

  toString() { this.board.toString() }
  view() { this.board.view() }
}
