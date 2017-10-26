require 'benchmark/ips'
require 'active_support/all'

class MyClass; include ActiveSupport; end
obj = MyClass.new


Benchmark.ips do |x|
  x.report 'try' do
    obj.try(:name)
  end

  x.report 'respond_to' do
    obj.name if obj.respond_to?(:name)
  end
end

# Warming up --------------------------------------
#                   try             188.746k i/100ms
#                   respond_to      241.457k i/100ms
# Calculating -------------------------------------
#                   try             2.949M (±12.5%) i/s -     14.533M in   5.014803s
#                   respond_to      6.508M (±16.1%) i/s -     31.389M in   5.017087s