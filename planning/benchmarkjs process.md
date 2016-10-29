borrowed from http://monsur.hossa.in/2012/12/11/benchmarkjs.html

## Termination

Benchmark.js aims to run a test as fast as possible without sacrificing accuracy. It finds this sweet spot by running a few cycles to get a sense of how long the test runs. I call this the analysis phase. It starts by dipping its toes in the water with a few iterations, and then continues to increase the number of iterations until it reaches a percent uncertainty of at most 1% (or a min time or max time is reached, if specified by the user).

[ ] look for the max time setting


## Terminology

#### Cycle 
Each run of the tests with multiple iterations, consist of two units (first unit is a test run to check for errors)

### 


## Method

#### Benchmark#.count - iterations per *cycle*

#### Benchmark#.stats.sample - sampling phase runs the tests and stores the results of each cycle in here

#### Benchmark#.cycles - stores numbers of cyles run during analysis phase

#### Benchmark#.stats.sample - numbers of cycles run during sampling phase

#### Benchmark#.stats - stores result, calculated and updated after each cycle.

#### Benchmark#.hz - calculated number of iterations per second. (JSperf.com)

#### Benchmark#stats - various stats, mean, margin of error, standard deviation etc.

#### Benchmark#times - various timing related stats.


## Events

#### onStart - Called once, before the entire benchmark starts.
#### onCycle - Called after each cycle completes. Fires during both the analysis and sampling phases.
#### onComplete - Called once, after the entire benchmark completes.
#### onError - Called if the JS code has an error.
#### onAbort - Called if the test is aborted.
#### onReset - Reset properties (and abort if running).


Finally, benchmarks can also be organized into a suite. A suite is a collection of benchmarks, and is useful for grouping benchmarks. A suite has methods to operate over its benchmarks (such as forEach), as well as an analogous set of events that operate at the suite level (for example, onCycle is called after each benchmark completes).

hope this gives a good introduction to what happens when runnning a benchmark.js test. To recap, here's an outline of how a test is executed:

For each benchmark in a suite:
Fire event: Suite.onStart()
For each benchmark:
Fire event: Benchmark.onStart()
For each sampled run
Run unit once to check for errors
setup()
testfn()
teardown()
Run unit multiple times and measure results
setup()
for each Benchmark.count
testfn()
teardown()
Fire event: Benchmark.onCycle()
Fire event: Benchmark.onComplete()
Fire event: Suite.onCycle()
Fire event: Suite.onComplete()

I hope this gives a good introduction to what happens when runnning a benchmark.js test. To recap, here's an outline of how a test is executed:

- For each benchmark in a suite:
  - Fire event: Suite.onStart()
  - For each benchmark:
    - Fire event: Benchmark.onStart()
    - For each sampled run
      - Run unit once to check for errors
        - setup()
        - testfn()
        - teardown()
      - Run unit multiple times and measure results
        - setup()
        - for each Benchmark.count
          - testfn()
        - teardown()
      - Fire event: Benchmark.onCycle()
    - Fire event: Benchmark.onComplete()
    - Fire event: Suite.onCycle()
  - Fire event: Suite.onComplete()