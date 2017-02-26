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

const makeSet = arr => arr.reduce((obj, item) => {
  obj[item] = obj[item] + 1
  return obj;
}, { X: 0, O: 0 })

const VALUE_MAP = [
  [1, 10, 100, 1000], // X = 0
  [-10, 0, 0, 0], // X = 1
  [-100, 0, 0, 0], // X = 2
  [-1000, 0, 0, 0] // X = 3
]
//   O: [
//     [1, 10, 100, 1000], // X = 0
//     [-10, 0, 0, 0], // X = 1
//     [-100, 0, 0, 0], // X = 2
//     [-1000, 0, 0, 0] // X = 3
//   ]
// }

export const scoreTripletsByDepth = (depth, player) =>
  (sum, triplets) => {
    const VERSION = 1
    var { X, O } = makeSet(triplets)

    switch(VERSION) {
      case 1: {
        // if (depth === 2 && X === 3) {
        //   return 10000
        // }
        return sum += VALUE_MAP[X][O]
      }
      case 2: {
        if (X === 3 && O === 0)      return -1000
        else if (X === 0 && O === 3) return 1000
        else                         return 1
      }
    }
  }

// @params depth - use this figure out if the current turn you can achive kill without an hassle
export function evalModel(board, player, depth) {
  const rows = board.getRows()
  const cols = board
  const diags = [
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ]

  return [...rows, ...cols, ...diags].reduce(scoreTripletsByDepth(depth, player), 0)
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
        // debugger
        move.value = this.alphaBeta(1, -Infinity, Infinity, { isMax: false }) // generate alphabeta options for hypothetic player.
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
    console.log(`BEST MOVE FOR THE FOLLOWING IS: ${bestMove.position}`)
    console.log(this.board.toString())

    return bestMove
  }

  alphaBeta (...args) {
    var [depth, alpha, beta, { isMax }] = args
    console.log(`CALLING alphabeta with Depth ${depth}:`, args.slice(1))
    this.game.view()
    // return evaluation if reaching leaf node or any side won
    if (depth == 0 || this.game.checkForEndGame() !== null) {
      return evalModel(this.game.board, 'O', depth)
    }
    var moveOptions = this.board.vacant // regardless of max or minimum

    // synchronized stuff, use find to be able to `prune`
    moveOptions.find(move => {
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
