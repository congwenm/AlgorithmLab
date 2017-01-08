# Head-Note
* !? = not sure
* 1,2 = 1 subscript 2




# 2. Brute Force

Check for pattern starting at each text position.

```
A   = match
A`  = mismatch
A`~ = dont need to match afterward b/c there's already an mismatch

i j i+j 0 1 2 3 4 5 6 7 8 9 10
------------------------------
        A B A C A D A B R A C
0 2  2  A B R`~
1 0  1    A`~
2 1  3      A B`~
3 0  3        A`~
4 1  5          A B`~
5 0  5            A`~
6 4 10              A B R A      <---- MATCH!!!
\
  return i when j is M, where M is the length of the match (here 'ABRA'.length)
```

## Implementation (Brute-force substring search)
Check for pattern starting at each text position.

```java
public static int search(String pat, String txt) {
  int M = pat.length();
  int N = txt.length();
  for (int i = 0; i < = N - M; i++) {
    int j;
    for (j = 0; j < M; j++)       // index for # of passing characters
      if (txt.charAt(i+j) != pat.charAt(j))
        break;
    if (j == M) return i;         // `i` is index in text where pattern starts
  }
  return N;                       // NOT FOUND
}
```

## Analysis
- worst case: `~ M * N` char compares.
- slow if text and pattern are repetitive, example:
- Practical challenge, no room or time to save text. (judge wont like saving users search strings as oppose to just catch sensitive searches)

  ```
  pattern = A A A A B
  i j i+j 0 1 2 3 4 5 6 7 8 9
  ----------------------------
          A A A A A A A A A B
  0 2  2  A A A A B`
  1 0  1    A A A A B`
  2 1  3      A A A A B`
  3 0  3        A A A A B`
  4 1  5          A A A A B`
  5 0  5            A A A A B    <-- MATCH!
  ```

### Problems
bigger problem than its slow is we want to avoid **backup* in text stream.

say we want to match **A A A A A B**, and we mismatch on **B**, we will need to backup to the second **A** to continue matching. 

## Alternate implementation of brute force
- **i** points to end of sequence of already-matched chars in text
- **j** stores # of already-matched chars (end of sequence in pattern).

```
i j i+j 0 1 2 3 4 5 6 7 8 9 10
------------------------------
        A B A C A D A B R A C
7 3  2          A D A C`
5 0  1            A`~
```

```java
public static int search(String pat, String txt) {
  int i, N = txt.length();
  int j, M = pat.length();
  for (i = 0, j = 0; i < N && j < M; i++) {
    if (txt.charAt(i) == pat.charAt(j)) j++; // matches, move to the next char
    else { i -= j; j = 0; }                  // backup
  }
  if (j == M) return i - M;                  // found pattern
  else        return N;
}
```




# 3 Knuth-Morris-Pratt

String: `abcabc`
pattern `bcb`

## Instead of **brute force** searching `string` for `pattern`, which backtracks whenever mismatch occurs.

abcabc
a b cabc | match b
a bc abc | match bc
a bc (a) ! mismatch c
a b(c) ! mismatch b
abca b  | match b
abca bc  | match bc
abcabc | mismatch abc

## we can construct a finite state machine to look for the pattern 'cab'
   1 2 3
  -------
a| 0 2 0
b| 0 0 0
c| 1 0 3

and traverse the string through this finite state machine

```
           b
      _______________
    v/               \
  (0) -a-> (1) -b-> (2) -c-> finish
  () ^\____/  \_________/
 b/c    b/c       a
```

## Harder example, if you are looking for pattern 'ABABAC'

   1  2  3  4  5  6
  -----------------
a| 1  1  3  1  5  1
b| 0  2  0  4  0 [4]
c| 0  0  0  0  0  6

[] - interesing case

how is it interesting? We do a simulation for matching patterns in previous strings
if next === 'c', finishes
if next === 'a', including previous strings that matched are `babaa`, which doesn't match so we end up on state 1!?
if next === 'b', including the previous strings that matched, Simulation put us at the middle `b` in `babab`!?, which have this pattern that match `abab` so we end up on state 4!?
once mismatch occurs, mismatch transition, we look at

**J = pattern.length**
Need to go through `J` steps to do simulation for getting mismatch behavior,
seems to be a problem, but actually its no problem at all, we can run the simulation 1 char at a time while we are building the machine, just keep track of the state we would be at if we had run the DFA on the pattern starting at position 1.



## Knuth-Morris-Pratt construction simulation demo
1.
```
     x - simulation of empty string
     |
     v
