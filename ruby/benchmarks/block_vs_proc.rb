require 'benchmark/ips'

arr = [*1..100]
Benchmark.ips do |x|
  x.report 'block' do
    arr.map{|item| item.to_s}
  end

  x.report 'proc symbol' do
    arr.map(&:to_s)
  end
end

# Warming up --------------------------------------
#                block     5.857k i/100ms
#          proc symbol     6.186k i/100ms
# Calculating -------------------------------------
#                block     65.182k (±13.7%) i/s -    322.135k in   5.057254s
#          proc symbol     73.617k (±10.7%) i/s -    364.974k in   5.027090s