# Vocabulary
NFA - Nondeterministic finite automaton,

similiar to DFA, consumes a string of input symbols. For each input symbol, it transitions to a new state until all input sybols have been consumed. Unlike a DFA, it is non-deterministic, i.e., for some state and input symbol, the next state may be nothing or one or two or more possible states. Thus, in the formal definition, the next state is an element of the power set of the states, which is a set of states to be considered at once. The notion of accepting an input is similar to that for the DFA. When the last input symbol is consumed, the NFA accepts if and only if there is some set of transitions that will take it to an accepting state. Equivalently, it rejects, if, no matter what transitions are applied, it would not end in an accepting state.

                                        - Wikipedia


# 1 Intro
~ widely used in applications.


# 2 REs and DFAs
RE - Concise way to describe a set of strings.
DFA - Machine to recognize whether a given string is in a given set.
< Missing information >

### Kleene's theorem
- for any DFA, there exists a RE that describes the same set of strings.
- for any RE, there exists a DFA that recognizes the same set of strings.

NOTE: does not apply to NFA

## Pattern matching implementation
- NO backup in text input stream
- Linear-time guarantee

Basic plan.
* Build DFA from RE.
* Simulate DFA with text as input

**BAD NEWS**, Basic plan is *infeasible* (DFA may have exponential # of states).

Revised plan.
- Quadratic-time guarantee (linear-time typical).

Basic plan. [apply Kleene's theorem]
* Build NFA from RE
* Simulate NFA with text as input

```
                                              accept, pattern matches text
text: AAAABD ---> NFA for pattern (A*B|AC)D <
                                              reject, pattern does not match text
```

## Nondeterministic finite-state automata (NFA)
**Regular-expression-matching NFA**.
- RE enclosed in parentheses.
- One state per RE character (start = 0, accept = M)
- Red *eps-transition* (change state, but don't scan text)
- Black *match transition* (change state and scan to next text char)
- Accept if any sequence of transitions ends in accept state.
                                \
                                after scanning all text characters

NFA corresponding to the pattern `((A*B|AC)D)`

```
-> = red eps-transition
=> = black match transition
/^ = red eps-transition
v/ = red eps-transition

              __             ____________
            v/  \v          /            \v
  0    1    2    3    4    5    6    7    8    9   10      11
  ( -> ( -> A => * -> B => |    A => C => ) -> D => ) -> Accept State
        \                      /^
         \____________________/
```
notes
* for *epsilon-transitions*, theres lots of places the machine can go without scanning any text. `0, 1, 2, 3, 6`.
* but we do have *match transitions* that scans text characters.

### Its got a bit of non-determinism what the machine will do next at A*


Q: Is `A A A A B D` matched by NFA?
A: Yes, because *some* sequence of legal transitions ends in state 11.

```
          A         A         A         A         B              D
0 -> 1 -> 2 => 3 -> 2 => 3 -> 2 => 3 -> 2 -> 3 -> 4 => 5 -> 8 -> 9 => 10 -> 11
            /                                   \                             \
    match transition:                       e-transition:                   accept state reached,
    scan to next input                      change state w/o match          all text scanned, pattern found.
    character and change state
```

Its true that some sequences end in wrong state or stall, but we assume the machine always guess the right one. e.g. if machines guessed there are 3 As, and try to go to B, it would get stuck b/c theres 4 As and it would not match.

## Non-determinism
Q. How to determine whether a string is matched by an automation?
*DFA* Deterministic -> easy because exactly one applicable transition.
*NFA* Nondeterministic -> can be several applicable transitions; need to select the right one!

Q. How to simulate NFA?
A. Systematically consider *all* possible transition sequences.


# 3 NFA Simulation

## NFA representation
*State names*. Integers from 0 to M.
                                  \
                                  number of symbols in RE

*Match-transitions*. Keep regular expression in array re[].

*e-transitions*. Stored in a digraph G
0->1,1->2,1->6,2->3,3->2,3->4,5->8,8->9,10->11

Q. How to efficiently simulate an NFA
A. Maintain set of *all* possible state that NFA could be in after reading in the first **i** text characters.

## Steps
1. all state reachable after reading **i** symbols
2. possible transitions on reading **i+1**st symbol *c*
3. possible null transitions before reading next symbol
4. all states reachable after reading **i+1** symbols

## Demo

input: A A B D

```
-> = red eps-transition
=> = black match transition
/^ = red eps-transition
v/ = red eps-transition

              __             ____________
            v/  \v          /            \v
  0    1    2    3    4    5    6    7    8    9   10      11
  ( -> ( -> A => * -> B => |    A => C => ) -> D => ) -> Accept State
        \                      /^
         \____________________/
```
1. initially, by e-transion, we can get to `0,1,2,3,4,6`, without scanning a single character
2. next thing to do is to read the *A* in either state 2 or 6, those are gonna be match transitions,
  Matches 1st A
3. state reachable after reading A is cases 3 and 7.
4. by epsilon transitions 3 can go to `2,3,4`,
5. 3 will match another A
  Matches 2nd A
6. 7 cannot match so that's gone, now we can match `2,3,4`
7. only state 4 matches B
  Matches 3rd B
8. end up in state 5. *|*, with e-transition to `5,8,9`.
9. match transition matches D on 9
  Matches 4th D
10. end up in 10, now we follow e-transition, which take us to 11, accept state.

## Digraph reachability
*Digraph reachability*. Find all vertices reachable from a given source or set of vertices.

```java
public class DirectedDFS {
  DirectedDFS(Digraph G, int s) // find vertices reachable from s
  DirectedDFS(Digraph G, Iterable<Integer> s) // find vertices reachable from sources
  boolean marked(int v)   // is v reachable from source(s)?
}
```
*Solution*. Run DFS from each source, without unmarking vertices.
*Performance* Runs in time proportional to E + V. (number of edges + number of vertices)


## Actual Implementation
```java
public class NFA {
  private char[] re;      // match transitions
  private Digraph G;      // epsilon transition digraph
  private int M;          // number of states

  public NFA(String regex) {
    M = regexp.length();
    re = regexp.toCharArray();
    G = buildEpsilonTransitionDigraph();
  }

  // return true or false by simulating the operation
  public boolean recognizes(String txt) {
    Bag<Integer> pc = new Bag<INteger>();           // set of all possible states NFA could be in. (program powder)
    DirectedDFS dfs = new DirectedDFS(G, 0);        // states reachable from start by e-transition
    for (int v = 0; v < G.V(); v++)
      if (dfs.marked(v)) pc.add(v);                 // put all states you can get to into the `pc`

    for (int i = 0; i < txt.length(); i++) {
      Bag<Integer> match = new Bag<Integer>();      // state reachable after scanning past txt.charAt(i)
      for (int v : pc) {
        if (v == M) continue;                       // if we reached accept state, we continue
        if ((re[v] == txt.charAt(i)) || re[v] == '.')   // if match text character at v, we goto v+1, `match transition`. == '.' means dont care match.
          match.add(v+1);                           // if we have a match, put next state into match
      }

      dfs = new DirectedDFS(G, match);          // build another dfs, marks all states you can reach by starting in the states in match
      pc = new Bag<Integer>();                  // rebuilding pc
      for (int v = 0; v < G.V(); v++)         // follow e-transitions
        if (dfs.marked(v)) pc.add(v)            // put all the states you can get to via `e-transition`
    }

    for (int v : pc)
      if (v == M) return true;                  // accept if can end in state M
    return false;
  }

  public Digraph buildEpsilonTransitionDigraph() {
    Digraph G = new Digraph(M+1)                        // build diagraph + 1 accep state
    Stack<Integer> ops = new Stack<Integer>();            // maintain a stack
    for (int i = 0; i < M; i++) {
      int lp = i;
      if (re[i] == '(' || re[i] == '|') ops.push(i);      // left parenthesis and |, we put on stack

      else if (re[i] == ')') {                            // right parenthesis, we pop, if its or, we put two edges to skip or
        int or = ops.pop();
        if (re[or] == '|') {
          lp = ops.pop();
          G.addEdge(lp, or + 1);
          G.addEdge(or, i);
        }
        else lp = or;
      }

      if (i < M-1 && re[i+1] == '*') {                    // closure (needs 1-character lookahead)
        G.addEdge(lp, i+1);
        G.addEdge(i+1, lp);
      }

      if (re[i] == '(' || re[i] == '*' || re[i] == ')')     // metasymbols
        G.addEdge(i, i+1);
    }
    return G;
  }
}
```

## Analysis
*Proposition* Determin whether an N-character text is recognized by the NFA corresponding to an M-character pattern takes time proportional to `M N` in the worst case.

*Pf*. For each of the *N* text characters, we iterate through a set of states of size no more than *M* and run DFS on the graph of `e-transitions`.

## Analysis
*Proposition* Building the NFA corresponding to an M-character RE takes time and space proportional to M

*Pf* for each of the M characters in the RE, we add at most three `e-transition` and execute at most two stack operations.

# 4 NFA Construction
## Build an NFA corresponding to an RE
*State*. include a state for each symbol in the RE, plus an accept state
*Concatenation*. Add match-transition edge from state corresponding to characters in the alphabet to next state
  *Alphabet* `A B C D`
  *Metacharacters* `( ) . * |`
*Parenthesis* Add `e-transition` edge from parentheses to the next state
*Closure* Add three `e-transition` edges for each * operator

    A* becomes

```
      __
    v/  \v
    A => * ->
```

  (...)* becomes

```
      _______
    v/       \v
    ( ..... ) * ->
```

*Or* Add two `e-transition edges for each | operator

  (___|___) becomes

```
            _____
           /     \v
  ( _ _ _ | _ _ _ )
   \_______/^
```

## Implementation

*Challenges* Remember left parentheses to implement closure and or; remember | to implement or.
*Solution*. Maintain a stack

- Alphabet symbol, add *match transition* to next state
                  do one-character lookahead: add `e-transition` if next character is *.
- (, push ( onto stack.
- |, push | onto stack.
- ), pop corresponding ( and possibly intervening |: add `e-transition` edges for closure/or
    also do one char lookahead to add `e-transition` if next character is *.

# 5 Applications

## Grep

`SIMPLE!`: Try using regex to match each line, if it match then return.

Implementation:

```java
public class GREP {
  public static void main(String[] args) {
    String regex = "(.*" + arg[0] + ".*)";
    NFA nfa = new NFA(regexp);
    while(StdIn.hasNextLine()) {
      String line = StdIn.readLine();
      if (nfa.recognizes(line))
        StdOut.println(line);
    }
  }
}
```

## Harvesting Information

```java
...
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(input);
while (matcher.find()) {// find next match
  StdOut.println(matcher.group()) // return substring most recently found by find.
}
...
```



### - miscellaneous notes

### Not-so-regular expressions / Back-references
`\1` - matches the subexpression that was matched earlier
(.+)\1 - beriberi couscous
1?$|^(11+?)\1+ // 1111 111111 111111111

Problems: (non-regular languages)
- Strings of the form `ww` for some string `w: beriberi`!?
- Unary strings with a composite number of 1s `11111`
- Can't Bitstrings with equal number of 0s and 1s `01110100`.
- Can't do palindrome `atttcggaat`.
- if not regular, then no NFA to correspond to them.
- No guaranteed performances when theres back references.


### Greedy vs Reluctant
<blink>text</blink>some text<blink>more text</blink>

Regex: `<blink>.*</blink>`
Reluctant match two of them: ['<blink>text</blink>', '<blink>more text</blink>']
Greedy matches everything: ['<blink>text</blink>some text<blink>more text</blink>']