step 0  1  2  3  4  5
     A  B  A  B  A  C
    -----------------
  a| 1->1  3     5
  b| 0  2     4
  c| 0->0           6
```
for mismatched values, in step 1 just moving `a` and `c` values in step 0 over

2.
```
     x - simulation of B
     |
     v
step 0  1  2  3  4  5
     A  B  A  B  A  C
    -----------------
  a| 1  1  3     5
  b| 0  2 [0] 4
  c| 0  0 [0]       6
```
in step 2, just move `b` and `c` values in step 0 (simulation) over,

we have to update x, x goes to where the machine would goif we saw an `a`, from transition 2 to 3 !?
```
x++
```

3.
```
        x - simulation of B
        |
        v
step 0  1  2  3  4  5
     A  B  A  B  A  C
    -----------------
  a| 1  1  3 [1] 5
  b| 0  2  0  4
  c| 0  0  0 [0]    6
```
in step 3, move `a` and `c` values in step 1 (simulation) over

now `x` is suppose to be where you would be if you started the machine on the pattern where first letter cut off!?, where you got `bab`!? `2`

4.
```
           x - simulation of B
           |
           v
step 0  1  2  3  4  5
     A  B  A  B  A  C
    -----------------
  a| 1  1  3  1  5
  b| 0  2  0  4 [0]
  c| 0  0  0  0 [0] 6
```
same

now `x` is `3` according to some simulation?!

5.
```
              x - simulation of B
              |
              v
step 0  1  2  3  4  5
     A  B  A  B  A  C
    -----------------
  a| 1  1  3  1  5 [1]
  b| 0  2  0  4  0 [4]
  c| 0  0  0  0  0  6
```
in step 5, move `a` and `b` values in step 3 (simulation) over

## Pseudo Code


For each state j:
- Copy dfa[][X] to dfa[][j] for mismatch case.
- Set dfa[pat.charAt(j)][j] to `j+1` for match case.
- Update x.

## Code
```java
public KMP(String pat) {
  this.pat = pat;
  M = pat.length();
  dfa = new int[R][M]
  dfa[pat.charAt(0)][0] = 1;
  for (int X = 0, i = 1; j < M; j++) { // for all chars in the pattern
    for (int c = 0; c < R; c++) {     // copy mismatch cases
      dfa[c][j] = dfa[c][X];
    }
    dfa[pat.charAt(j)][j] = j + 1;    // set match case, (overwrite the match case)
    X = dfa[pat.charAt(j)][X];        // update restart state
  }
}
```
`M` is basically the steps
`X` is restart state

## Statistics

M characters access(but space/time porportional to `R * M`)
`R` is radix (vertical)
`M` is length of pattern (horizontal)

ascii might be fine, but unicode but cost too much memory to devote to DFA representation

Linear: KMP access `M + N` chars to search for a pattern of length `M` in a text of length `N`


# 4. Boyer - Moore
cases:
1. if `T` isnt even in pattern, increment `i` to one char beyond `T`, i.e. skip to the next char (resetting the pattern matching)
  v = `i`

  before:

  ```
       v
  txt:       T L E
  pat: N E E D L E
  ```
  after:

  ```
          v
  txt:  T L E
  pat:  N E E D L E
  ```


2a. Mismatch character `N` in pattern, align text `N` with rightmost pattern `N`

  before:

  ```
       v
  txt:       N L E
  pat: N E E D L E
  ```
  after:

  ```
        v
  txt:  N L E
  pat:  N E E D L E
  ```

2.b Mismatch character in pattern (but heuristic no help), what you really want is increment by 1, see `after`
  before:

  ```
        v
  txt:        E L E
  pat:  N E E D L E
  ```
  aligned with rightmost E?:

  ```
        v
  txt:            E L E
  pat:  N E E D L E
  ```

  after: what you really want.

  ```
        v
  txt:      E L E
  pat:  N E E D L E
  ```


Precompute index of rightmost occurrence of character `c` in pattern ( -1 if character not in pattern (reset))

## code for precomputing
```java
right = new int[R];
for (int c = 0; c < R; c++) {
  right[c] = -1;
}
for (int j = 0; j < M; j++) {
  right[pat.charAt(j)] = j;
}
```

## Code for Boyer-Moore
```java
public int search(String txt) {
  int N = txt.length();
  int M = pat.length();
  int skip;
  for(int i = 0; i <= N-M; i += skip) {
    skip = 0;
    for (int j = M-1; j > = 0; j) {
      if (pat.charAt(j) != txt.charAt(i+j)) {
        skip = Math.minx(1, j - right[txt.charAt(i+j)]); // 1 is for incase other term is -1, `txt.charAt(i+j)` computes skip value
        break;
      }
    }
    if (skip == 0) return i;      // match
  }
  return N;
}
```

Performance is `~N/M`, worst case is brute-force, can be avoided by building a `Boyer Moore variant`, can improve worstcase to ~3N by adding KMP-like rule to guard against repetitive patterns.


# 5. Rabin-Karp

use `%` modular operator on strings and substrings % large prime number to compute a hash, aka `Modular Hash Function`

```javascript
i 0 1 2 3 4
  2 6 5 3 5

