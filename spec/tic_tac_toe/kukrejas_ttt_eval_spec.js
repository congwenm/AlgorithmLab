import TTT, { evaluateBoard, evaluatePlay } from '../../src/tic_tac_toe/kukrejas_ttt_eval'

const getter = value => value

describe("#evaluateBoard", () => {
  let board

  beforeEach(() => {
    board = [
      null, null, null,
      null, null, null,
      null, null, null
    ]
  })

  it('should return center as the best position', () => {
    evaluateBoard(board, 'X')
    // console.log(`best play for player "O" is ${evaluatePlay(board, 'O').position}`)
    expect(evaluatePlay(board, 'O').position).toBe(4)
  })

  it('should return correct ranking of all options', () => {
    board[4] = 'X';
    var xScore = evaluateBoard(board, 'X')
    // console.log(`XSCORE: ${xScore}`)

    var oScore = evaluateBoard(board, 'O')
    // console.log(`OSCORE: ${oScore}`);

    // try all other options
    // console.log('\n', 'Evaluation:')
    // console.log(`best play for player "O" is ${evaluatePlay(board, 'O').position}`)

    board[5] = 'O'
    board[2] = 'X';

    // console.log('\n', 'Evaluation:')
    evaluatePlay(board, 'O')
  })

  it('self-preservation', () => {
    board[4] = 'X'
    board[5] = 'O'
    board[2] = 'X'

    // O should play board[6]
    expect(evaluatePlay(board, 'O').position).toBe(6)
  })

  it('knows how to win', () => {
    board[5] = 'O'
    board[8] = 'O'

    // O should play board[6]
    expect(evaluatePlay(board, 'O').position).toBe(2)
  })
})
