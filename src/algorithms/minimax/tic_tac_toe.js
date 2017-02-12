import TTCEval from './tic_tac_toe_evaluation'
import Matrix from './matrix'

const filterExist = x => x

const hasSameLength = (result, { length }) => {
  result = typeof result === 'number' ? result : length
  return result
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

  computerMove(x, y) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'o'
    this.checkForVictory()
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    let moveOptions = this.moveOptions

    // weighs the remaining options
    moveOptions = moveOptions.map(
      move => {
        let weight
        const [x, y] = move
        this.computerMove(x, y)
        weight = TTCEval(this.board)
        this.board[x][y] = null
        return { weight, move }
      })

    // pick best option
    var bestOption = moveOptions.reduce((max, move) => {
      return max.weight < move.weight ?  move : max
    }, moveOptions[0])

    // make the move
    this.computerMove(...bestOption.move)
  }

  get moveOptions() {
    debugger
    return [].concat(
      ...this.board.map((xCol, x) => {
        return xCol.map((coord, y) => !coord && [x, y]).filter(filterExist)
      })
    )
  }

  toString() {
    this.board.toString();
  }
}
