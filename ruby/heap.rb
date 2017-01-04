require 'byebug'

class MaxHeap < Array
  def h_push(item)
    p "h_pushing: #{item} into #{self}"
    self << item 
    bubble_up(size-1)
  end     

  def get_root
    self[0] 
  end

  def bubble_up(p)
    p_index = parent_indice(p)
    return nil if p_index == -1
    if compare_is_unstable(self[p_index], self[p])
      swap(p, p_index)
      bubble_up(p_index)
    end
  end

  def compare_is_unstable(i1, i2); i1 < i2; end

  def left_child_of(n); 2 * n + 1; end
  def right_child_of(n); 2 * n + 2; end

  def parent_indice(n) 
    n == 0 ? -1 : ((n-1)/2)
  end

  def swap(p1, p2)
    tmp = self[p1]
    self[p1] = self[p2]
    self[p2] = tmp
  end

  def extract_root
    return nil if size == 0  
    root = self[0]
    self[0] = pop()
    bubble_down 0
    root
  end

  def bubble_down(i)
    elem = self[i]
    while true do
      left_child_index = left_child_of(i)
      right_child_index = right_child_of(i)
      swap = nil

      if left_child_index < size
        left_child = self[left_child_index]
        if compare_is_unstable(elem, left_child)
          swap = left_child_index
        end
      end

      if right_child_index < size
        right_child = self[right_child_index]
        if compare_is_unstable((swap.nil? ? elem : self[left_child_index]), right_child)
          swap = right_child_index
        end
      end

      break if swap.nil?

      self[i] = self[swap]
      self[swap] = elem
      i = swap
    end
  end
end

class MinHeap < MaxHeap
  def compare_is_unstable(i1, i2); i1 > i2; end
end


describe MaxHeap do
  before { @heap = MaxHeap.new }
  it "should bubble up the largest value to the top" do
    @heap.h_push(1)
    expect(@heap.get_root).to eq(1)
    @heap.h_push(2)
    expect(@heap.get_root).to eq(2)
    expect(@heap).to eq [2,1]

    @heap.h_push 3
    expect(@heap.get_root).to eq(3)
    expect(@heap).to eq [3,1,2]

    @heap.h_push 4
    expect(@heap.get_root).to eq(4)
    expect(@heap).to eq [4,3,2,1]
  end

  it "should return 1st elem when invoke #get_root" do
    heap = MaxHeap.new
    heap.h_push 1
    heap.h_push 2
    heap.h_push 3
    expect(heap.get_root).to eq 3
  end

  it "extracts root alright" do
    heap = MaxHeap.new
    heap.push(6,5,4,3,2,1)
    expect(heap.extract_root).to eq 6
  end
end

describe MinHeap do
  before { @heap = MinHeap.new }
  it "should bubble up the smallest value to the top" do
    @heap.h_push(4)
    expect(@heap.get_root).to eq(4)
    @heap.h_push(3)
    expect(@heap.get_root).to eq(3)
    expect(@heap).to eq [3,4]

    @heap.h_push 2
    expect(@heap.get_root).to eq(2)
    expect(@heap).to eq [2,4,3]

    @heap.h_push 1
    expect(@heap.get_root).to eq(1)
    expect(@heap).to eq [1,2,3,4]
  end

  it "should return 1st elem when invoke #get_root" do
    heap = MinHeap.new
    heap.h_push 3
    heap.h_push 2
    heap.h_push 1
    expect(heap.get_root).to eq 1
  end

  it "should bubble up smallest value" do
    heap = MinHeap.new
    heap.push(3,4,5)
    heap.h_push(6)
    expect(heap).to eq [3,4,5,6]

    expect(heap.extract_root).to eq 3
    expect(heap).to eq [4,6,5]
  end
end
