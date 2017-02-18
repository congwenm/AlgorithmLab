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

}
