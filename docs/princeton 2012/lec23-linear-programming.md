# 1. Brewer's problem


Small brewery produces ale and beer.

- Production limited by scarce resources: `corn, hops and barley malt`.

  Corn: 480 lbs
  Hops: 160 oz
  Malt: 1190 lbs


- Recipes for ale and beer require different proportions of resources.

  Ale: $13 profit per barrel
    * 5 lb Corn
    * 4 oz Hops
    * 35 lb Malt

  Beer: $23 profit per barrel
    * 15 lb Corn
    * 6 oz Hops
    * 20 lb Malt

Q: How much of each should we make to maximize profit?


## Linear programming formulation
- let A be the number of barrels of ale.
- let B be the number of barrels of beer.

```
                    ale     beer

maximize            13A  +  23B               profits

subject             5A   +  15B   <=  480     corn
to the              4A   +  4B    <=  160     hops
constraints         35A  +  20B   <=  1190    malt

                    A    ,  B     >=  0
```


## Feasible region

inequalities define `halfplanes`; feasible region is a `convex polygon`

hops: 4A + 4B <= 160
malt: 35A + 20B <= 1190
corn: 5A + 15B <= 480


graph them into a plane

```

     M
     MM
     N                          I                             Legend
     M Z                                                     $ = Corn Constraint: 5A   +  15B   <=  480
     M           (12, 28)                                    O = Hops Constraint: 4A   +  4B    <=  160
     M    O      extreme         I                           I = Malt Constraint: 35A  +  20B   <=  1190
     M           points
     M       $      |             I
     M              |
     OOM        O   v
     M ^  $                        I
     M |        $  $$
     M  \            $~
     M   \            O    $        I
     M  extreme                 +$
     M   points           O            $,
     M  (0, 32)                       =      $
     M                      Z                    7$
     M                                I                $
     M                         O                             $
     M                                                            $=
     M                            O    I
     M
     M                               O
     M                                  =
     M                                  OO   <---- extreme points (26, 14)
     M                                  NO
     M                                     O
     M
     M                                    I   O
     M
     M                                           O
     M                                     I
     M                                              O
     M                                      I
     M                                      OO         O
     M                         (34, 0) ----> 8
  ^   ------------------------------------------------------------------------
  |     (ALE) -->
(BEER)

```


## Objective function

13A + 23B = 442, graph onto the plane


## Standard form linear program
Goal: Maximize linear objective function of n nonnegative variables, subject to `m` linear equations.

`a_i = a * subscript(i)`
Input: real numbers a_ij, c_j, b_i.
Output: real numbers x_j

primal problem:

```
maximize        c_1*x_1 + c_2*x_2 + ...  + c_n*x_n                     maximize     c_t*x

subject         a_11*x_1 + a_12*x_2 + ...  + a_1n*x_n  = b1             subject     A x = b
to the          a_21*x_1 + a_22*x_2 + ...  + a_2n*x_n  = b2             to the
constraints        ...        ...         ...                         constraints   x >= 0

                a_m1*x_1 + a_m2*x_2 + ...  + a_mn*x_n  = bm

                  x1,       x2,       ...,        x_n >= 0
```

### Caveat: no widely agreed notion of "standard form"


## Convert the brewer's problem to standard formed

Original:

```
 maximize       13A  +  23B

                5A   +  15B   <=  480
                4A   +  4B    <=  160
                35A  +  20B   <=  1190

                A    ,  B     >=  0

```

Standard form:

- add variable Z and equation corresponding to the objective function.
- Add `slack` variable to convert each inequality to an equality.
- Now a 6-dimensional problem.

```
maximize  Z

          13A  +  23B                              - Z   = 0

          5A   +  15B  + S_Corn                          = 480
          4A   +  4B            + S_Hops                 = 160
          35A  +  20B                    + S_Malts       = 1190

          A    ,  B    , S_Corn + S_Hops + S_Malts      >= 0
```

Variable for everything in the system. More variables, less variability.


## Geometry - Extreme point property.

If there exists an optimal solution to (P), then there exists one that is  an extreme point.

- Number of extreme points to consider is finite.
- But number of extreme points can be exponential! (!? to what)


# 2. Simplex algorithms
ranked as **one of top 10 scientific algorithms of 20th centry**

Generic algorithm.

