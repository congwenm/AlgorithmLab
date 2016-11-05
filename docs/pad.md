
output
------
1
2 3
4 5 6 7
8 9 10 11 12 13 14 15

2^0
2^1
2^2
2^3

for (let i = 0, j = i; j < arr; j = Math.pow(2, i++)) {console.log(i, j) }