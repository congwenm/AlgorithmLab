require 'benchmark'

n = 50_000

arr = %w(hello world all of you kajdf adfs asd fa sdf sadf sad fasd fasdf adsf)
match = %w(hello world)

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

  x.report do
    for i in 1..n
      arr.select{|s| %w(hello).include?(s)}
    end
  end
end
