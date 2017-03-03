// based on
// https://www.cs.princeton.edu/~rs/AlgsDS07/08BinarySearchTrees.pdf

export class BSTNode {
  /**
   * key - string
   * value - anything
   * left - BSTNode
   * right - BSTNode
   */
  constructor({ key, value, left, right}) {
    this.key = key
    this.value = value || key
    if (left) this.left = left
    if (right) this.right = right
  }

  put_recursive(xNode, key, value) {
    // challenge
    if (xNode == null)        { return new BSTNode({ key, value }) }
    if (xNode.key == key)     { xNode.value = value }
    else if (xNode.key < key) { xNode.right = this.put_recursive(xNode.right, key, value) }
    else                      { xNode.left = this.put_recursive(xNode.left, key, value) }
    return xNode;
  }

  get_recursive(key) {
    // challenge
    if (key == this.key) { return this.value }
    else if (key > this.key) { return this.right ? this.right.get_recursive(key) : null }
    else { return this.left ? this.left.get_recursive(key) : null }
  }

  // Inorder traversal
  iterate(callback) {
    this.left && this.left.iterate(callback)
    callback(this)
    this.right && this.right.iterate(callback)
  }

  // Inorder collection
  get all() {
    let coll = []
    this.iterate(n => coll.push(n))
    return coll
  }

  put(params) {
    const { key, value } = params;
    let xNode = this// node
    while(xNode !== null) {
      if (key === xNode.key) { // updating existing value
        xNode.value = value; return xNode;
      }
      else if (key < xNode.key) { // add node on left or go to the left node and continue
        if (xNode.left) {
          xNode = xNode.left
        }
        else {
          xNode.left = new BSTNode(params); return xNode.left;
        }
      }
      else /* key > xNode.key */ { // add node on right or go to the right node and continue
        if (xNode.right) {
          xNode = xNode.right
        }
        else {
          xNode.right = new BSTNode(params); return xNode.right;
        }
      }
    }
  }

  get(key) {
    let x = this
    while(x.key !== null) {
      if(x.key === key) { return x.value }
      else if(x.key < key)    { x = x.right }
      else /* x.key > key */  { x = x.left }
    }
    return null;
  }

  delete_first_approach() {
    // 0 children, jujst remove
    // 1 children, pass children up to parent
    // 2 children, find largest of the two using right-left swap with next largest, remove
  }

  delete_randomized(node, key) { // extremely complicated
    // - remove node
    // - join remaining subtress and make a tree

    // private Node remove(Node x, Key key)
    // {
    //  if (x == null)
    //  return new Node(key, val);
    //  int cmp = key.compareTo(x.key);
    //  if (cmp == 0)
    //  return join(x.left, x.right);
    //  else if (cmp < 0)
    //  x.left = remove(x.left, key);
    //  else if (cmp > 0)
    //  x.right = remove(x.right, key);
    //  return x;
    // }
    if (node == undefined) return new BSTNode({key, value})

    if (this.key === node.key) {
      // join(node.left, node.right)
      // node with only one child or no child
      if (node.left == NULL) {
        return node.right
      }
      else if (node.right == NULL) {
        return node.left
      }

      // node with two children: get the inorder successor (smallest in the right subtree)
      smallest = node.right.smallest
      Object.assign(this, smallest)
    }
    else if (this.key < node.key) {
      node.left = this.remove(node.left, this.key)
    }

    // if the key to be deleted is greater than the root's key
    else if (this.key > node.key) {
      node.right = this.remove(node.right, this.key)
    }
    return node
  }
}


// references the root node
export default class BinarySearchTree extends BSTNode{
  constructor(props) {
    // creates a node that references other nodes
    if (Array.isArray(props)) {
      var [ root, ...children ] = props
      // this doesn't seem to work with current babel-node@6.22.2
      if (typeof root !== 'object') {
        root = { key: root }
        children = children.map(node => ({ key: node }))
      }
      super(root)
      children.forEach(node => this.put(node))
    }
    else {
      super(props)
    }
  }

  view() {
    this.key
  }
}
