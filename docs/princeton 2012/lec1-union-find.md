# 1 Dynamic connectivity

Q. is there a path connecting `p` and `q`?

## Implementing the operations
**Find query**. Check if two objects are in the same component.
**Union command**. Replace components containing two objects with their union.



# 2 Quick Find

**Data structure**
- Integer array id[] of size N.
- Interpretation: `p` and `q` are connected iff they have the same id.


**Find**. Check if `p` and `q` have the same id.

**Union**. To merge components containing `p` and `q`, change all entries whose id equals id[p] to id[q]

```
      0 1 2 3 4 5 6 7 8 9
    ----------------------
id[]  0 1 1 8 8 0 0 1 8 8

' = changed
after union of 6 and 1:

      0 1 2 3 4 5 6 7 8 9
    ----------------------
id[]  1'1 1 8 8 1'1'1 8 8
```


## Implementation
```java
public class QuickFindUF{
  private int[] id;

  public QuickFindUF(int N) {
    id = new int[N];
    for (int i = 0; i < N; i++) // set id of each object to itself (N array accesses)
      id[i] = i;
  }

  public boolean connected(int p, int q) { // check whether p and q are in the same component (2 array accesses)
    return id[p] == id[q];
  }

  public void union(int p, int q) {
    int pid = id[p];
    int qid = id[q];
    for (int i = 0; i < id.length; i++) // go through all id, change all entries with id[p] to id[q] (At most 2N + 2 array accesses)
      if (id[i] == pid) id[i] = qid;

      // a lot of people get it wrong by doing
      // if (id[i] == id[p]) id[i] = qid; but id[p] here could have been  changed to id[q] and the comparison would not match.
  }
}
```

## Quick-find is too slow.
### Ex. Takes N^2 array accesses to process sequence sequence of N union commands on N objects.


# 3 Quick Union

## Lazy approach
**Data structure**.
- Integer array id[] of size N.           
- Interpretation: id[i] is parent of i.    
- **Root** of i is id[id[id[...id[i]...]]].
                                        \
                                        keep going until it doesn't change (algorithm ensures no cycle)


**Find**. Check if p and q ahve the same root.

**Union**. To merge components containing p and q, set the id of p's root to the id of q's root.

```
      0 1 2 3 4 5 6 7 8 9
    ----------------------
id[]  0 1 9 4 9 6 6 7 8 9

becomes:

      0 1 2 3 4 5 6 7 8 9
    ----------------------
id[]  0 1 9 4 9 6 6 7 8 6'
                          \
                          only one value changes
```

## Implementation of Quick Union
```java
public class QuickUnionUF {
  private int[] id;

  public QuickUnionUF(int N) {
    id = new int[N];
    for (int i = 0; i < N; i++)
      id[i] = i;                // initialization, set id of each object to itself.
  }

  private int root(int i) {
    while (i != id[i])    // Eventually a node's root is itself.
      i = id[i];      // chase parent pointers until reach root (dept of array accesses)
    return i;
  }

  public boolean connected(int p, int q) {
    return root(p) == root(q);      // check if p and q have same root (dept of p and q array accesses)
  }

  public void union(int p, int q) {
    int i = root(p);  
    int j = root(q);                    
    id[i] = j                 // change root of p to point to root of q (dept of p and q array accesses)
  }
}
```

## Analysis
Faster than `Quick Find` but its also too slow

- Trees can get too tall, one tree with a next in the worst sceanrio, height = N
- Find too expensive (N array accesses in the worst case)


# 4 Quick Union Improvements
## Imrovement 1: weighting

**Weighted quick-union.**
- Modify quick-union to avoid tall trees.
- Keep a track of size of each tree (number of objects).
- Balance by linking root of smaller tree to root of larger tree.

**Data structure**. Same as quick-union, but maintain extra array sz[i] to count number of objects in the tree rooted at i.

**Find**. Identical to quick-union

**Union**. Modify quick-union to:
- Link root of smaller tree to root of larger tree.
- Update the sz[] array.

```java
public void union(int p, int q) {
  int i = root(p);  
  int j = root(q);                    
  if (sz[i] < sz[j])  id[i] = j; sz[j] += sz[i]; // change sz array.
  else                id[j] = i; sz[i] += sz[j];
}
```

## Analysis
**Running time**
- Find: take time proportional to depth of p and q.
- Union: take constant time, given root.

**Proposition**. Depth of any node x is at most `lg N`.


## Improvement 2. path compression
**Quick union with path compression.** Just after computing the root of p, set the id of each examined node to point to that root.


**Two-pass implementation**: add second loop to root() to set the id[] of each examined node to the root.

**Simpler one-pass variant**: Make every other node in path point to its grandparent (thereby halving path length).

```java
private int root(int i) {
  while (i != id[i]) {
    id[i] = id[id[i]];      // only one extra line of code!
    i = id[i]
  }
  return i;
}
```

**In practice**. No reason not to! Keeps tree almost completely flat.

`lg* N = number of times you have to take log of n to get 1`

## Weighted quick-union with path compression: amortized analysis
**Proposition**. Starting from an empty data structure, any sequence of M union-find ops on N objects makes <= c(N + M lg*N) array accesses.
- Analysis can be improved to N + M (ALPHA)(M, N).
- Simple algorithm with fascinating mathematics.

```

N         0   1   2   3       4           5
lg*N      1   2   4  16   65536     2^65536
```

**Linear-time algorithm for M union-find ops on N objects**?

- Cost within constant factor of reading in the data.
- In theory, WQUPC is not quite linear.
- In practice, WQUPC is linear.

people looked a long time for linear, but now we can prove such algorithm doensn't exist.

Algorithm         Quick-find    quick-union   Weighted QU   QU + Path compression   Weighted QU + path compression
worst-case time   M*N           M*N           N + M log N   N + M log N               N + M lg* N


# Union-Find Application
## Percolation

**A model for many physical systems:**
- N by N grid of sites.
- Each site is open with probability *p* (or blocked with probability 1 - p).
- System **percolates** iff top and bottom are connected by open sites.
