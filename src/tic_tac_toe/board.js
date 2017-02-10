import Matrix from '../data_structures/matrix'

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

export default class Board extends Matrix {
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

  view() {
    // console.log('Current Board:\n', this.toString())
  }
}
