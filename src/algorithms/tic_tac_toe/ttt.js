import TTTEval from './ttt_eval'
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

// use as [1,2,3,2].reduce(uniq, [])
const uniq = (set, next) => (!set.includes(next) && set.push(next), set)

const hasWinner = triples => {
  var unique = triples.reduce(uniq, [])
  if (unique.length === 1) {
    if (unique[0] === 'x') return 'x'
    if (unique[0] === 'o') return 'o'
    return null
  }
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

  mmSearch(tttGame, callback) {
    const benchmarker = new Benchmarker
    // get all moves
    let moveOptions = tttGame.moveOptions // ({ max: true })

    let bestMove = null

    // weighs the remaining options
    moveOptions.forEach(
      move => {
        // make a move
        tttGame.computerMove(move)

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
    console.log(`ALL SCORES: \n ${moveOptions.map(m => `${m}${m.value}`).join('\n')}`)
    console.log(`BEST MOVE IS: ${bestMove}`)
    // make the move
    callback(bestMove)
  }

  alphaBeta (depth, alpha, beta, { isMax }) {
    // return evaluation if reaching leaf nod eor any side won
    if (depth == 0 || this.checkForVictory() !== null) {
      return TTTEval(this.board)
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
    console.log("EVALUATED VALUE OF " + (isMax ? alpha : beta))
    return isMax ? alpha : beta
  }


  toString() {
    this.board.toString();
  }
}