- start at some extreme points.
- `Pivot` from one exgtreme point to an adjacent one. <-- never decreasing objective function, so going upper left in the convex polygon)
- Repeat until optimal


## Basis
A basis is a subset of `m` of the `n` variables

Basic Feasible Solution (BFS).
- set `n - m` nonbasic variables to 0, solve for remaining `m` variables.
- Solve `m` equations in `m` unknowns.
- If unique and feasible -> BFS.
- BFS <-> extreme point.


## Simplex Initialization

set A = B = 0, set Z = 0, plug into the equations below
```
maximize  Z
                                                                      basis = {S_c, S_h, S_m}
          13A  +  23B                           - Z   = 0             A = S_c = 0
                                                                      Z = 0
          5A   +  15B  + S_c                          = 480           B = 480
          4A   +  4B            + S_h                 = 160           S_h = 160
          35A  +  20B                   + S_m         = 1190          S_m = 1190

          A    ,  B    , S_c    , S_h   , S_m        >= 0
```

Then we choose (in a min) a value to `Pivot`, choose `15B`

substitute B = (1/15) (480 - 5A - S_c) and add B into the basis       <-- which basic variable does B replace?
(rewrite 2nd equation, eliminate B in 1st, 3rd and 4th equations)

Result:

```
maximize  Z
                                                                                basis = {B, S_h, S_m}
          16/3 * A        - 23/15 * S_c                     - Z   = 0           A = S_c = 0
                                                                                Z = 736
          1/3 * A  +  B   + 1/15 * S_c                            = 32          B = 32
          8/3 * A         - 4/15 * S_c    + S_h                   = 32          S_h = 32
          85/3 * A        - 4/3 * S_c             + S_m           = 550         S_m = 550

          A     ,     B   , S_c           + S_h   + S_m           >= 0
```


why choose `15B`, `23B` in objective function has positive coefficient, as long as that, we can use it, so we can technically do it on `A` column.
why that row? you have to make sure the right hand side is always greater than 0, you want to take the `right hand side / coefficient` and use the smallest value. So `480 / 15` yields the smallest


So going forward we pivot again, on `8/3 * A`
substitute A = (3/8) (32 + (4/15) * S_c - S_h) and add A into basis
(rewrite 3rd equation, eliminate A in 1st, 2nd and 4th equation)


```
maximize  Z
                                                                                    basis = {A, B, S_m}
                                  - S_c   - 2 S_h               - Z   = -800        S_c = S_m = 0
                                                                                    Z = 800
                      B   + 1/10 * S_c    + 1/8 * S_h                 = 28          B = 28
          A               - 1/10 * S_c    + S_h                       = 12          S_h = 12
                          - 25/6 * S_c    - 85/8 * S_h  + S_m         = 110         S_m = 110

          A     ,     B   , S_c           + S_h         + S_m        >= 0
```


no more positive coefficient in objective function. and we are stuck, and we stop pivoting.

* Stop `Pivoting` when no objective function coefficient is positive.
* Any feasible solution satisfies current system of equations. Z = 800 - S_c - 2 * S_h
* note current BFS has value 800 => optimal


# 3. Simplex implementation

## Simple tableau

encode standard form LP in a single java 2D array.

initial simplex tablaux:

| A  | B  | S_c | S_h | S_m | Right Hand Side |
|----|----|-----|-----|-----|-----------------|
| 5  | 15 | 1   | 0   | 0   | 480             |
| 4  | 4  | 0   | 1   | 0   | 160             |
| 35 | 20 | 0   | 0   | 1   | 1190            |
| 13 | 23 | 0   | 0   | 0   | 0               |

whats this!?, (I think) construct the initial simplex tableu

```
      n   m   l
 -------------------
m|    A   1   b
l|    c   0   0

```

Simplex algorithm transforms initial 2D array into solution.
when we are running algorithm we get this:

| A | B | S_c   | S_h   | S_m | Right Hand Side |
|---|---|-------|-------|-----|-----------------|
| 0 | 1 | 1/10  | 1/8   | 0   | 28              |
| 1 | 0 | -1/10 | 3/8   | 0   | 12              |
| 0 | 0 | -25/6 | -85/8 | 1   | 110             |
| 0 | 0 | -1    | -2    | 0   | -800            |

    n     m     l
 ----------------------
m|        
l|  <=0   <=0   -Z*


