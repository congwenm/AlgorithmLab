require_relative './running_median'
require 'rspec/autorun'

describe RunningMedian do
  before { @rm = RunningMedian.new }

  it "should return the running median" do
    @rm.add(1)
    p "LEVEL 1: ", @rm.min_h, @rm.max_h
    expect(@rm.get_median).to eq 1

    @rm.add(2)
    p "LEVEL 2: ", @rm.min_h, @rm.max_h
    expect(@rm.get_median).to eq 1.5

    @rm.add(3)
    p "LEVEL 3: ", @rm.min_h, @rm.max_h
    expect(@rm.get_median).to eq 2

    @rm.add(4)
    p "LEVEL 4: ", @rm.min_h, @rm.max_h
    expect(@rm.get_median).to eq 2.5

    @rm.add(5)
    p "LEVEL 5: ", @rm.min_h, @rm.max_h
    expect(@rm.get_median).to eq 3

    p "before LEVEL 6: ", @rm.min_h, @rm.max_h
    @rm.add(6)
    p "LEVEL 6: ", @rm.min_h, @rm.max_h
    expect(@rm.get_median).to eq 3.5
  end
end

