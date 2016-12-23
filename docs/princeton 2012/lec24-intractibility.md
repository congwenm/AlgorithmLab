# 1. Intro

A problem is `intractable` if it can't be solved in polynomial time.
Desiderata> Prove that a problem is intractable

### Two problem that provably require exponential time.
- Given a constant-size program, does it halt in at most `K` steps?
                                                          \
                                                          input size = c + lg K
- Given N-by-N checkers board position, can be first player force a win? (in checkers)
                                                              \
                                                              using force capture rule.



# 2. Search Problems

`LSolve` and `LP` are linear Problems!?


`ILP` is 0 or 1 LP

`SAT` is true false LP, instead of `+` and `-`, it uses `&&` and `||`


## Decision Problem - problems that has a yes/no answer.

## Optimization Problem - you want to find the best solution in some sense, like Linear Programming or Shortest Path.


## Search Problem
characteristic of a search problem, its got a small solution that we can efficiently check whether its a solution.


Given an instance `I` of a problem, find a solution `S`.
                                                      \
                                                      or report none exist
*Requirement*
Must be able to efficiently check that `S` is a solution.
                    \
                    poly-time in size of instance `I`


`LSolve`, `LP`, `ILP` and `SAT` are search problems, the solution is 3 numbers, plug in numbers to verify the solution, castor: so ... polynomial time, search problem.

```
48x_0 + 16x_1 + 119x_3 = 88
...
...
```



#### Factor is a Search Problem
Might take a lot of computation to find a factor, but somebody gives you a factor, all you have to do is verify it fast. So this is a Search Problem


# 3. P vs NP
## `NP` is the class of all search problems.
                                  \
                                  NOTE: classic definition limits NP to yes no
                                  problems.

NP problems:
```csv
Problem, Description, Poly-time Algorithm

LSOLVE (A,b), Find a m venctor x that satisfies `A_x = b`, Gaussian elimination
LP (A,b), Find a vector x that satisfies `A_x <= b`, ellipsoid
ILP (A,b), Find a binary vector x that satisfies `A_x <= b`,
SAT (O,b), Find a boolean vector x that satisfies `O(x) = b`,
Factor (x), Find a nontrivial factor of the integer `x`,
```

*Significance*. What scientists and engineers `aspire` to compute feasibly.

## `P` - is the class of search problems solvable in poly-time
                                                        \
                                                        Note: classic definition limits P to yes-no problems
P problems:
```
Problem, Description, Poly-time Algorithm
LSOLVE (A,b), -, -
LP (A,b), -, -
SORT, Find a permutation that puts array `a` in order, merge-sort (von Neumann 1945)
STCONN (G,s,t), Find a path in a graph G from s to t, depth-first search (Theseus)
```

*Significance*. What scientists and engineers `do compute` feasibly.

## Nondeterminism (the `N` in `NP`)
Nondeterministic machine can guess the desired solution.
                                                \
                                                recall NFA implementation.

Nondeterminsm is an abstract devise that we use to help us get to real solution.



EX. int[] a = new a[N];
* Java initializes entries all to 0.
* Nondeterministic machine: initializes entries to the solution!

IL. Given a system of linear inequalities, guess a 0-1 solution:

```
x_1 + x_2 >= 1
x_0 + x_2 >= 1
x_0 + x_1 + x_2 <= 2

  |
  v

x_0 = 0
x_1 = 1
x_2 = 1
```

Same concept goes to turing machine.
EX. Turing machine
* Deterministic: state, input determines next state.
* Nondetereministic: more than one possible next state.


### NP is Search problems solvable in poly time on a nondeteministic TM. (even if the poly time comes from verifing the result)


## Extended Church-Turing thesis
### P is search problems solvable in poly-time in the natural world.

*Evidence supporting thesis. True for all physical computers.

People wonder are there Natural computer? No successful attempts yet.

  Ex. Computing Steiner trees with soap bubbles
  STEINER: find set of lines of minimal length connecting N given points
     *     *
      \___/
      /   \
     *     *

*Impliciation* To make future computers more efficient. suffices to focus on improving implementation of existing designs.


## The central question
Does `P = NP`?

In search theres always an expotential trial and error method which is poly-time, the question becomes: Can you always void brute-force searching and do better?

If yes... Poly-time algorithms for SAT, ILP, TSP, FACTOR, that means there is polynomial times algorithms out there, we just haven't found them yet.
If no... Would learn something fundamental about our universe.


### Overwhelming consensus. P != NP.




# 4. Classifying Problems

SAT. Given a system of boolean equations, find a solution.

  x_1^ or x_2 or x_3 = true
  x_1 or x_2^ or x_3 = true
  x_1^ or x_2^ or x_3^ = true
  x_1^ or x_2^ or x_3 = true

*Key applications*.
* Automatic verification systems for software.
* Electronic design automation (EDA) for hardware.
* Mean field diluted spin glass model in physics.

## Exhaustive search

Q: How to solve an instance of SAT with `n` variables?
A: Exhaustive search: try all 2^n truth assignments.


## Classifying problems

Q: Can we do anything substantially more clever?
*Conjecture*. No poly-time algorithm for SAT. (which means intractable)

