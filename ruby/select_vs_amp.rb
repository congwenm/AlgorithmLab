require 'benchmark/ips'

arr = %w(hello world all of you kajdf adfs asd fa sdf sadf sad fasd fasdf adsf)
match = %w(hello world)

Benchmark.ips do |x|
  x.report 'includes?' do
    arr.select{|s| match.include?(s)}
  end

  x.report 'intersect' do
    arr & match
  end

  x.report 'array includes?' do
    arr.select{|s| %w(hello).include?(s)}
  end
end

# Warming up --------------------------------------
#            includes?        46.250k i/100ms
#            intersect        50.773k i/100ms
#            array includes?  28.561k i/100ms
# Calculating -------------------------------------
#            includes?        450.948k (±14.5%) i/s -      2.220M in   5.035119s
#            intersect        693.669k (±10.8%) i/s -      3.453M in   5.056963s
#            array includes?  325.763k (±17.6%) i/s -      1.571M in   5.007508s