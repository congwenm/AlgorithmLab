const expand = (num) => Object.keys([...new Array(num)])

export default class Matrix extends Array {
  constructor({ width, height }) {
    super(...expand(width).map(colX => {
      return expand(height).map(coord => null) // which is a column
    }))
  }

  static from($2dArray) {
    const [width, height] = [$2dArray.length, $2dArray[0].length]
    const inst = new this({ width, height })

    $2dArray.forEach((xCol, x) =>
      // inserting values into the inst
      xCol.forEach((coord, y) => inst[x][y] = coord)
    )
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

  get all() {
    return this.reduce((coll, xCol, x) =>
      coll.concat(
        xCol.map((coord, y) => (
          { coord, position: [x, y] }
        ))
      ),
      []
    )
  }

  get vacant() {
    return this.all.filter(({ coord }) => coord == null)
  }
}


// use as [1,2,3,2].reduce(uniq, [])
const uniq = (set, next) => {
  !set.includes(next) && set.push(next)
  return set
}

const hasWinner = triples => {
  var unique = triples.reduce(uniq, [])
  if (unique.length === 1) {
    if (unique[0] === 'X') return 'X'
    if (unique[0] === 'O') return 'O'
  }
  return null
}

export class Board extends Matrix {
  constructor(args) {
    super(args)
  }

  checkForVictory() {
    const { board } = this
    var colWins = this.map(hasWinner)
    var rowWins = this.getRows().map(hasWinner)
    var diagWins = [
      [this[0][0], this[1][1], this[2][2]],
      [this[2][0], this[1][1], this[0][2]]
    ].map(hasWinner)
    // console.log("CHECKFORVICTORY", colWins, rowWins, diagWins)
    return [...colWins, ...rowWins, ...diagWins].filter(x => x)[0] || null
  }
}
