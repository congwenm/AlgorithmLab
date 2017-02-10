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
export default (board) => {
  if (!isValid(board)) {
    throw new Error('Cannot evaluate false board construction')
  }

  var winByCol = board.map((xCol, x) =>
    xCol.every(
      (coord, y) => coord === 'x' || coord == null
    )
  )
  var winByRow = board.map((xCol, x) =>
    1
  )
  var winByDiagonal

  var winningCombination = [...winByCol, ...winByRow, ...winByDiagonal]
  // measure
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