Q: Which search problems are in P?
A: No easy answers (we don't even know whether P = NP)

              Cook reduction
              /
Problem X `poly-time reduces` to problem Y if X can be solved with:
* Polynomial number of standard computational steps
* Polynomial number of calls to Y.

*Consequence*. If we can poly-time reduce SAT to problem Y, then we conclude that Y is (probably) intractable.


*** There are lots and lots of problems you can reduce `boolean satisfiability (SAT)` to!?, which means they are implicated as *Intractable*.

*** More reductions from SAT in all fields, plus 6000+ scientific papers per year.



# 5. NP-Completeness.

Gives us even stronger evidence that the problems with reduce-SAT-to are difficult.

## NP-Completeness

*Def* - An NP problem is NP-complete if all problems in NP poly-time reduce to it.

*Proposition* - [Cook 1971, Levin 1973] proved that SAT is NP-complete.
                                                                \
                                                                meaning:
                                                                every NP problem is a SAT problem in disguise

*Extremely brief proof sketch*:
* Convert non-deterministic TM notation to SAT notation.
* If you can solve SAT, you can solve any problem in NP.

non-deterministic Turing Machine - In a table, if you have a certain symbol, you go to a certain state, you go to another state.

What cook found was: anything you can compute with NDTMs, theres a way to encode NDTMs as an instance of SAT. If you can solve that instance of SAT in polytime, you are simulating operation in the Turing machine and you can solve computations Turing machines try to do in poly time.

*Implications* - [SAT captures difficulty of whole class NP]
* Poly-time algorithm for SAT iff `P = NP`.
* No poly-time algorithm for some NP problem => none for SAT.

*Remark* - Can replace SAT with any of Karp's problems


## Two worlds
*Overwhelming consensus (still)* - `P != NP`

  NP
  /\
 P  NPC


## Summary
*P* - Class of search problems solvable in poly-time
*NP* - Class of all search problems, some of which seem wickedly hard.
*NP-complete* - Hardest problems in NP.
*Intractable* - Problem with no poly-time algorithm.

### Many fundamental problems are NP-complete
- SAT
- ILP
- 3-COLOR
- 3D-ISING

### Use theory as a guide:
* A poly-time algorithm for an NP-complete problem would be a stunning breakthrough (a proof that P = NP).
* You will confront NP-complete problems in your career.
* Safe to assume that P != NP and that such problems are intractable.
* Identify these situations and proceed accordingly.



# 1. Coping with intractability

## Exploiting intractability

### Modern crytograhy

* Ex. Send you credit card to Amazon.
* Ex. Digitally sign an e-document.
* enables freedom of privacy, speech, press, political association.

### RSA crytosystem.
* To use: multiply two n-bit integers. [poly-time]
* to brea: factor a 2n-bit integer. [unlikely poly-time]

  e.g.  23 * 67  = 1541
  multiply = EASY
  factor = HARD

*Factor* - Given an n-bit integer **x**, find a nontrivial factor.

Q. What is complexity of Factor?
A. In NP, but not known (or believed) to be in P or NP-complete.

Q. What if P = NP?
A. Poly-time algorithm for factoring; modern economy collapses. (due to easy way to break RSA-cryptosystem)

*Proposition* - [Shor 1994] Can factor an n-bit integer in n^3 steps on a "quantum computer"

Q. Do we still believe the extended Church-Turing thesis???


### Relax one of desired features (of intractibles!?).
* Solve arbitrary instances of the problem. (relax)
* Solve the problem to optimality.
* Solve the problem in poly-time.


#### Special cases may be tractable
* Ex: Linear time algorithm for 2-SAT. <- at most two literals per equation.
* Ex: Linear time algorithm for Horn-SAT. <- At most one un-negated literal per euqation.


### Relax one of desired features (of intractibles!?).
* Solve arbitrary instances of the problem.
* Solve the problem to optimality. (relax)
* Solve the problem in poly-time.


### Develop a heuristic, and hope it produces a good solution
* No guarantees on quality of solution.
* Ex. Travelling Sales Person assignment heuristics.
* Ex. Metropolis algorithm, simulating annealing, genetic algorithms.

### Approximation algorithm. Find solution of provably good quality.
* Ex. MAX-3SAT: provably satisfy 87.5% as many clauses as possible.
                                  \
                                  but if you can guarantee to satisfy 87.51% as many clauses as possible in poly time, then P = NP.

### Relax one of desired features (of intractibles!?).
* Solve arbitrary instances of the problem.
* Solve the problem to optimality.
* Solve the problem in poly-time. (relax)

### Complexity theory deals with worst case behavior.
* Instance(s) you want to solve may be "easy".
* Chaff solves real-world SAT instances with ~10K variable.


### most famous NP-complete problem: Hamilton path, find a simple path that visits every vertex exactly once.

*Remark* - Euler path easy, but Hamilton path is NP-complete
              \
              visit every edge exactly once

Its NP-complete but there is a simple exponential time algorithm, just a depth first search
```Java
public class HamiltonPath {
  private boolean[] marked;   // vertices on current path
  private int count = ;       // number of Hamiltonian paths

  public HamiltonPath(Graph G) {
    marked = new boolean[G.V()];
    for (int v = 0; v < G.V(); v++)
      dfs(G, v, 1);
  }

  // depth = depth of current path (depth of recursion)
  // Go through all the vertices adjacent to current vertex, and if they are not marked, go ahead and visit them recursively.
  private void dfs(Graph G, int v, int depth) {
    marked[v] = true;
    if (depth == G.V()) count++;            // found one

    for (int w : G.adj(v))
      if (!marked[w]) dfs(G, w, depth + 1); // backtrack if w is already part of path

    marked[v] = false;                      // clean up, unmarks it so it ends up trying all possible exponential path.
  }

}
```


## The longest path, also NP-complete
