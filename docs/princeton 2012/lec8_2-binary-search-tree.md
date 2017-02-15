# 8.6 Deletion in Binary Search Trees

## Lazy approach
To remove a node with a given key:
- set its value to `null`
- Leave key in tree to guide searches (but don't consider it equal in search).

Mark the the node as a tombstone,
**Cost** `~2lnN'` per insert, search, and delete (if keys in random order), where `N'` is the number of key-value pairs ever inserted in the BST.

As long as there aren't too many deletion, deletion and insertion is Logarithms.
But it is inconvenient to manage large amount of tombstones in highly dynamic situations, eventually you will get overload of memory, and will need to clean out the tombstones.


## Take a look at simpler situation
## Deleting the minimum (of the entire tree)

To delete the minimum key:
- Go left until finding a node with a null left link.
- Replace that node by its right link.
- Update subtree counts.

## Implementation
```java
public void deleteMin() {
  root = deleteMin(root);
}

private Node deleteMin(Node x) {
  if (x.left == null) return x.right; // set x.left = x.right
  x.left = deleteMin(x.left);             // recursion
  x.count = 1 + size(x.left) + size(x.right); // update count
  return x;
}
```


## Hibbard deletion
To delete a node with key `k`: search for node `t` containing key `k`

Case 0. [0 children] Delete `t` by setting parent link to null.

Case 1. [1 child] Delete `t` by replacing parent link.

Case 2. [2 children]
- find successor x of t (t is the node to be deleted)
- Delete the minimum in `t`'s right subtree
- Put `x` in `t`'s spot


## Implementation of Hibbard deletion
```java
public void delete(Key key) {
  root = delete(root, key)
}

private node delete(Node x, Key key) {
  if (x == null) return null;

  int cmp = key.compareTo(x.key);
  if      (cmp < 0) x.left  = delete(x.left, key);  // search for key
  else if (cmp > 0) x.right = delete(x.right, key);

  else { // equal                  
    if (x.right == null) return x.left;         // no right child, left is returned

    Node t = x;
    x = min(t.right)
    x.right = deleteMin(t.right);               // replace with successor
    x.left = t.left;
  }
  x.count = size(x.left) + size(x.right) + 1;   // update subtree counts
  return x;
}
```


## Hibbard Deletion is Not Symmetric, takes successor all the time puts the tree in a unbalanced state becomes:
       /\
      /\
     /\
    /\
   /\
  /\

**Surprising consequences**, after a certain number of insertions and deletes, Operations becomes sqrt(N).
