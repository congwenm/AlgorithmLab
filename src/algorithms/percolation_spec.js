import Percolation, { generateGrid, printGrid } from '../../src/algorithms/percolation'

describe('Percolation', function() {

  it('can determine #arranges', function() {
    var perc = new Percolation([
      [1, 0, 1], // y0
      [1, 0, 1], // y1
      [1, 1, 0], // y2
    ])
    // perc.print()
    expect(perc.arranges).toEqual([
      [0, 3], [2, 5], [3, 6], [6, 7]
    ])
  })

  it('can detect isPercolated of small size', function() {
    var perc = new Percolation([
      [1, 0, 1], // y0
      [1, 0, 1], // y1
      [1, 1, 0], // y2
    ])
    // perc.print()
    expect(perc.isPercolated()).toBe(true)
  })

  it('can detect NOT isPercolated of small size', function() {
    var perc = new Percolation([
      [1, 0, 1], // y0
      [1, 0, 1], // y1
      [0, 1, 0], // y2
    ])
    // perc.print()
    expect(perc.isPercolated()).toBe(false)
  })

  it('all open grid is percolated', function() {
    var grid = generateGrid(10, 1)
    var percolation = new Percolation(grid)
    // printGrid(grid)
    expect(percolation.isPercolated()).toBe(true)
  })

  it('all closed grid is NOT percolated', function() {
    var grid = generateGrid(10, 0)
    var percolation = new Percolation(grid)
    // printGrid(grid)
    expect(percolation.isPercolated()).toBe(false)
  })

  it('#stats percolation of 50% filled grids', function() {
    var percolations = Array(101).join('a').split('a').map(n =>
      new Percolation(generateGrid(10, .50))
    )
    // console.log('out of 100 percolations of 50% filled grid, this many are percolated:')
    // console.log(percolations.map(p => p.isPercolated()).filter(is => is).length)
  })
})
