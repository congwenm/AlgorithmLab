import BST, { BSTNode } from '../../src/data_structures/binary_search_tree'

fdescribe(BST, () => {
  let bst
  beforeEach(() => {
    bst = new BST([1,2,3,4,5]);
  })

  it('should have symmetry in the exact order of', () => {
    expect(bst.value).toBe(3);
    expect(bst.left).toBe(2);
    // expect(bst.left.left).toBe(1);
    // expect(bst.right).toBe(1);
  })

  fdescribe('constructor', () => {
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

  fdescribe('#iterate', () => {

  })
})
