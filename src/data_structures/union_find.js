include('util');
// eager
class QuickFind {
  constructor (n, arranges) {
    this.id = util.expand(n)
    arranges.forEach(pair => this.unite(...pair))
  }

  find (p, q) { return this.id[p] === this.id[q] }

  unite (p, q) {
    var pid = this.id[p] // position p is pid
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pid) this.id[i] = this.id[q]
    }
  }
}

// lazy
class QuickUnion {
  constructor(n, arranges) {
    this.id = util.expand(n)
    arranges.map(pair => this.unite(...pair))
  }

  // keep looking for id[i]'s value until it matches i (found root)
  root (i) {
    while(i !== this.id[i]) i = this.id[i]
    return i;
  }
  find(p, q) { return this.root(p) === this.root(q) }
  // unite(p, q) { var i = this.root(p); var j = this.root(q); this.id[i] = j}
  unite(p, q) { this.id[this.root(p)] = this.root(q) }
}

// optimal
class WeightedQuickUnion extends QuickUnion{
  constructor(n, arranges) {
    // super(n, [])
    super(n, [])
    this.sz = util.expand(n).map(i => 1);
    arranges.forEach(pair => this.unite(...pair)) // need to specifically call this again so super.unite doesnt get used.
  }

  unite(p, q) {
    var i = this.root(p); var j = this.root(q);
    if (this.sz[i] < this.sz[j]) { // merge smaller (i) into larger (j)
      this.id[i] = j;
      this.sz[j] += this.sz[i]
    }
    else {
      this.id[j] = i;
      this.sz[i] += this.sz[j]
    }
  }
}

export default {
  QuickFind,
  QuickUnion,
  WeightedQuickUnion,
}