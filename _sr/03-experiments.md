---
layout: sr
title: Experiments
brief: This chapter focuses on testing the PGE algorithm
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

	- PGE settings
		- Setup & Settings
		- First formulation
		- various policies
			- initialization sets
			- expansion bases / subs
			- selection methods

	- Numerical / data related
		- feature selection
		- data policies 
			- preprocessing
			- quantities / coverage
		- error metrics
		- normalize (err/size)
    - data transformations
    - diffeqs
      - point evaluation vs integration for N points

	- PGE enhancements
		- Algorithm
		- Memoization
		- Searching (graph)
		- Decoupling


		  







<div id="overview"></div>
<a class="right" href="#top">top</a>

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

#### PGE Algorithm

- use clean data
- variate base functions


<div id="datarelated"></div>
<a class="right" href="#top">top</a>

#### Data Related Issues


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

#### PGE Enhancements



