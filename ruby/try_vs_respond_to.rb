require 'benchmark'
require 'active_support/all'

class MyClass; include ActiveSupport; end
obj = MyClass.new

n = 50_000

Benchmark.bm(7) do |x|
  x.report do
    for i in 1..n
      obj.try(:name)
    end
  end

  x.report do
    for i in 1..n
      obj.name if obj.respond_to?(:name)
    end
  end
end
