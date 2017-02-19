import TTTMMEval from './ttt_minimax_eval'
import Matrix from './matrix'

const getter = x => x

// use as [1,2,3,2].reduce(uniq, [])
const uniq = (set, next) => {
  !set.includes(next) && set.push(next)
  return set
}

const hasWinner = triples => {
  var unique = triples.reduce(uniq, [])
  if (unique.length === 1) {
    if (unique[0] === 'X') return 'X'
    if (unique[0] === 'O') return 'O'
  }
  return null
}

export default class TicTacToe {
  constructor() {
    this.board = new Matrix({ width: 3, height: 3 })
    this.currentPlayer = 'X' // assuming x moves first
  }

  checkForVictory() {
    const { board } = this
    var colWins = board.map(hasWinner)
    var rowWins = board.getRows().map(hasWinner)
    var diagWins = [
      [board[0][0], board[1][1], board[2][2]],
      [board[2][0], board[1][1], board[0][2]]
    ].map(hasWinner)
    // console.log("CHECKFORVICTORY", colWins, rowWins, diagWins)
    return [...colWins, ...rowWins, ...diagWins].filter(x => x)[0] || null
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    this.mmSearch(this, move => this.computerMove(move))
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