## Implemention of Simplex algorithms.

Construct the initial simplex tableu:

```
      n   m   l
 -------------------
m|    A   1   b
l|    c   0   0

```

```java
public class Simplex {
  private double[][]a;                // simplex tableaux
  private int m, n;                   // M constraints, N variables

  public Simplex(double[][]A, double[] b, double[] c) {
    m = b.length;
    n = c.length;
    a = new double[m+1][m+n+1];
    for (int i = 0; i < m; i++)                       // put A[][] into tableau
      for (int j = 0; i < n; j++)
        a[i][j] = A[i][j];                            // aka fill in coefficient

    // slack variables, java array initialize to 0s!? you sure?
    for (int j = n; j < m + n; j++) a[j-n][j] = 1.0;  // put I[][] into tableau
    for (int j = 0; j < n;     j++) a[m][j]   = c[j]; // put c[] into tableau

    // objective function on the right hand side
    for (int i = 0; i < m;     i++) a[i][m+n] = b[i]; // put b[] into tableau
  }
}
```

## Simplex algorithm: Bland's rule

Find entering column q using `Bland's rule`: index of first column whose
objective function coefficient is positive.

```java
private int bland() {
  for (int q = 0; q < m + n; q ++)
    if (a[M][q] > 0) return q;        // entering column q has positive objective function coefficient

  return -1;                          // optimal
}
```

## Simple algorithm: Min-ratio rule
Find leaving row `p` using `min ratio rule`.
(Bland's rule: if a tie, choose first such row)

```java
private int minRatioRule(int q) {
  int p = -1;                             // leaving now
  for(int i = 0; i < m; i++) {
    if (a[i][q] < 0)                      // consider only positive entries
      continue;
    else if (p == -1)                     // initially set p to -1
      p = i;
    else if (a[i][m+n] / a[i][q]) < a[p][m+n] / a[p][q])
      p = i;                              // row p has min ratio so far;
  }
  return p;
}
```


## Simplex algorithm: Pivot
`Pivot` on element row `p`, column `q`.

```java
public void pivot(int p, int d) {
  for (int i = 0; i <= m; i++)
    if (i != p && j != q)                       // scale all entries but row `p`
      a[i][j] -= a[p][j] * a[i][q] / a[p][q];   //  and column `q`

  for (int i = 0; i <= m; i++)
    if (i != p) a[i][q] = 0.0;                  // zero out column `q`

  for (int j = 0; j <= m+n; j++)
    if (j != q) a[p][j] /= a[p][q];             // scale row `p`

  a[p][q] = 1.0;
}
```

## Simplex algorithm: bare-bones implementation

execute the simplex algorithm

```java
public void solve() {
  while(true) {
    int q = bland();
    if(q == -1) break;      // entering column `q` (optimal if -1)

    int p = minRatioRule(q);
    if (p == -1) ...        // leaving row `p` (unbounded if -1)

    pivot(p, q);            // pivot on row `p`, column `q`
  }
}
```

## Remarkable property. In typical applications, simplex algorithm terminates after at most 2(m + n) pivots.

### Pivoting rules. Carefully balance the cost of finding an entering variable with the number of pivots needed.
  - No pivot rule is known that is guaranteed to be polynomial
  - Most pivot rules are known to be exponential (or worse) in worst-case.


## Simple algorithm: degeneracy

### Degeneracy
New basis, same extreme point.
                            \
                            "stalling" is common in practice

You could get stuck when a bunch of lines intersect at the same extreme point. Not a good situation, need to watch out for.

### Cycling
you get into a `Cycling`. Get stuck by cycling through different bases that all correspond to the same extreme point. (not very common)

- Doesn't occur in the wild.
- `Bland's rule` guarantees finite # of pivots
          \
          choose lowest valid index for entering and leaving columns.


## Implementation issues
- Avoid stalling    (requires artful engineering)
- Maintain sparsity (requires fancy data structures)
- Numerical stability (require advanced math, you have control over errors in the calculations)
- Detect infeasibility (run `phase I` simplex algroithms)
- Detect unboundedness (no leaving row)


### Best practice. Don't implement it yourself! lol!

### Best implementations. Available in many programming environments.

### Industrial strength solvers. Routinely solve LPs with millions of variables

### Modeling languages. Make it even easier by Simplify task of modeling problems as LP.
