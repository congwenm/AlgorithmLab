require_relative './running_median'
require 'benchmark/ips'

class SortedApproach
  def initialize() @arr = []; end
  def add(n); @arr << n; end
  def get_median
    sorted = @arr.sort
    len = sorted.length
    (sorted[(len - 1) / 2] + sorted[len / 2]) / 2.0
  end
end

def calculate_median(benchmark, klass, num_of_times)
  meth = klass.new
  (1..num_of_times).map { |n| meth.add(n) }

  benchmark.report "#{klass} x#{num_of_times}" do
    meth.get_median
  end
end

Benchmark.ips do |x|
  calculate_median(x, RunningMedian, 10)
  calculate_median(x, SortedApproach, 10)

  calculate_median(x, RunningMedian, 100)
  calculate_median(x, SortedApproach, 100)

  calculate_median(x, RunningMedian, 1000)
  calculate_median(x, SortedApproach, 1000)

  calculate_median(x, RunningMedian, 10_000)
  calculate_median(x, SortedApproach, 10_000)

  calculate_median(x, RunningMedian, 100_000)
  calculate_median(x, SortedApproach, 100_000)

  calculate_median(x, RunningMedian, 1_000_000)
  calculate_median(x, SortedApproach, 1_000_000)
end


# WITH SETUP
#    RunningMedian x10     24.820k (±13.6%) i/s -    122.832k in   5.033296s
#   SortedApproach x10    193.325k (±22.0%) i/s -    948.064k in   5.063744s
#   RunningMedian x100      1.673k (±12.5%) i/s -      8.256k in   5.006544s
#  SortedApproach x100     33.548k (±13.2%) i/s -    165.546k in   5.011631s
#  RunningMedian x1000    107.852  (±13.0%) i/s -    540.000  in   5.078758s
# SortedApproach x1000      3.986k (±13.9%) i/s -     19.604k in   5.002872s
# RunningMedian x10000      7.559  (±13.2%) i/s -     38.000  in   5.078887s
# SortedApproach x10000   441.684  (±13.8%) i/s -      2.184k in   5.033078s
# RunningMedian x100000     0.636  (± 0.0%) i/s -      4.000  in   6.293586s
# SortedApproach x100000   40.581  (±14.8%) i/s -    200.000  in   5.014935s
# RunningMedian x1000000    0.052  (± 0.0%) i/s -      1.000  in  19.339255s
# SortedApproach x1000000   4.056  (± 0.0%) i/s -     21.000  in   5.210310s


# WO SETUP, #get_median
# Warming up --------------------------------------
#    RunningMedian x10    63.813k i/100ms
#   SortedApproach x10    35.719k i/100ms
#   RunningMedian x100    67.831k i/100ms
#  SortedApproach x100    16.887k i/100ms
#  RunningMedian x1000    70.255k i/100ms
# SortedApproach x1000     4.002k i/100ms
# RunningMedian x10000    80.685k i/100ms
# SortedApproach x10000  442.000  i/100ms
# RunningMedian x100000   78.435k i/100ms
# SortedApproach x100000  43.000  i/100ms
# RunningMedian x1000000  77.453k i/100ms
# SortedApproach x1000000  3.000  i/100ms
# Calculating -------------------------------------
#    RunningMedian x10      1.057M (±24.2%) i/s -      5.041M in   5.048512s
#   SortedApproach x10    500.651k (±14.2%) i/s -      2.465M in   5.022755s
#   RunningMedian x100    946.531k (±12.3%) i/s -      4.680M in   5.025638s
#  SortedApproach x100    221.018k (±11.4%) i/s -      1.098M in   5.030971s
#  RunningMedian x1000    934.777k (±18.5%) i/s -      4.567M in   5.076342s
# SortedApproach x1000     33.497k (± 8.2%) i/s -    168.084k in   5.052261s
# RunningMedian x10000    835.310k (±12.6%) i/s -      4.115M in   5.017400s
# SortedApproach x10000     3.456k (±12.5%) i/s -     17.238k in   5.066473s
# RunningMedian x100000   994.449k (± 9.4%) i/s -      4.941M in   5.012067s
# SortedApproach x100000   322.640 (±11.2%) i/s -      1.634k in   5.132164s
# RunningMedian x1000000  944.088k (±10.9%) i/s -      4.725M in   5.058353s
# SortedApproach x1000000   33.862 (± 8.9%) i/s -    171.000  in   5.077914s