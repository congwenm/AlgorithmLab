# 1 Introduction to Reductions

**What is Reduction?** problem x *reduces to* problem y if you can use the solution to x to solve y.

```
Cost of solving X = total cost of solving Y + cost of reduction
```

### Example 1. find the median reduces to sorting
To find the median of N items:
* Sort N items.
* Return item in the middle.
                                            cost of sorting
                                            /
**Cost of solving finding the median.** `N log N + 1`.
                                                    \
                                                    cost of reduction

### Example 2. element distinctness reduces to sorting.
To solve element distinctness on N items:
* Sort N items.
* Check adjacent pairs for equality.

                                              cost of sorting
                                              /
**Cost of solving element distinctness.** `N log N + N`.
                                                      \
                                                      cost of reduction


# 2 Designing Algorithms

### reduction establishes lower bound

**Def**. Problem X **reduces to** problem Y if you can use an algorithm that solves Y to help solve X.

### Example 1. **Convenx hull*. Given N points int he plane, identify the extreme points of the convex hull (in counterclockwise order).

convex hull problem using **Graham scan** to find next points where angle is a left turn (starting from lower right) which reduces to sorting.

```
  cost of solving convex hall = cost of sorting + cost of reduction
  n log n + n
```

## Graham scan.
* Choose point **p** with smallest (or largest) y-coordinate.
* **Sort** points by polar angle with p to get simple polygon.
* Consider points in order, and discard those that would create a clockwise turn.



# 3 Establishing Lower Bounds
**Goal**. Prove that a problem require a certain number of steps.

### Ex. In decision tree model, any compare-based sorting algorithm require `OMEGA(N Log N)` compares in the worst case.
(A tree of N leaves on the bottom and height `Log N`)

## Linear time reduction
**Def**. Problem X **linear-time reduces** to problem Y if X can be solved with:
- Linear number of standard computational steps.
- Constant number of calls to Y.

### Ex. Almost all of the reductions we've seen so far.

## Establishing lower bounds: summary
Establishing lower bounds through reduction is an important tool in guiding algorithm design efforts.

Q. How to convince yourself no linear-time convex hull algorithm exists?
A1. [hard way] Long futile search for a linear-time algorithm. (a lot of people did this)
A2. [easy way] Linear-time reduction from sorting.

# 4 Classifying Problems
**Desiderata**. Problem with algorithm that matches lower bound.
## Ex. Sorting and convex hull have complexity `N log N`.

**Desiderata'**. Prove that two problems X and Y have the same complexity.
- First, show that problem X linear-time reduces to Y.
- Second, show that Y linear-time reduces to X.
- Conclude that X and Y have the same complexity.
                                        \
                                        even if we don't know what it is!

## Caveat
Circular dependency, possible in large systems causes Infinite reduction loop!




group problems together into same complexity, e.g. integer multiplication is in same complexity as division, exponential..

### Reductions are important in theory to:
- Design algorithms
- Establish lower bound
- Classify problems according to their computational requirements
