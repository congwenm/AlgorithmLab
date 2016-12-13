# Vocabular
NFA

# 20.4 Applications

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
