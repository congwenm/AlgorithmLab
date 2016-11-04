const { floor, log, pow } = Math

export default function Heap() {
  // we assume that array starts with index 1, 
  // so `left_child` is `2k`, and `right_child` is `2k + 1`,  parent at `k/2`
  this.q = [null]; 
}

Heap.prototype.insert = function(new_value) {
  this.q[this.q.length]
  this.bubble_up()
}

Heap.prototype.bubble_up = function(p) {
  if (this.p) === -1) return; // at root of heap, no parent
  if(this.getParent(p))
}

Heap.prototype.getParent = function(n) {
  if (n === 1) {
    return -1
  } else {
    return floor(n / 2);
  }
}

Heap.prototype.getChildren() = function(n) {
  return 2 * n;
}