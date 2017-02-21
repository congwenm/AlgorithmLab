import { evaluateBoard } from './first_ttt_eval'

const getter = value => value

// used to benchmark
class Benchmarker {
  constructor() { this.start = process.hrtime() }
  end() {
    this.diff = process.hrtime(this.start)
    return this.result
  }
  get result() { `Algorithm of #mmSearch took ${this.diff[0]}.${this.diff[1]}`}
}

export function evalModel(board, player) {
  // return evaluateBoard(board, player)

  // simpler
  const possibleWin = piece => piece == null || piece == player
  var rowWins = board.getRows().map(
    row => row.every(possibleWin)
  )
  var colWins = board.map(
    col => col.every(possibleWin)
  )
  var diagWins = [
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ].map(diag => diag.every(possibleWin))
  
  return [...rowWins, ...colWins, ...diagWins].filter(getter).length
}

export function evaluatePlay (game, player) {
  var move
  new TTTMinimax({ game, player }).respond(m => move = m)
  return move
}

export default class TTTMinimax {
  constructor({ game, player }) {
    this.game = game
    this.board = game.board
    this.player = player
  }

  respond(callback) {
    var bestMove = this.search()
    // make the move
    callback(bestMove)
  }

  search() {
    const benchmarker = new Benchmarker
    // get all moves
    let moveOptions = this.board.vacant // ({ max: true })

    let bestMove = null

    // weighs the remaining options
    moveOptions.forEach(
      (move) => {
        // make a move
        this.game.computerMove(move.position) // computer move, compueter is Max

        // evaluate and assign to move, determine whether or not to do statical evaluation
        debugger
        move.value = this.alphaBeta(2, -Infinity, Infinity, { isMax: false }) // generate alphabeta options for hypothetic player.
        console.log(this.game.view())

        if (bestMove == null || move.value >= bestMove.value) {
          bestMove = move
        }

        // revert move
        this.game.undoMove(move.position)
      })

    // time the algorithm
    benchmarker.end()
    console.log(`ALL SCORES: \n ${moveOptions.map(m => `${m.position}: ${m.value}`).join('\n')}`)
    console.log(`BEST MOVE IS: ${bestMove}`)

    return bestMove
  }

  alphaBeta (depth, alpha, beta, { isMax }) {
    console.log('CALLING `alphabeta` with ', arguments)
    this.game.view()
    // return evaluation if reaching leaf node or any side won
    if (depth == 0 || this.board.checkForVictory() !== null) {
      return evalModel(this.game.board, 'O')
    }
    var moveOptions = this.board.vacant // regardless of max or minimum

    // synchronized stuff, use find to be able to `prune`
    moveOptions.find(move => {
      var temp = null
      // make the move, w/e the player?
      this.game[isMax ? 'computerMove' : 'playerMove'](move.position)
      const finalBeta = beta
      const finalAlpha = alpha
      const finalDepth = depth
      if (depth == 2) {
        if (isMax) {
          alpha = Math.max(finalAlpha, this.alphaBeta(finalDepth-1, finalAlpha, finalBeta, { isMax: false }))
        }
        else { // isMin
          beta = Math.min(finalBeta, this.alphaBeta(finalDepth-1, finalAlpha, finalBeta, { isMax: true }))
        }
      }
      else {
        if (isMax) {
          alpha = Math.max(alpha, this.alphaBeta(depth-1, alpha, beta, { isMax: false }))
        }
        else { //isMin
          beta = Math.min(beta, this.alphaBeta(depth-1, alpha, beta, { isMax: true }))
        }
      }

      // move the w/e piece back
      this.game.undoMove(move.position)

      // cut-off, `prune`, no need to go down further, there's no answer here
      if (beta <= alpha) return true;
    })

    console.log("EVALUATED VALUE OF " + (isMax ? alpha : beta))
    return isMax ? alpha : beta
  }
}
