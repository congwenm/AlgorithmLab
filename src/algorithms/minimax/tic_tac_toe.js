import TTCEval from './tic_tac_toe_evaluation'

const expand = (num) => Object.keys([...new Array(num)])


const hasSameLength = (result, subArr) => {
  if (result === undefined) {
    result = subArr.length
  }

  return result
}

export class Matrix extends Array {
  constructor({ width, height }) {
    super(...expand(width).map(colX => {
      return expand(height).map(coord => null) // which is a column
    }))
  }

  static from($2dArray) {
    const width = $2dArray.length
    const height = $2dArray[0].length
    const inst = new this({ width, height })

    $2dArray.forEach((xCol, x) => {
      xCol.forEach(
        (coord, y) => inst[x][y] = coord // inserting values into the inst
      )
    })
    return inst
  }

  toString() {
    return [
      '',
      ...this.getRows().map(
        yRow => yRow.map(coord => coord || '_').join(' ')
      ),
      ''
    ].join('\n')
  }

  getRows () {
    var arr = Object.keys([...Array(this[0].length)]) // construct array of length = num of rows
      .map(i => [])

    this.forEach(xCol => {
      xCol.forEach(
        (coord, y) => arr[y].push(coord)
      )
    })

    return arr
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

  toString() {
    this.board.toString();
  }
}
