---
layout: sr
title: Experiments
brief: This chapter focuses on testing the PGE algorithm
prev: 05-enhancements
next: 07-conclusions
nextname: Conclusions
sections:
  - name: Overview
    tag: overview
    brief: Synopsis for the benchmarks and purposes
  - name: Measurements
    tag: measurements
    brief: Details of the what, how, and why of measurements
  - name: Evaluation Settings
    tag: settings
    brief: Details of the benchmarks and environmental setting
  - name: PGE algorithm
    tag: algorithm
    brief: Results from testing the original algorithm
  - name: Data related
    tag: datarelated
    brief: Experiments which shed light on issues related to data sets and their handling
  - name: PGE enhancements
    tag: enhancements
    brief: Results from testing enhancements to PGE
---




This chapter proceeds through a range of experiments of the PGE algorithm.


<br>

<div id="overview">
<a class="right" href="#top">top</a>
</div>

#### Overview


We'll first talk about measurements and benchmarking;
  what, why, and how we are measuring during experimentation.
We'll then talk about the benchmarks;
  where they are drawn from,
  what they test,
  how they were generated and handled,
  as well as the environment in which benchmarking was performed.

We'll then proceed through three groups of benchmarking tasks.
  The first group evaluates the orginial algorithm
   and provides the proof of concept.
  The second group explores 
   how the algorithm performs under various conditions
   related to the data and numerical computations.
   This includes amount of data, features, and noise,
   as well as error metrics, normalization, and
   other data handling aspects.
  The third group of tasks demonstrate the efficacy
   of the enhancements to the PGE algorithm.

We will conclude by applying the lessons learned on
 some difficult and open problems.
A comparative evaluation against other SR implementations
 can be found in [Chapter 6](/sr/06-comparison/).






### Basic Experiments


#### Proof of Concept



#### Differential Equations

| Problem              | Solved | Iters  | Models    | Evals     | I-Level | G-Level | F-Level | Functions |
| -------------------- |:------:|:------:|:---------:|:---------:|:-------:|:-------:|:-------:|:---------:|
| BacResp - dx         | -      | -      | -         | -         | -       | -       | -       | -         |
| BacResp - dy         | -      | -      | -         | -         | -       | -       | -       | -         |
| BarMags - dX         | -      | -      | -         | -         | -       | -       | -       | trig      |
| BarMags - dY         | -      | -      | -         | -         | -       | -       | -       | trig      |
| Glider - dv          | -      | -      | -         | -         | -       | -       | -       | trig      |
| Glider - dA          | -      | -      | -         | -         | -       | -       | -       | trig      |
| Ecoli - dG           | -      | -      | -         | -         | -       | -       | -       | -         |
| Ecoli - dA           | -      | -      | -         | -         | -       | -       | -       | -         |
| Ecoli - dL           | -      | -      | -         | -         | -       | -       | -       | -         |
| Lorenz - dx          | -      | -      | -         | -         | -       | -       | -       | -         |
| Lorenz - dy          | -      | -      | -         | -         | -       | -       | -       | -         |
| Lorenz - dz          | -      | -      | -         | -         | -       | -       | -       | -         |
| ShearFlow - dA       | -      | -      | -         | -         | -       | -       | -       | trig      |
| ShearFlow - dB       | -      | -      | -         | -         | -       | -       | -       | trig      |
| vanderPol - dx       | -      | -      | -         | -         | -       | -       | -       | -         |
| vanderPol - dy       | -      | -      | -         | -         | -       | -       | -       | -         |
| LotkaVolterra - dx   | -      | -      | -         | -         | -       | -       | -       | -         |
| LotkaVolterra - dy   | -      | -      | -         | -         | -       | -       | -       | -         |
| PredPrey - dx        | -      | -      | -         | -         | -       | -       | -       | -         |
| PredPrey - dy        | -      | -      | -         | -         | -       | -       | -       | -         |
| SimplePendulum - dA  | -      | -      | -         | -         | -       | -       | -       | trig      |
| SimplePendulum - dV  | -      | -      | -         | -         | -       | -       | -       | trig      |
| ChaoticPendulum - dA | -      | -      | -         | -         | -       | -       | -       | trig      |
| ChaoticPendulum - dV | -      | -      | -         | -         | -       | -       | -       | trig      |












