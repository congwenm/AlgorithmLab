// static evaluation for tic-tac-toe

// @param[board] - 2D array noting the x and y on the grid
// _|_|_
// _|_|_
//  |x|o
// should be something like board = [[,,][,,'X'],[,,'O']]


// determines the score by the number of winning combinations you(X) have left!
// const WINNING_CONDITION = [0, 1, 2].map(row =>
//   [0, 1, 2].map(col => )
// )
const xCanWin = triples => triples.every(p => p === 'x' || p == null)
const oCanWin = triples => triples.every(p => p === 'o' || p == null)

const aggregateOdds = (odds, triples) => {
  xCanWin(triples) && odds++
  oCanWin(triples) && odds--
  return odds
}

export const getRows = board => {
  var arr = Object.keys([...Array(board[0].length)]) // construct array of length = num of rows
    .map(i => [])

  board.forEach(xCol => {
    xCol.forEach(
      (coord, y) => arr[y].push(coord)
    )
  })

  return arr
}

export const xWinningOdds = rows =>
  rows.reduce( aggregateOdds, 0)


export default (board) => {
  if (!isValid(board)) {
    throw new Error('Cannot evaluate false board construction')
  }

  var colWinOdds = xWinningOdds(board)
  var rowWinOdds = xWinningOdds(getRows(board))
  var winByDiagonal = xWinningOdds([
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ])

  return colWinOdds + rowWinOdds + winByDiagonal
}

function isValid(board) {
  if (Array.isArray(board) && board.length === 3) {
    const deepValid = board.every(xCol => {
      return Array.isArray(xCol) && xCol.length === 3 && xCol.every(
        coord => coord == null || coord === 'x' || coord === 'o'
      )
    })

    if (deepValid) {
      return true
    }
  }
  return false
}