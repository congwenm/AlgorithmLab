require_relative "./min_max_heap"
require 'rspec/autorun'

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
