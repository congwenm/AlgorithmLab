// static evaluation for tic-tac-toe

// @param[board] - 2D array noting the x and y on the grid
// _|_|_
// _|_|_
//  |x|o
// should be something like board = [[,,][,,'X'],[,,'O']]



const scoreTriples = (playerPiece) => {
  var opponentPiece = playerPiece === 'X' ? 'O' : 'X';
  return triples => {
    var friendlies = triples.filter( coord => coord === playerPiece ).length
    var foes = triples.filter( coord => coord === opponentPiece ).length
    if (friendlies === 0 && foes === 0) {
      return 0
    }
    if (friendlies === 0) {
      return -(Math.pow(10, foes))
    }
    else if (foes === 0) {
      return Math.pow(10, friendlies)
    }
    else {
      return 0
    }
  }
}


import Matrix from './matrix'

// @params player - 'X' or 'O'
const evaluateBoard = (board, player) => {
  if (!isValid(board)) { throw new Error('Cannot evaluate false board construction') }

  if (!(board instanceof Matrix)) {
    board = Matrix.from(board)
  }

  var colWinScore = board.map(scoreTriples(player))
    .reduce((sum, val) => sum + val, 0);

  var rowWinScore = board.getRows().map(scoreTriples(player))
    .reduce((sum, val) => sum + val, 0);

  var diagWinScore = ([
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ]).map(scoreTriples(player))
    .reduce((sum, val) => sum + val, 0);

  // console.log('evaluation: ', colWinScore, rowWinScore, diagWinScore)
  return colWinScore + rowWinScore + diagWinScore
}

export default evaluateBoard

export const evaluatePlay = (board, player) => {
  var best = { position: null, score: -Infinity }
  board.vacant.forEach(({ coord, position, position: [x, y] }) => {
    // debugger
    board[x][y] = player
    var score = evaluateBoard(board, player)
    // console.log(`Position ${position} yield a score of ${score}`)
    if(score > best.score) {
      best = { position, score }
    }
    board[x][y] = null
  })
  debugger;
  return best;
}

function isValid(board) {
  if (Array.isArray(board) && board.length === 3) {
    const deepValid = board.every(xCol => {
      return Array.isArray(xCol) && xCol.length === 3 && xCol.every(
        coord => coord == null || coord === 'X' || coord === 'O'
      )
    })

    if (deepValid) {
      return true
    }
  }
  return false
}
