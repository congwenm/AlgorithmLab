# 1. Intro

examples: use 2 bit encoding to store genomic databases

## Standard ASCII encoding:

```
char  hex   binary
A     41    01000001
C     43    01000011
T     54    01010100
G     47    01000111
```

consumes 4x space as 2 bit encoding

```
char  binary
A     00
C     01
T     10
G     11
```

## Standard date representation

- character stream

  StdOut.print(month + "/" + day + "/" + year);
  // 80 bits

- 3 ints
  BinaryStdOut.write(month);
  BinaryStdOut.write(day);
  BinaryStdOut.write(year);
  // 96 bits

- 4-bit month, 5-bit day and 12-bit for year
  BinaryStdOut.write(month, 4);
  BinaryStdOut.write(day, 5);
  BinaryStdOut.write(year, 12);
  // 21 bits + 3 bits for byte alignment at close
  // winner, almost 4x less

## Implmentation of Run-length encoding,

```java
public class RunLength {
  private final static int R = 256;
  private final static int lgR = 8;
  public static void compress() { /* not given, see textbook */ }
  public static void expand() {
    boolean bit = false;
    while(!BinaryStdIn.isEmpty()) {
      int run = BinaryStdIn.readInt(lgR); // read 8 bit count from standard input
      for (int i = 0; i < run; i++)
        BinaryStdOut.write(bit);
      bit = !bit;                         // switch bit from 1 to 0 (true to false) and vice versa
    }
    BinaryStdOut.close();                 // pad 0s for bye alignment
  }
}
```


### No algorithm can compress every bitstring. otherwise all bitstrings can be compressed to 0 bits

# 2. Run-length corresponding

use for bitstream, when there's a long running sequence of 0s or 1s.

```
000000000000000000011111110000000111111111111 // 40 bits

encodes to

1111_0111_0111_1011     // 16 bits
-------------------
15   7    7    11

in the example, we are using 4 bits to store each running sequence, real applications might use 8 bits.
```


# 3. Huffman Algorithm

count frequency for each character in input
use fewer bits to encode A and more to encode others.

input: A B R A C A D A B R A !

use one node for each character

1. use left branch to point to frequency,

```
  A
 /
5

  C
 /
1

  !
 /
1
etc...
```


2. Select two tries with min weight
3. Merge into single trie with cumulative weight
```
   [2]
   /\
  0  1
 /    \
!      C
```

- the left is always 0
- right is always 1

4. keep doing this for all others.
5. Stop when you have one Trie.

NOTE: highest frequency is added in late, nearer the root

Encode them by their position going down the trie.

```
     /      \
    0        1...
   / \
  0   1
 /\  / \
f a  b  c
```

char encode
a       001
b       010
c       011
f       000


## Summarize
Q. How to find best prefix-free code?

1. Count frequency `freq[i]` for each char `i` in input.
2. Start with one node corresponding to each char `i` (with weight `freq[i]`)
3. Repeat until single trie formed:
  - select two tries with min weight `freq[i]` and `freq[j]`
  - merge into single trie with weight `freq[i] + freq[j]`



## Implementation
```java
private static Node buildTrie(int[] freq) {
  MinPQ<Node> pq = new MinPQ<Node>();
  // initialize PQ with singleton tries
  for (char i = 0; i < R; i++) {
    if (freq[i] > 0) {
      pq.insert(new Node(i, freq[i], null, null));
    }
  }

  while(pq.size() > 1) { // merge two smallest tries
    Node x = pq.delMin();
    Node y = pq.delMin();
    // \0 - not used for internal nodes
    // x.freq + y.freq - total frequency
    // x, y - two subtries
    Node parent = new Node('\0', x.freq + y.freq, x, y);
    pq.insert(parent);
  }

  return pq.delMin();
}
```

## Optimal postfix-free code! Huffman proved it in 1950.


## Disadvantage
Two passes
Pass 1: tabulate char frequencies and build trie.
Pass 2: encode file by traversing trie (bottom up) or lookup table.

