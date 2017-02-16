import TTCEval from './tic_tac_toe_evaluation'
import Matrix from './matrix'

const filterExist = x => x

const hasSameLength = (result, { length }) => {
  result = typeof result === 'number' ? result : length
  return result
}

class Benchmarker {
  constructor() { this.start = process.hrtime() }
  end() {
    this.diff = process.hrtime(this.start)
    return this.result
  }
  get result() { `Algorithm of #mmSearch took ${this.diff[0]}.${this.diff[1]}`}
}

export default class TicTacToe {
  constructor() {
    this.board = new Matrix({ width: 3, height: 3 })
  }

  view() {
    console.log('Current Board:')
    // console.log(this.board)
    console.log(this.board.toString())
  }

  playerMove(x, y) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'x'
    this.checkForVictory()
  }

  checkForVictory() {
    this.board
  }

  computerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'o'
    this.checkForVictory()
  }
  undoMove([x, y]) {
    if(this.board[x][y] == null) { throw new Error("Cannot undo a move thats not there")}
    this.board[x][y] = null
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    this.mmSearch(this, move => this.computerMove(move))
  }

  get moveOptions() {
    return [].concat(
      ...this.board.map((xCol, x) => {
        return xCol.map((coord, y) => !coord && [x, y]).filter(filterExist)
      })
    )
  }

  mmSearch(ttcGame, callback) {
    const benchmarker = new Benchmarker
    // get all moves
    let moveOptions = ttcGame.moveOptions // ({ max: true })

    let bestMove = null

    // weighs the remaining options
    moveOptions.forEach(
      move => {
        // make a move
        ttcGame.computerMove(move)

        // evaluate and assign to move, determine whether or not to do statical evaluation
        move.value = this.alphaBeta(9, -Infinity, Infinity, { isMax: false })

        if (bestMove == null || move.value >= bestMove.value) {
          bestMove = move
        }

        // revert move
        this.undoMove(move)
      })

    // time the algorithm
    benchmarker.end()

    // make the move
    callback(bestMove)
  }

  alphaBeta (depth, alpha, beta, { isMax }) {
    // return evaluation if reaching leaf nod eor any side won
    if (depth == 0 || this.checkForVictory() !== null) {
      return TTCEval(this.board)
    }
    var moveOptions = this.moveOptions(isMax)

    // synchronized stuff, use find to be able to stop the loop
    moveOptions.find(move => {
      var temp = null
      // make the move, w/e the player?
      if (depth == 2) {
        if (isMax) {
          alpha = Math.max(alpha, this.alphaBeta(depth-1, alpha, beta, { isMax: false }))
        }
        else { // isMin
          beta = Math.min(finalBeta, alphaBeta(depth-1, alpha, beta, { isMax: true }))
        }
      }
      else {
        if (isMax) {
          alpha = Math.max(alpha, alphaBeta(depth-1, alpha, beta, { isMax: false }))
        }
        else { //isMin
          beta = Math.min(beta, alphaBeta(depth-1, alpha, beta, { isMax: true }))
        }
      }

      // move the w/e piece back
      // this.undoMoveWEPiece

      // cut-off, no need to go down further, there's no answer here
      if (beta <= alpha) return true;
    })
    return isMax ? alpha : beta
  }


  toString() {
    this.board.toString();
  }
}
