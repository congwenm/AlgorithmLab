# You need two heaps: one min-heap and one max-heap. Each heap contains about one half of the data. Every element in the min-heap is greater or equal to the median, and every element in the max-heap is less or equal to the median.
#
# When the min-heap contains one more element than the max-heap, the median is in the top of the min-heap. And when the max-heap contains one more element than the min-heap, the median is in the top of the max-heap.
#
# When both heaps contain the same number of elements, the total number of elements is even. In this case you have to choose according your definition of median: a) the mean of the two middle elements; b) the greater of the two; c) the lesser; d) choose at random any of the two...
#
# Every time you insert, compare the new element with those at the top of the heaps in order to decide where to insert it. If the new element is greater than the current median, it goes to the min-heap. If it is less than the current median, it goes to the max heap. Then you might need to rebalance. If the sizes of the heaps differ by more than one element, extract the min/max from the heap with more elements and insert it into the other heap.
#
# In order to construct the median heap for a list of elements, we should first use a linear time algorithm and find the median. Once the median is known, we can simply add elements to the Min-heap and Max-heap based on the median value. Balancing the heaps isn't required because the median will split the input list of elements into equal halves.
#
# If you extract an element you might need to compensate the size change by moving one element from one heap to another. This way you ensure that, at all times, both heaps have the same size or differ by just one element.

require_relative '../data_structures/min_max_heap'
require 'byebug'

class RunningMedian
  attr_accessor :min_h, :max_h, :median
  def initialize
    @min_h = MinHeap.new
    @max_h = MaxHeap.new
  end

  def smallest_of_larger; @min_h.get_root; end
  def largest_of_smaller; @max_h.get_root; end

  def add(n)
    if (min_h.size + max_h.size) < 2
      min_h.h_push n
      max_h.h_push(min_h.extract_root) if min_h.size == 2
      return nil
    end

    if !median.nil? && n > median
      # add to min_h
      p "added n to min_h: #{n}"
      min_h.h_push(n)
    else
      # add to max_h
      p "added n to max_h: #{n}"
      max_h.h_push(n)
    end

    # balance
    if (diff = min_h.size - max_h.size) > 1
      # too many on min, move to max
      for i in [1..(diff / 2)] do
        max_h.h_push min_h.extract_root
      end
    elsif (diff = min_h.size - max_h.size) < -1
      for i in [1..(diff / 2)] do
        min_h.h_push max_h.extract_root
      end
    end
  end

  def get_median
    return min_h.first.to_f if (min_h.size + max_h.size) < 2

    size_comp = @min_h.size <=> @max_h.size
    @median = if size_comp == 1
      @min_h.get_root.to_f# min root is median b/c min has more
    elsif size_comp == -1
      @max_h.get_root.to_f # max root is median
    else
      (@min_h.get_root + @max_h.get_root) / 2.0
    end
  end
end