### Running time. Using a binary heap => N + R * log * R


# 4. Lempel-Ziv-Welch(LZW) Compression

review and summarize

## Statistical methods
- `Static model`. Same model for all text.
  * Fast
  * Not optimal: different texts have different statistical properties (e.g. one might have a lot of `a`s, another might have a lot of `z`s)
  * Ex: ASCII, Morse code

- For huffman we changed that rule, `Dynamic Model`. Generate model based on text.
  * preliminary pass needed to generate model.
  * Must tansmit the model.
  * Ex: Huffman code.

- (Now) Change the rule again, `Adaptive Model`. Progressively learn and update model as you read text.
  * More accurate modeling produces better compression.
  * Decoding must start from beginning.
  * EX: LZW.


## Demo for LZW compression example:
^ = look ahead to find
```
          A  B  R  A  C  A  D  A  B  R  A  B  R  A  B  R  A

result:   41 42 52 41 43 41 44 81    83    82    88       41

                               ^ABR  ^RAB  ^BRA
```

### Codeword table

key, value
A, 41
B, 42
C, 43
D, 44

AB, 81
BR, 82
RA, 83
AC, 84
CA, 85
AD, 86
DA, 87

Then it finds matches for `AB`, which encode as 81,
and looks ahead to find `ABR` and adds this to the codeword table (since `AB` already exist in the table, now it moves onto more greedy pattern searching):

ABR, 88
RAB, 89
BRA, 8A



## Steps for LZW compression
1. create Symbol Table associating W-bit codewords with string keys.
2. initialize ST with codewords for single-char keys.
3. Find longest string s in ST that is a prefix of unscanned part of input.
4. Write the W-bit codeword associated with s.
5. Add x + c to ST, where c is the next char in the input. (look ahead)

### Represent LZW compression code table with a `Trie`, b/c it support longest prefix match.
as we get deeper into the trie, the compression is more efficient, b/c we are using the same value to encode longer strings.



## Steps for LZW expansion
1. create ST associating string values with W-bit keys.
2. initialize ST to contain single char values.
3. Read a W-bit key.
4. Find associated string values in ST and write it out.
5. Update ST.

### Represent LZW expansion code table with an Array of size `2^W`


### Tricky case

compression:

```
input:    A   B   A   B   A   B   A
matches:
value     41  42  81      83
                  ^AB ^BA ^ABA
```

code table
```
key, value
A, 41
B, 42
C, 43
D, 44
AB, 81
BA, 82
ABA, 83
```

expansion:

`<` = looking back
```
                          v tricky situation, we need to know whats 83, but its not in the symbol table yet.
value:    41  42  81      83
output:   A   B   AB      
              <AB <BA     
```

code table
```
key, value
41, A
42, B
43, C
44, D

81, AB # obtained from looking back
82, BA
83, ABA # very tricky situation, not addressed by the author!? (could be `AB.{1}` or `B.{1}`)
```



## Implementation LZW compression

```java
public static void compress() {
  String input = BinaryStdIn.readString();      // read input as a string

  TST<Integer> st = new TST<Integer>();         // codewords for single char, radix R keys
  for (int i = 0; i < R; i++)
    st.put("" + (char) i, i);
  int code = R+1;                               // so our compression encoding can begin after R

  while (input.length() > 0) {             
    String s = st.longestPrefixOf(input);       // find longest prefix match s
    BinaryStdOut.write(st.get(s), W);           // write W-bit codeword for s
    int t = s.length();                         // get longest prefix length

    // author: scan past s in input
    if (t < input.length() && code < L)         // if longest prefix length is LESS THAN total input length and !? (code hasn't reach limit)
      st.put(input.substring(0, t+1), code++);  // then encode that prefix + the next char into the `st`
    input = input.substring(t);                 // cut off the encoded portion of the input
  }

  BinaryStdOut.write(R, W);                     // write "stop" codeword and close input stream.
  BinaryStdOut.close();
}
```


### LZW is widely used, variations include `LZ77, LZ78, Deflate, and o/c LZW itself`
