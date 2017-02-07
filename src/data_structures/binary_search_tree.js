// based on https://www.cs.princeton.edu/~rs/AlgsDS07/08BinarySearchTrees.pdf

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
}


// references the root node
export default class BinarySearchTree extends BSTNode{
  constructor(props) {
    // creates a node that references other nodes
    if (Array.isArray(props)) {
      var [ root, ...children ] = props
      super(root)
      children.forEach(node => this.put(node))
    }
    else {
      super(props)
    }
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
        if (this.right) {
          xNode = this.right
        }
        else {
          xNode.right = new BSTNode(params); return xNode.right;
        }
      }
    }
  }

  put_recursive() {
    // challenge
  }

  get_recursive() {
    // challenge
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
}
