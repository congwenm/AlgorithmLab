# Quick Sort

original logic for partition -> 
1. use last number in array as pivot
2. pivot (move smaller numbers to i++ positions)
3. move last number (pivot) to its pivoting position

This has a unclear problem of being quadradic

new algorithm following paul lewis's implementation
1. use center number as pivot
2. swap center number with last number
3. pivot
4. move last number (pivot) to its pivoting position

difference in selecting pivot causes the complexity of the algorithm to drop from Quadratic to Linear Log.
