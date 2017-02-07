require 'benchmark'

n = 50_000

arr = %w(hello world all of you)
match = %w(hello)

Benchmark.bm(1) do |x|
  x.report do
    for i in 1..n
      arr.select{|s| match.include?(s)}
    end
  end

  x.report do
    for i in 1..n
      arr & match
    end
  end
end
