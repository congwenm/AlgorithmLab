require 'benchmark/ips'
class MyObject
  def initialize(num1)
    @num1 = num1
  end

  def add(num2)
    @num1 + num2
  end
end

def func(num1, num2)
  num1 + num2
end
meth = method(:func)

Benchmark.ips do |x|
  x.report 'object' do
    MyObject.new(1).add(2)
  end

  x.report 'curry' do
    meth.curry[1][2]
  end

  x.report 'nothing' do
    func(1, 2)
  end
end

# Warming up --------------------------------------
#               object   157.856k i/100ms
#                curry    38.085k i/100ms
#              nothing   278.128k i/100ms
# Calculating -------------------------------------
#               object      3.694M (± 8.2%) i/s -     18.469M in   5.039127s
#                curry    443.786k (± 8.5%) i/s -      2.209M in   5.032007s
#              nothing      8.721M (± 5.0%) i/s -     43.666M in   5.020586s