import TTTEval, { xWinningOdds } from '../../../src/algorithms/tic_tac_toe/ttt_eval'
import Matrix from '../../../src/algorithms/tic_tac_toe/matrix'

const getter = value => value

describe(TTTEval, () => {
  it('should validate isValid', () => {
    expect(() => TTTEval(['X',])).toThrow()
    expect(() => TTTEval([[], [], []])).toThrow()
    expect(() => TTTEval([ [,,,], [,,,], [,,1] ])).toThrow()

    expect(() => TTTEval([ [,,,], [,,,], [,,,] ])).not.toThrow()
    expect(() => TTTEval([ [,,,], [,,,], [,,'X'] ])).not.toThrow()
  })

  describe("#TTTEval", () => {
    let board = Matrix.from([
      [null, null, null],
      [null,  'X', null],
      [null, null, null]
    ])

    it('should return 4 for the center piece', () => {

      var xScore = TTTEval(board, 'X')
      console.log(`XSCORE: ${xScore}`)

      var oScore = TTTEval(board, 'O')
      console.log(`OSCORE: ${oScore}`);

      // try all other

      console.log('\n', 'Evaluation:')
      board.map((xCol, x) =>
        xCol.map((coord, y) => coord === null && [x, y])
      )
        .reduce((arr, col) => arr.concat(col), [])
        .filter(getter).map(
          ([x, y]) => {
            debugger
            board[x][y] = 'O'
            oScore = TTTEval(board, 'O')
            console.log(`Position ${x},${y} yield a score of ${oScore}`)

            board[x][y] = null
          }
        )

      board[2][1] = 'O'
      board[1][0] = 'X';

      console.log('\n', 'Evaluation:')
      board.map((xCol, x) =>
        xCol.map((coord, y) => coord === null && [x, y])
      )
        .reduce((arr, col) => arr.concat(col), [])
        .filter(getter).map(
          ([x, y]) => {
            debugger
            board[x][y] = 'O'
            oScore = TTTEval(board, 'O')
            console.log(`Position ${x},${y} yield a score of ${oScore}`)

            board[x][y] = null
          }
        )

    })
  })


  describe('should score player `x`', () => {
    let board = [
      // each is a row
      [,,,],
      [,'X',,],
      [,,,]
    ]

    describe('helper xWinningOdds()', () => {
      it('should return # of rows of xCanWin - oCanWin', () => {
        var nul = null;
        expect(xWinningOdds([
          ['X', nul, 'O'],
          ['X', nul, nul],
          [nul, nul, 'O'],
          [nul, 'X', 'X'],
          ['X', 'X', 'O']
        ])).toBe(1)
      })
    })

    describe('helper getRows()', () => {
      it('should return yRows intead of xCols', () => {
        expect(Matrix.from([
          [1, 2], // col 1
          [3, 4]  // col 2
        ]).getRows()).toEqual([
          [1, 3],
          [2, 4]
        ])

        expect(Matrix.from([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]).getRows()).toEqual([
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9]
        ])
      })
    })

    it('should calculate score of `x`', () => {
      expect(TTTEval(board)).toBe(4)

      board[2][1] = 'O'
      expect(TTTEval(board)).toBe(2)

      board[2][0] = 'X'
      console.log("BOARD", board)
      expect(TTTEval(board)).toBe(4)
    })
  })
})
