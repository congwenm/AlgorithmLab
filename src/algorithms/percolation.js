include('util');
import UnionFind from '../data_structures/union_find'

// tools
export const generateGrid = function(dimension, openRatio) {
  var area = dimension * dimension
  var openArea = area * openRatio
  return util.shuffle(util.expand(area).map((v, k) => k < openArea))
    .reduce((matr, elem, i) => {
      i % dimension === 0 ? matr.push([elem]) : matr[matr.length-1].push(elem);
      return matr
    }, []);
}

export const printGrid = function(grid) {
  grid.map((colAtY, xCoord) => {
    console.log(`y ${xCoord} | `, colAtY.map(el => el ? 'X' : '-').join(' '))
  })
}

// constructor
export default function Percolation(matrix) {
  this.grid = matrix
  this.width = matrix.length
  this.size = Math.pow(this.width, 2); // assumes square grid
  this.arranges = [];
  for (let y = 0; y < this.width; y++) {
    var rowAtY = matrix[y]
    for (let x = 0; x < rowAtY.length; x++) {
      var coord = rowAtY[x]
      if (!coord) { continue; }
      if (rowAtY[x+1]) {
        this.arranges.push([
          y * matrix.length + x,
          y * matrix.length + x + 1
        ])
      }
      if (matrix[y+1] && matrix[y+1][x]) {
        this.arranges.push([
          y * matrix.length + x,
          (y+1) * matrix.length + x
        ])
      }
    }
  }
}

Object.assign(Percolation.prototype, {

  // tell if an array percolates from top to bottom
  isPercolated () {
    var topPercolateIndex = this.size
    var bottomPercolateIndex = this.size + 1

    var topPercolateArranges = this.grid.slice(0, 1)[0]
      .map((value, x) =>
        value && [topPercolateIndex, this.width * x]
      ).filter(v => v)

    var bottomPercolateArranges = this.grid.slice(-1)[0]
      .map((value, x) =>
        value && [bottomPercolateIndex, (this.grid.length-1) * this.width + x]
      ).filter(v => v)

    // console.log('topPercolateArranges', topPercolateArranges);
    // console.log('bottomPercolateArranges', bottomPercolateArranges);

    // padds arranges like this: double means has arrange (e.g. \\)
    //
    //     top_percolate (pad)
    //      // | \\
    //      X  -  X
    //      X  X  X
    //      -  X  X
    //      \ || //
    //     bottom_percolate (pad)

    var paddedArranges = [
      ...topPercolateArranges,
      ...this.arranges,
      ...bottomPercolateArranges,
    ]

    // find if topPercolate is connected to bottomPercolate, which are appeneded at the end, hence we pass {n} as `this.size + 2`
    return (new UnionFind.QuickFind(
      this.size + 2,
      paddedArranges
    )).find(topPercolateIndex, bottomPercolateIndex)
  },

  print() {
    printGrid(this.grid)
  }
})

