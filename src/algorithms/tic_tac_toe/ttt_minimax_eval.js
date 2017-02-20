// used to benchmark
class Benchmarker {
  constructor() { this.start = process.hrtime() }
  end() {
    this.diff = process.hrtime(this.start)
    return this.result
  }
  get result() { `Algorithm of #mmSearch took ${this.diff[0]}.${this.diff[1]}`}
}



export default class TTTEval {
  constructor(board, player) {
    this.board = board
    this.player = player
  }

  mmSearch(tttGame, callback) {
    const benchmarker = new Benchmarker
    // get all moves
    let moveOptions = tttGame.vacant // ({ max: true })

    let bestMove = null

    // weighs the remaining options
    moveOptions.forEach(
      move => {
        // make a move
        tttGame.computerMove(move) // computer move, compueter is Max

        // evaluate and assign to move, determine whether or not to do statical evaluation
        move.value = this.alphaBeta(9, -Infinity, Infinity, { isMax: false }) // generate alphabeta options for hypothetic player.

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
    // return evaluation if reaching leaf node or any side won
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

}


export const evaluatePlay = (board, player) => {
  return { position: 1 }
}
