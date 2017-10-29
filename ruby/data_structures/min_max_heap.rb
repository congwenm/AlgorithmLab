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