0 2 // % 997 = 2
1 2 6 // % 997 = (2*10 + 6) % 997 = 26
2 2 6 5 // % 997 = (26*10 + 5) % 997 = 265
3 2 6 5 3 // % 997 = (265*10 + 3) % 997 = 659
4 2 6 5 3 5 // % 997 ... = 613

```

## Code for computing hash for M-digit key (Horner's method)
no matter how big the pattern is, we can compute the hash for it.

```java
private long hash(String key, int M) {
  long h = 0;
  for (int j = 0; j < M; j++) {
    h = (R * h + key.charAt(j)) % Q;
  }
  return h;
}
```

use a large prime for `Q` (but avoid overflow)

## Challenge: How to effeciently compute X,i+1 given that we know X,i
this method can update hash function in constant time! (can precompute R^(M-1))

`X,i`         = current value
`t,i*R^(M-1)` = subtract leading digit
`R`           = multiply by radix
`t,i+M`       = add new trailing digit

full Equation:
`X,i+1 = (X,i - t,i*R^(M-1)) * R + t,(i+M)``

process:

```js
cur 4 1 5 9 2
new   1 5 9 2 6

  4 1 5 9 2 // current value
- 4 0 0 0 0
  = 1 5 9 2 //substract leading digit
      * 1 0 //multiply by radix
= 1 5 9 2 0
        + 6  // add new trailing digit
= 1 5 9 2 6 // new value
```

## Code Rabin-Karp
```java
public RabinKarp(String pat) {
  M = pat.length();
  R = 256;
  Q = longRandomPrim();

  RM = 1; // precompute R^(M-1) (mod Q)
  for (int i = 1; i <= M-1; i++) {
    RM = (R * RM) % Q;
    patHash = hash(pat, M);
  }
}

// check for hash collision using rolling hash function
public int search(String txt) {
  int N = txt.length();
  int txtHash = hash(txt, M);
  if (patHash == txtHash) return O;
  for(int i = M; i < N; i++) {
    txtHash = (txtHash + Q - RM*txt.charAt(i-M) % Q) % Q;
    txtHash = (txtHash*R + txt.charAt(i)) % Q;
    if(patHash == txtHash) return i - M + 1; // las vegas version, check for substring match if hash match, continue else;
  }
  return N;
}
```

## Monte Carlo vs Las Vegas version



Monte Carlo -
- if Q is sufficiently large random prime(about M * N^2) then probability of a false collision is about 1/N
- linear

Las Vegas
- guaranteed correct
- extremely likely to run in linear time ( but worst case is M * N)

Advantages of Rabin-Karp
- Extends to 2-d patterns.
- Extends to finding multiple patterns.

because even for complex situations (patterns), you can always compute the hashes for those patterns, and use symbol table to look for !?.


Disadvantages of Rabin-Karp
- Arithmetic ops slower than char compares.
- Las Vegas version requires backup
- Poor worst-case guarantee.

for straight substring search, its gonna be slow.


## Performance
both Monte Carlo and Las Vegas guarantees 7N, although Las Vegas is probabilistic guarantee.