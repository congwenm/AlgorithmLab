# Tries
A tree-like but straight structures that loads each node with 1 character so when you look up a word, it will go node to node looking for matching patterns:

say you want to look up `sea`, it would traverse down the right path for each letter until it finds the final char `a` (match) OR (mismatch) a mismatch char or a `null` node.

tree content: ['shoe', 'see', 'sea']
 	   `s`
  	  / |
   `e` h
  / |  |
`a` e  e
       |
       o

# Ternary Search Tries
Upgraded from the tries and is a combination of `binary search tree` and `tries`

for the same tree, it will look like:

 	    `s`
 	     |
	     h
      / |
   `e`  o
    |   |
    e   e
   /|\ /|\
 `a`

1. check `s` match first node
2. check `s`.bottom for `e`, found `h`, `e < h`, go to `bottom.left`, match `e`
3. check `e`.bottom for `a`, found `e`, `a < e`, go to `bottom.left`, match `a`
4. end of string, return `a`.


# Third part
```java
public class StringST<Value> {
  void put(String key, Value val);
  Value get(String key);
  void delete(String key);

  Iterable<String> keys();
  Iterable<String> keysWithPrefix(String s);
  // keys where `s` ia a prefix

  Iterable<String> keysThatMatch(String s);
  // keys that match `s` (where . is a wild card)

  String longestPrefixOf(String s);
  // - longest key that is a prefix of `s`
  // - router uses this to determine the longest prefixed ip address, if you want to get to `128.112.136.11`,
  //     router will try to get the longest prefix match to get you to something far like `128.112.136`

  // Pseudo:
  //  search for query string
}
```

## Patricia Trie

- remove one-way branching
- each node represent a sequence instead of a single character
- implementation: NOT shown

## Conclusion
TST have less null nodes? b/c in Tries, each node have the radix amount of `null` nodes (e.g. 26 nodes for words, 256 for ascii).