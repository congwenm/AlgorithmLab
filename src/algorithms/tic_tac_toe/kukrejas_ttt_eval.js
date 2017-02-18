const getter = value => value

const Three_in_a_Row = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ]
];

// [player] [opponent]
const Heuristic_Array = [
  [     0,   -10,  -100, -1000 ], // if player has 0
  [    10,     0,     0,     0 ], // if player has 1, from this point the opponent has 0 chance of winning this combo
  [   100,     0,     0,     0 ], // if player has 2
  [  1000,     0,     0,     0 ]  // if player has 3
];

// @param board - chars<Array>
// @param player - 'O' or 'X'
export const evaluateBoard = (board, player) => {
  var opponent = player === 'X' ? 'O' : 'X'
  var piece
  var players
  var others
  var result = 0

  for (let i = 0; i < 8; i++) {
    players = others = 0            // on each evaluation, reset `others` and `player` to 0
    for (let j = 0; j < 3; j++) {
      piece = board[Three_in_a_Row[i][j]]; // for each position of the winning combo

      if(piece == player)              // if the position is occupied by player, player++
        players++;
      else if (piece == opponent)     // else others gains
        others++;
    }
    result += Heuristic_Array[players][others] // for this combination, fetch the score
  }

  return result
}


export const evaluatePlay = (board, player) => {
  var best = { score: -Infinity, position: null }
  board.map((v,k) => v === null && k).filter(getter).map(num => {
    board[num] = player // play the piece
    var score = evaluateBoard(board, player)
    console.log(`Position ${num} yield a score of ${score}`)
    if (score > best.score) {
      best = { position: num, score}
    }
    board[num] = null
  })
  return best
}
