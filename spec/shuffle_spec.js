import surgeonkit from 'surgeonkit';
import shuffle from '../algorithms/shuffle';

/* not meant to test failure but rather random distribution */

var from1to20 = surgeonkit.expand(21).slice(1);
describe('#shuffle', () => {
  it('result should be random, not meant to be tested but rather observed', () => {
    var data = surgeonkit.expand(1000).map((n) => {
      return shuffle(from1to20)
    })
    var frequency = {}
    from1to20.forEach(n => frequency[n] = 0)

    data.forEach(d => {
      from1to20.forEach(n => {
        (d.indexOf(n) < 10) && (frequency[n] = frequency[n] + 1)
      })
    })

    // returns frequency of such number indexed to the first half
    // console.log(frequency)
    expect(
      // expect 10 number to be greater than 10 each time,
      // 10 * 1000 (units) = 10000
      from1to20.reduce((sum, n) => sum + frequency[n], 0)
    ).toBe(10000)
  })
})
