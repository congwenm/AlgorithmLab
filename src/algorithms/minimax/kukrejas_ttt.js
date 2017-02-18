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
const Heuristic_Array = [
  [     0,   -10,  -100, -1000 ],
  [    10,     0,     0,     0 ],
  [   100,     0,     0,     0 ],
  [  1000,     0,     0,     0 ]
];

// @param board - chars<Array>
// @param player - 'O' or 'X'
export const evaluatePosition = (board, player) => {
  var opponent = player === 'X' ? 'O' : 'X'
  var piece
  var players
  var others
  var t = 0

  for (let i = 0; i < 8; i++) {
    players = others = 0
    for (let j = 0; j < 3; j++) {
      piece = board[Three_in_a_Row[i][j]];

      if(piece == player)
        players++;
      else if (piece == opponent)
        others++;
    }
    t += Heuristic_Array[players][others]
  }

  return t
}
