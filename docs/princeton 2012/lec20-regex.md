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


# 4 Applications

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
