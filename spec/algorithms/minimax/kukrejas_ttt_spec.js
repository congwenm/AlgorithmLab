import TTC, { evaluatePosition } from '../../../src/algorithms/minimax/kukrejas_ttt'

const getter = value => value

describe("#evaluatePosition", () => {
  let board = [
    null, null, null,
    null, 'X',    null,
    null, null, null
  ]

  it('should return 4 for the center piece', () => {

    var xScore = evaluatePosition(board, 'X')
    console.log(`XSCORE: ${xScore}`)

    var oScore = evaluatePosition(board, 'O')
    console.log(`OSCORE: ${oScore}`);

    // try all other

    console.log('\n', 'Evaluation:')
    board.map((v,k) => v === null && k).filter(getter).map(num => {
      board[num] = 'O'
      oScore = evaluatePosition(board, 'O')
      console.log(`Position ${num} yield a score of ${oScore}`)

      board[num] = null
    })

    board[5] = 'O'
    board[2] = 'X';

    console.log('\n', 'Evaluation:')
    board.map((v,k) => v === null && k).filter(getter).map(num => {
      board[num] = 'O'
      oScore = evaluatePosition(board, 'O')
      console.log(`Position ${num} yield a score of ${oScore}`)

      board[num] = null
    })
  })
})
