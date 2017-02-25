'use strict';

const expand = (num) => Object.keys([...new Array(num)]);

class Matrix extends Array {
  constructor({ width, height }) {
    super(...expand(width).map(colX => {
      return expand(height).map(coord => null) // which is a column
    }));
  }

  static from($2dArray) {
    const [width, height] = [$2dArray.length, $2dArray[0].length];
    const inst = new this({ width, height });

    $2dArray.forEach((xCol, x) =>
      // inserting values into the inst
      xCol.forEach((coord, y) => inst[x][y] = coord)
    );
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
      .map(i => []);

    this.forEach(xCol => {
      xCol.forEach(
        (coord, y) => arr[y].push(coord)
      );
    });

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
  !set.includes(next) && set.push(next);
  return set
};

const hasWinner = triples => {
  var unique = triples.reduce(uniq, []);
  if (unique.length === 1) {
    if (unique[0] === 'X') return 'X'
    if (unique[0] === 'O') return 'O'
  }
  return null
};

class Board extends Matrix {
  constructor(args) {
    super(args);
  }

  checkForVictory() {
    const { board } = this;
    var colWins = this.map(hasWinner);
    var rowWins = this.getRows().map(hasWinner);
    var diagWins = [
      [this[0][0], this[1][1], this[2][2]],
      [this[2][0], this[1][1], this[0][2]]
    ].map(hasWinner);
    // console.log("CHECKFORVICTORY", colWins, rowWins, diagWins)
    return [...colWins, ...rowWins, ...diagWins].filter(x => x)[0] || null
  }
}

// static evaluation for tic-tac-toe

const getter$1 = value => value;

// used to benchmark
class Benchmarker {
  constructor() { this.start = process.hrtime(); }
  end() {
    this.diff = process.hrtime(this.start);
    return this.result
  }
  get result() { `Algorithm of #mmSearch took ${this.diff[0]}.${this.diff[1]}`;}
}

function evalModel(board, player) {
  // return evaluateBoard(board, player)

  // simpler
  const possibleWin = piece => piece == null || piece == player;
  var rowWins = board.getRows().map(
    row => row.every(possibleWin)
  );
  var colWins = board.map(
    col => col.every(possibleWin)
  );
  var diagWins = [
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ].map(diag => diag.every(possibleWin));
  
  return [...rowWins, ...colWins, ...diagWins].filter(getter$1).length
}



class TTTMinimax {
  constructor({ game, player }) {
    this.game = game;
    this.board = game.board;
    this.player = player;
  }

  respond(callback) {
    var bestMove = this.search();
    // make the move
    callback(bestMove);
  }

  search() {
    const benchmarker = new Benchmarker;
    // get all moves
    let moveOptions = this.board.vacant; // ({ max: true })

    let bestMove = null;

    // weighs the remaining options
    moveOptions.forEach(
      (move) => {
        // make a move
        this.game.computerMove(move.position); // computer move, compueter is Max

        // evaluate and assign to move, determine whether or not to do statical evaluation
        debugger
        move.value = this.alphaBeta(2, -Infinity, Infinity, { isMax: false }); // generate alphabeta options for hypothetic player.
        console.log(this.game.view());

        if (bestMove == null || move.value >= bestMove.value) {
          bestMove = move;
        }

        // revert move
        this.game.undoMove(move.position);
      });

    // time the algorithm
    benchmarker.end();
    console.log(`ALL SCORES: \n ${moveOptions.map(m => `${m.position}: ${m.value}`).join('\n')}`);
    console.log(`BEST MOVE IS: ${bestMove}`);

    return bestMove
  }

  alphaBeta (depth, alpha, beta, { isMax }) {
    console.log('CALLING `alphabeta` with ', arguments);
    this.game.view();
    // return evaluation if reaching leaf node or any side won
    if (depth == 0 || this.board.checkForVictory() !== null) {
      return evalModel(this.game.board, 'O')
    }
    var moveOptions = this.board.vacant; // regardless of max or minimum

    // synchronized stuff, use find to be able to `prune`
    moveOptions.find(move => {
      var temp = null;
      // make the move, w/e the player?
      this.game[isMax ? 'computerMove' : 'playerMove'](move.position);
      const finalBeta = beta;
      const finalAlpha = alpha;
      const finalDepth = depth;
      if (depth == 2) {
        if (isMax) {
          alpha = Math.max(finalAlpha, this.alphaBeta(finalDepth-1, finalAlpha, finalBeta, { isMax: false }));
        }
        else { // isMin
          beta = Math.min(finalBeta, this.alphaBeta(finalDepth-1, finalAlpha, finalBeta, { isMax: true }));
        }
      }
      else {
        if (isMax) {
          alpha = Math.max(alpha, this.alphaBeta(depth-1, alpha, beta, { isMax: false }));
        }
        else { //isMin
          beta = Math.min(beta, this.alphaBeta(depth-1, alpha, beta, { isMax: true }));
        }
      }

      // move the w/e piece back
      this.game.undoMove(move.position);

      // cut-off, `prune`, no need to go down further, there's no answer here
      if (beta <= alpha) return true;
    });

    console.log("EVALUATED VALUE OF " + (isMax ? alpha : beta));
    return isMax ? alpha : beta
  }
}

class TicTacToe {
  constructor() {
    this.board = new Board({ width: 3, height: 3 });
    this.currentPlayer = 'X'; // assuming x moves first
  }

  // NOTE: does the minimaxing logic here.
  computerRespond() {
    new TTTMinimax({
      game: this,
      player: 'O'
    }).respond(move => this.computerMove(move));
  }

  computerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'O';
  }

  playerMove([x, y]) {
    if(this.board[x][y] != null) { throw new Error("Cannot move on existing piece")}
    this.board[x][y] = 'X';
  }

  undoMove([x, y]) {
    if(this.board[x][y] == null) { throw new Error("Cannot undo a move thats not there")}
    this.board[x][y] = null;
  }

  toString() { this.board.toString(); }
  view() { console.log('Current Board:\n', this.board.toString()); }
}

module.exports = TicTacToe;
