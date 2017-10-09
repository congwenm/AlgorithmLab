require 'benchmark/ips'

num = 100
Benchmark.ips do |x|
  x.report 'no exception' do
    100.to_s
  end

  x.report 'exception caught' do
    begin
      100.toasdf
    rescue; end
  end

  # TODO: this is somehow optimized
  # run_exception  = -> { 100.toasdf }
  # x.report 'no handle' do
  #   begin
  #     run_exception
  #   rescue; end
  # end
end

# Warming up --------------------------------------
#         no exception   203.009k i/100ms
#     exception caught    32.155k i/100ms
# Calculating -------------------------------------
#         no exception      4.456M (±17.3%) i/s -     21.519M in   5.012756s
#     exception caught    383.727k (±16.2%) i/s -      1.865M in   5.018819s
