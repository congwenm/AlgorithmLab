import BST, { BSTNode } from '../../src/data_structures/binary_search_tree'

describe(BST, () => {
  var bst
  describe('constructor', () => {
    describe('single constructor', () => {
      it('should construct a single node', () => {
        bst = new BST({ key: 5 })
        expect(bst.key).toBe(5)
      })
    })

    describe('mass constructor', () => {
      it('should construct a single root with multiple child', () => {
        bst = new BST([{ key: 5 }, { key: 3 }, { key: 4 }])
        expect(bst.key).toBe(5)
        expect(bst.left.key).toBe(3)
        expect(bst.left.right.key).toBe(4)
      })
    })

    describe('mass values', () => {
      it('should construct a single root with multiple child', () => {
        bst = new BST([3,2,1]) //doesnt work?!
        expect(bst.value).toBe(3)
        expect(bst.left.value).toBe(2)
        expect(bst.left.left.value).toBe(1)
      })
    })

    describe('smallest to largest', () => {
      it('should construct a tree with only right children', () => {
        bst = new BST([1,2,3])
        expect(bst.value).toBe(1)
        expect(bst.right.value).toBe(2)
        expect(bst.right.right.value).toBe(3)
      })
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      bst = new BST({ key: 5, value: 'start' })
      bst.left = new BSTNode({ key: 4, value: 'target 4' })
      bst.left.left = new BSTNode({ key: 3, value: 'target 3' })
      bst.left.left.left = new BSTNode({ key: 2, value: 'target 2' })
    })

    it('should be able to find a match', () => {
      expect(bst.get(4)).toBe('target 4')
      expect(bst.get(3)).toBe('target 3')
      expect(bst.get(2)).toBe('target 2')
    })

    it('BSTNode#get_recursive', () => {
      expect(bst.get_recursive(4)).toBe('target 4')
      expect(bst.get_recursive(3)).toBe('target 3')
      expect(bst.get_recursive(2)).toBe('target 2')
    })
  })

  describe('#put', () => {
    beforeEach(() => {
      bst = new BST({ key: 5, value: 'start' })
      bst.put({ key: 4 })
      bst.put({ key: 2 })
      bst.put({ key: 3 })
      bst.put({ key: 1 })
    })

    it('should be able to find a match', () => {
      expect(bst.left.value).toBe(4)
      expect(bst.left.left.value).toBe(2)
      expect(bst.left.left.right.value).toBe(3)
      expect(bst.left.left.left.value).toBe(1)
    })
  })

  describe('BSTNode#put_recursive', () => {
    beforeEach(() => {
      bst = new BST({ key: 5, value: 'start' })
      bst.put_recursive(bst, 4, 4) // Node, key, value
      bst.put_recursive(bst, 2, 2) // Node, key, value
      bst.put_recursive(bst, 3, 3) // Node, key, value
      bst.put_recursive(bst, 1, 1) // Node, key, value
    })

    it('should be able to find a match', () => {
      expect(bst.left.value).toBe(4)
      expect(bst.left.left.value).toBe(2)
      expect(bst.left.left.right.value).toBe(3)
      expect(bst.left.left.left.value).toBe(1)
    })
  })

  describe('put dependencies', () => {
    beforeEach(() => {
      bst = new BST({ key: 5, value: 'start' })
      bst.put({ key: 4 })
      bst.put({ key: 2 })
      bst.put({ key: 3 })
      bst.put({ key: 1 })
    })

    describe('#iterate', () => {
      it('should iterate through all the nodes', () => {
        let coll = []
        bst.iterate(node => coll.push(node))
        expect(coll.map(item => item.key)).toEqual([1,2,3,4,5])
      })

      it('should iterate IN ORDER', () => {
        let coll = []
        new BST([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]).iterate(node => coll.push(node))
        expect(coll.map(item => item.key)).toEqual([1,2,3,4,5,6,7,8,9,10])
      })
    })
  })

  xdescribe('#delete_randomized', () => {
    beforeEach(() => {
      bst = new BST([1,2,3,4,5,6,7,8,9,10])
    })

    it('should delete the node', () => {
      bst.delete_randomized(bst, 4)
      expect(bst.all.map(n => n.value)).toEqual([1,2,3,5,6,7,8,9,10])
    })
  })
})