#### Section Flow

	- Eqn types & Data sets
		- Setup & Settings
			- Explicit
			- Diffeq
			- 2-stage SR
			- Machines
		- Data Set details
			- How generated
			- pre-processing
			- Links to Appendix
		- Benchmark / Reproducibility
			- GP needs better
			- Designed for specific purpose
			- Diffeq, closer to real-world
			- Which benchmarks are good / bad, why?
			- Reproducibility, links to code & data

  - PGE basic
    - most basic settings, to show possible under ideal conditions
      - explicit & diffeq
      - no noise
      - different function settings
      - different init / grow levels
      - different selection methods

	- PGE settings
		- Setup & Settings
		- First formulation
		- various policies
			- initialization sets
			- expansion bases / subs
			- selection methods

	- Numerical / data related
    - data policies 
      - amount of noise
      - quantities / coverage
    - error metrics    (x4)
      - mae, mse, rmae, rmse
    - fitness metrics  (x2)
      - regular, normalized ~ error metric
    - diffeqs
      - point evaluation vs integration for N points

	- PGE enhancements
		- Algorithm
		- Memoization
		- Searching (graph)
		- Parallel processing 



  - Other analyses to consider (future work?)
    - Coefficient value inheritance
    - feature selection
    - data transformations, scaling?












<div id="measurements"></div>
<a class="right" href="#top">top</a>

#### Measurement Details

What measurements

How measured

What output will look like

how success is determined




- solution found or not
  - test with sympy
  - in final pareto
- threshold reached
  - error
  - average error
  - explained variance

- number of iterations
- eqn/point evaluations

- real-time
  - whole run
  - to solution
  - percent per phase in an iteration

- search space coverage
  - number of equations tested
  - graph metrics
    - unique vs total generated





<div id="settings"></div>
<a class="right" href="#top">top</a>

#### Evaluation Settings

This section describes the benchmarks
 and testing environment used during evaluation.

##### Benchmarks

We use several benchmark groups to evaluate PGE.

1. Explicit benchmarks from SR literature
1. Regression problems from NIST website
1. Differential equations and dynamical systems
1. Self generated benchmarks for specific testing

The majority of these datasets were chosen because
there is prior published results, either in
SR literature or based on a specific regression model.
We next provide a brief description of each
benchmark group. Details, charts, data, and code
can be found in [Appendix 3](/sr/A3-benchmarks/).

**Explicit problems** are drawn from the SR literature.
  The main source is a paper from titled
  ["GP Needs Better Benchmarks."](https://cs.gmu.edu/~sean/papers/gecco12benchmarks3.pdf)
  We select a subset of these problems,
  those that have been used more often in published work.

**NIST problems** are taken from the NIST website.
  These benchmarks are used to test linear and non-linear
  regression techniques. 
  Here we apply PGE to these same problems.

**Differential equation** benchmarks are almost exclusively
  drawn from the work of Hod Lipson and his students.
  The Lipson group has demonstrated GP based SR
  on a wide range of dynamical systems.
  Here we show PGE can also solve these problems.

**Self generated** benchmarks are the result of
  producing tests for stressing various aspects of
  the PGE system and SR implementations in general.




##### Execution Environment

1. Hardware specs
1. Linux distro, kernel version
1. Language / compiler versions
1. Package versions






<div id="algorithm"></div>
<a class="right" href="#top">top</a>

### PGE Algorithm



| Problem         |  SSC-T6  |  SSC-T7  |    PGE-1       |    PGE-2       |    PGE-3       |
| ----------------|:-------- |:-------- |:-------------- |:-------------- |:-------------- |
|  Nguyen-01      |  0.0035  |  0.003   |  **0.000003**  |  **0.000003**  |  **0.000003**  |
|  Nguyen-02      |  0.0075  |  0.007   |  **0.000004**  |  **0.000004**  |  **0.000004**  |
|  Nguyen-03      |  0.009   |  0.0095  |  **0.000003**  |    0.094944    |  **0.000003**  |
|  Nguyen-04      |  0.013   |  0.011   |    0.107365    |    0.000005    |  **0.000004**  |
|  Nguyen-05      |  0.0045  |  0.0045  |    0.000068    |    0.000014    |  **0.000001**  |
|  Nguyen-06      |  0.0045  |  0.0035  |    0.011798    |    0.000446    |  **0.000036**  |
|  Nguyen-07      |  0.003   |  0.0035  |    0.002571    |    0.000351    |  **0.000251**  |
|  Nguyen-08      |  0.0065  |  0.005   |  **0.000001**  |  **0.000001**  |  **0.000001**  |
|  Nguyen-09      |  0.0264  |  0.0099  |    0.003898    |  **0.000001**  |    0.000270    |
|  Nguyen-10      |  0.0122  |  0.0066  |  **0.000002**  |    0.000004    |    0.000004    |


<br><br>


| Problem      | AEG    |  -T2      | AEG    |  -T4      |    PGE-1    |           |    PGE-2   |           |    PGE-3   |           |
|              | error  | equations | error  | equations |   error     | equations |  error     | equations |  error     | equations |
| -------------|:------ |:--------- |:------ |:--------- |:----------- |:--------- |:---------- |:--------- |:---------- |:--------- |
|  Korns-01    |  0.00  |     .15K  |  0.00  |     .06K  |   0.000000  |     .17K  |  0.000000  |    .47K   |  0.000000  |    .35K   |
|  Korns-02    |  0.00  |    3.26K  |  0.00  |  113.00K  |   0.027277  |   25.05K  |  0.0055    |  34.07K   |  0.1135    |   2.30K   |
|  Korns-03    |  0.00  |  804.49K  |  0.00  |  222.46K  |   0.498     |    0.36K  |  0.0065    |  29.00K   |  0.1245    |   1.96K   |
|  Korns-04    |  0.00  |     .59K  |  0.00  |     .86K  |   0.000000  |     .17K  |  0.000000  |  10.95K   |  0.000000  |  28.06K   |
|  Korns-05    |  0.00  |     .25K  |  0.00  |     .16K  |   0.000000  |     .17K  |  0.000000  |    .48K   |  0.000000  |    .35K   |
|  Korns-06    |  0.00  |     .13K  |  0.00  |     .01K  |   0.000000  |     .17K  |  0.000000  |    .48K   |  0.000000  |    .35K   |
|  Korns-07    |  0.00  |  187.26K  |  0.00  |    4.10K  |   0.031941  |    8.37K  |  0.0075    |  53.08K   |  0.058696  |   9.45K   |
|  Korns-08    |  0.00  |    5.99K  |  0.00  |   11.00K  |   0.021827  |   19.34K  |  0.000000  |   9.86K   |  0.069829  |  54.18K   |
|  Korns-09    |  0.00  |   97.24K  |  0.00  |  116.81K  |   0.1855    |    1.87K  |  0.000000  |   7.14K   |  0.0615    |    .70K   |
|  Korns-10    |  0.99  |  763.53K  |  0.00  |    1.34M  |   0.055193  |    4.42K  |  0.008     |  78.19K   |  0.107     |   1.65K   |
|  Korns-11    |  1.00  |  774.89K  |  0.00  |    4.7M   |   0.493     |     .17K  |  0.0055    |   8.33K   |  0.1195    |   2.62K   |
|  Korns-12    |  1.04  |  812.79K  |  1.00  |   16.7M   |   0.117404  |   34.34K  |  0.0065    |  44.27K   |  0.124     |   1.67K   |
 




Diffeq Comparisons


|  Problem      |   GP-Time  |   GP-Evals  |   PGE-Time  |  PGE-Evals  |
|---------------|------------|-------------|-------------|-------------|
|  Glider-v     |   10.219   |     1030M   |     3.523   |    0.468M   |
|  Glider-o     |    5.062   |      500M   |     0.895   |    0.223M   |
|  BackResp-x   |   74.047   |     7590M   |    15.131   |    2.692M   |
|  BackResp-y   |   30.547   |     3090M   |    21.929   |    3.825M   |
|  PredPrey-x   |   81.718   |     8260M   |    94.879   |    9.008M   |
|  PredPrey-y   |  290.578   |    29380M   |    81.592   |    8.323M   |
|  BarMags-o1   |   11.750   |     1190M   |    10.344   |    1.883M   |
|  BarMags-o2   |   15.609   |     1580M   |     3.551   |    1.005M   |
|  ShearFlow-o  |    3.562   |      360M   |     0.216   |    0.168M   |
|  ShearFlow-p  |   33.859   |     3420M   |     7.558   |    2.071M   |
|  VanDerPol-x  |   25.547   |     2580M   |    13.779   |    1.544M   |
|  VanDerPol-y  |    0.859   |       90M   |     0.354   |    0.089M   |
|  LotkaVolt-x  |    4.250   |      430M   |     0.336   |    0.938M   |
|  LotkaVolt-y  |    1.063   |      110M   |     0.449   |    0.952M   |

<br>

<div class="center-align">
<span><b>Figure #</b> - Diffeq Results</span>
<img class="responsive-img" src="/sr/img/experiments/diffeq_results.png" />
</div>



#### Decoupling Into Services


After decoupling the services,
the expansion phase became the
most time-consuming part of the algorithm.
The surmise reason for this is two-fold,
though it warrants further investigation.
First, the time required to process a
model in the algebra and services
became less than the time required
to send messages, even when the other services
are co-located.
In addition to the network latency,
there was additional overhead in our
original messages due to using
a human readable format for the equation
over the wire. This required the equations
to be printed and then parsed at both service ends.
After converting the message to
use the same integer serialization
used in the memoization process,
we saw a 20\% reduction
in overall runtimes.
%
% Need to also parse int-sequence at python end
%




<div class="center-align">
<span><b>Figure #</b> - Percent in each Phase</span>
<img class="responsive-img" src="/sr/img/experiments/PercentPhase.png" />
</div>





<div id="datarelated"></div>
<a class="right" href="#top">top</a>

### Data Related Issues


data coverage of the domain -
issue with problem domains, need extending or
there is an inability to effectively distinguish
between different solutions.


- sampling
- volume
- features
- function complexity
- system complexity
- noisy features
- noisy channels
- multiple data sets / system parameters
- windowing
- weighting samples
- equation library?



<div id="enhancements"></div>
<a class="right" href="#top">top</a>

### PGE Enhancements













Settings:

| Parameter      | Value     |
| -------------  |-------    |
| Functions      | none      |
| Function Level | n/a       |
| Initial Level  | low       |
| Growing Level  | low       |

<br>

<div class="center-align">
<span><b>Figure #</b> - 1D, Group 1</span>
<img class="responsive-img" src="/sr/img/experiments/basic_stage1_group1.png" />
</div>

<div class="center-align">
<span><b>Figure #</b> - 1D, Group 2</span>
<img class="responsive-img" src="/sr/img/experiments/basic_stage1_group2.png" />
</div>


<br>

Settings:

| Parameter      | Value     |
| -------------  |-------    |
| Functions      | sin,cos   |
| Function Level | linear    |
| Initial Level  | low       |
| Growing Level  | low       |


<br>

#### Explicit Problems

| Problem        | Solved | Iters  | Models    | Evals     | I-Level | G-Level | F-Level | Functions |
| -------------- |:------:|:------:|:---------:|:---------:|:-------:|:-------:|:-------:|:---------:|
| koza_01        | yes    | 6      | 90        | 1.092M    | low     | low     | -       | -         |
| koza_02        | yes    | 7      | 112       | 1.075M    | low     | low     | -       | -         |
| koza_03        | yes    | 8      | 114       | 1.349M    | low     | low     | -       | -         |
| lipson_01      | yes    | 2      | 48        | 0.408M    | low     | low     | -       | -         |
| lipson_02      | -      | -      | -         | -         | -       | -       | -       | trig,extra|
| lipson_03      | -      | -      | -         | -         | -       | -       | -       | exp,trig  |
| -------------- | ------ | ------ | --------- | --------- | ------- | ------- | ------- | -------   |
| nguyen_01      | yes    | 3      | 60        | 0.557M    | low     | low     | -       | -         |
| nguyen_02      | yes    | 6      | 85        | 0.900M    | low     | low     | -       | -         |
| nguyen_03      | -      | -      | -         | -         | -       | -       | -       | -         |
| nguyen_04      | -      | -      | -         | -         | -       | -       | -       | -         |
| nguyen_05      | -      | -      | -         | -         | -       | -       | -       | trig      |
| nguyen_06      | -      | -      | -         | -         | -       | -       | -       | trig      |
| nguyen_07      | -      | -      | -         | -         | -       | -       | -       | exp,extra |
| nguyen_08      | -      | -      | -         | -         | -       | -       | -       | exp,extra |
| -------------- | ------ | ------ | --------- | --------- | ------- | ------- | ------- | -------   |
| nguyen_09      | -      | -      | -         | -         | -       | -       | -       | trig      |
| nguyen_10      | -      | -      | -         | -         | -       | -       | -       | trig      |
| nguyen_11      | NO     | -      | -         | -         | -       | -       | -       | $$x^y$$   |
| nguyen_12      | yes    | 6      | 447       | 10.03M    | low     | low     | -       | -         |
| -------------- | ------ | ------ | --------- | --------- | ------- | ------- | ------- | -------   |
| korns_01       | yes    | 0      | 210       | 1.316M    | low     | low     | -       | -         |
| korns_02       | yes    | 6      | 1575      | 38.87M    | low     | low     | -       | -         |
| korns_03       | yes    | 5      | 1491      | 43.48M    | low     | low     | -       | -         |
| korns_04       | -      | -      | -         | -         | -       | -       | -       | trig      |
| korns_05       | -      | -      | -         | -         | -       | -       | -       | exp       |
| korns_06       | -      | -      | -         | -         | -       | -       | -       | sqrt      |
| korns_07       | NO     | -      | -         | -         | -       | -       | -       | $$x^y$$   |
| korns_08       | -      | -      | -         | -         | -       | -       | -       | sqrt      |
| korns_09       | -      | -      | -         | -         | -       | -       | -       | exp,sqrt  |
| korns_10       | -      | -      | -         | -         | -       | -       | -       | -         |
| korns_11       | -      | -      | -         | -         | -       | -       | -       | trig      |
| korns_12       | -      | -      | -         | -         | -       | -       | -       | trig      |
| korns_13       | -      | -      | -         | -         | -       | -       | -       | trig,tan  |
| korns_14       | NO     | -      | -         | -         | -       | -       | -       | tanh      |
| korns_15       | NO     | -      | -         | -         | -       | -       | -       | $$x^y$$   |






