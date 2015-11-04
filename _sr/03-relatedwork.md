---
layout: sr
title: Related Work
brief: Standing on the shoulders of others
prev: 02-sr
next: 04-pge
nextname: The PGE algorithm
sections:
  - name: Genetic Programming
    tag: gp
    brief: The original Symbolic Regression algorithm
  - name: Enhancements in GP
    tag: enhancements
    brief: The original Symbolic Regression algorithm
  - name: Fast Function eXtraction
    tag: ffx
    brief: The first deterministic algorithm
  - name: Regression Methods
    tag: regression
    brief: Regression methods related to PGE
  - name: Graph Algorithms
    tag: graph
    brief: Graph techniques related to PGE
---





<br>

<div id="gp">
<a class="right" href="#top">top</a>
</div>


### Genetic Programming

Genetic Programming (GP) is
the original implementation of
Symbolic Regression (SR).
Traditionally much of the literature has used 
the term Genetic Programming as both the problem and the implementation.
Historically, 
term Symbolic Regression has been used as 
a sub-problem to Genetic Programming,
as the task of evolving equations,
and often as an evolutionary method
for finding equations.
We want to make a distinction between 
the task of symbolically regressing
a parse tree in a grammar,
from the method of realizing that tree.
That is, separating the objective
from the optimization method.
From here on out, when we refer to
Genetic Programming, we mean an evolutionary implementation of Symbolic Regression.
And when we use Symbolic Regression,
we mean the generalized regression problem,
limiting our examples to equation regression,
which we consider a specific sub-problem of Symbolic Regression.


#### The Algorithm

1. **Overview** - Basics of Genetic Programming
1. **Representation** - Tree-based and beyond
1. **Evaluation** - Fitness measurement
1. **Optimization** - Genetic operators and selection
1. **Initialization & Termination** - It's important
1. **Parameters** - All the knobs and buttons


GP requires several components
to be specified in its implementation.
Representation and evaluation define
the solution structure and how it is
simulated to infer modeling accuracy.
Initialization determines the search starting point 
and what portions of equation space are reachable.
Selection and breeding policies
determine which candidates are better
and how the space of equations is searched.
This section overviews each of these 
components in the GP algorithm.


**Overview of GP**

The most common implementation of SR 
has been the evolutionarily inspired method
called Genetic Programming (GP) 
[koza:1992:gen_prog](http://www.amazon.com/exec/obidos/ASIN/0262111705/geneticprogrammi).
GP is part of the larger family
of Genetic Algorithms (GA) 
a class of algorithms 
inspired by `survival of the fittest'
[
[holland:1962:outline](http://dl.acm.org/citation.cfm?id=321128),
[goldberg:1988:genetic](http://link.springer.com/article/10.1023%2FA%3A1022602019183)
].
GP differs from GAs by solution representation.
In GAs, solution representation is 
a fixed size structure.
In GP, solutions vary in size,
usually represented as a parse tree within a grammar.
While GP can be applied to
generic languages,
and was originally intentioned
to evolve computer programs,
we shall restrict our
discussion to mathematical equations.
This is in line with the general
focus of the GP literature.

GP is a stochastic search heuristic
over the syntax-tree representation of an equation.
GP requires several components to be defined:
representation, evaluation, selection, genetic operators, 
initialization & termination, and population management.
Representation and evaluation, the first two
components of a ML algorithm
were detailed previously.
We while expand upon their
usage in GP here.
The third component, optimization,
is the combination of 
selection, the genetic operators, and population management.
Initialization and termination are required because
the success of GP is sensitive to their determination.


The Basic GP Process
begins with an initial, random population of models.
Then each individual is evaluated to determine fitness.
This is followed by a selection process 
for candidate survival and replication.
Survivors are then recombined using methods which resemble
sexual reproduction and mutation.
GP continues this process 
for a number of generations,
until a model of desired accuracy is discovered
or a computational threshold is reached.

For detailed overviews of 
tree-based Genetic Programming,
see [
[koza:1992:gen_prog](http://www.amazon.com/exec/obidos/ASIN/0262111705/geneticprogrammi),
[kouch:08:thesis](http://robotics.ee.uwa.edu.au/theses/2008-Genetic-Kouchakpour-PhD.pdf)
]
For a nearly complete list
of all GP publications,
visit [GP-bib](http://www.cs.bham.ac.uk/~wbl/biblio/),
maintained by Bill Langdon.







##### Representation in Genetic Programming

Section [SR-components]("/sr/01b-sr/#components") 
described the tree-based framework for 
representing equations.
GP uses the operators and operands of this framework
to construct parse trees for equations.
The parse trees are chromosomes of an individual.
This analogy is important to the methodology
which uses sexual reproduction, mutation,
and natural selection to search.
One note about representation,
equation coefficients are real valued numbers.
As we will see, having continuous parameters,
and optimizing by evolution, makes the task much harder.


**Representation Closure**

In the basic GP algorithm,
expressions are generated at random.
This can result in invalid operations
being evolved which violate our
basic mathematical constraints.
Closure is the property that an
expression be valid mathematically.
Invalid expressions include 
dividing by zero,
taking the square root of a negative number,
and violating other similar rules.

A simple remedy exists in which
invalid operations are removed
and functions such as log
are protected.
This method has been termed 
*interval arithmetic* 
[
[keijzer:03:improving](),
[kotanchek:2008:trustable]()
].
A second method is to place restrictions
on the grammar, as in
[
[hoai:2001:framework](),
[hoai:2002:solving](),
[hoai:2003:tree]()
].
Hoai prevents invalid expressions from being generated
where the previous method removes them later.


**Populations**

The population is the pool 
of candidates equations GP has to work with.
Basic GP uses a single population.
Parents are selected from this population
for breeding, children and parents
compete for positions in the population
between generations.

NEED MORE HERE





**Evaluation in Genetic Programming**

The basic GP algorithm uses
the evaluation methods outlined
in [SR-components]("/sr/01b-sr/#components").
The fitness of an individual
is then determined by a combination
of accuracy and size.
Generally, a traditional metric like
L1/L2 norm or RMSE is used to determine accuracy.
Size is usually measured with
respect to the tree size.
The search process then optimizes to
maximize accuracy and minimize size.
This creates a multi-objective optimization task
describe in Section [SR-???]().
We will revisit evaluation in GP
later in this chapter 
in the section on enhancements.






**Optimization in Genetic Programming**

Optimization is performed over a series of iterations,
know as generations in the GP scheme.
Following the evolutionary motif,
optimizing a population requires 
selection and replication.
As the great MPUA says

<blockquote>
The sole reason we exist is to survive and replicate. That's it.
~ Mystery
</blockquote>

GP simulates the evolutionary process on equations.
Replication uses *crossover* and *mutation* 
to create new individuals from existing ones.
Selection uses the non-dominated sorting
Pareto fronts described in
Section [SR-???]().
Here we will describe the particulars
as the relate to GP.


**Genetic Operators**


Genetic operators are
the means by which GP
searches the space of equations.
The search uses
crossover, an exploratory technique, to find unexplored regions
and mutation, an exploitative technique, to search locally.
A balance between both is needed to make progress 
and converge towards good solutions.

<div>
<img class="responsive-img" src="/sr/img/eqn-cross-mutate-color.jpg" />
</div>

**Crossover** is analogous to sexual reproduction and
uses two parent equations to produce child offspring equations.
To perform crossover, subtrees of the parents
are selected, snipped, and swapped. 
This method is similar to crossing DNA, 
except that GP is a branching representation,
rather than linear. 
The original crossover method
selects subtrees of the parents at random.
Enhancements on selecting crossover points
will be described below.

It is considered a destructive operation due to the significant
probability that good schemata of the tree are disrupted.
Disrupted in this context means that a partial solution,
stored in a subtree, has an internal node selected for the crossover point.
To combat this, i.e. reduce the probability of disruption,
candidate solutions grow extra 'genetic material' that has little
value in the evaluation. 
This 'natural' growth, called bloat,
is described below in the sections
on limitations and enhancements.



**Mutation** alters a single candidate equation
to search locally around that candidate.
Mutation simply selects a node of a tree
and changes it to a different type.
Examples of mutations are 
a change of variable from X to Y, 
an operation from addition to subtraction.
Mutation is also the way the original GP algorithm
optimizes real-valued coefficients.
If a coefficient is selected for mutation,
it scaled by a random value in some predefined range.


**Injection** is a less used method
in which a single candidate is altered
by choosing a single point of change.
It is similar to mutation, 
but instead of changing a node type,
the subtree is trimmed and replaced
by a freshly grown branch.
In terms of exploratory and exploitative
search qualities,
injection lies between
crossover and mutation.





**Selection**

for survival and replication


Selection is the most important part
of evolutionary algorithms,
and thus GP.
Therefore it is very important 
to choose the selection mechanisms wisely
[Dumitrescu:2000:EC](http://dl.acm.org/citation.cfm?id=350139).
Selections role is to differentiate between candidates,
based on their quality, for survival and replication.
This artificial environmental pressure causes natural selection,
raising the fitness of the population.
[
[Dumitrescu:2000:EC](http://dl.acm.org/citation.cfm?id=350139),
[goldberg:1991:comparative]()
]
extensively cover the variations in selection schemes.
Here, we will give an overview to show what is possible.

There are two points where selection is used,
for survival and replication.
Replication is the chance of 
having genetics passed to an offspring.
This is how good partial solutions 
are passed through the population 
and altered to find more of the solution.


Parental selection can happen with
or without replacement. Proportional selection
favors better candidates by increasing the
probability they will be selected.
This can cause premature convergence
to a local optima solution permeating the population,
wiping out diversity.
Rank based selection sought to overcome this
by associating a position rather than a 
probability for chance of selection.
Rank is often calculated by the dominate, dominated
ration of a candidate.
Rank selection benefits GP by
increasing selection pressure when 
the population variance is low.

Binary Tournament [[goldberg:1991:comparative]()]
selects two individuals and competes them
for one of the parental equations.
This is down twice to generate both parents
for a recombination.
Binary tournament can be extended to 
compete N candidates against each other.
Binary tournament is similar to selecting a pivot point 
in library implementations of quick-sort.

Survival is the chance of an individual
solution remaining in the population.
In the elitist method,
a parent is only removed if
one of its offspring is better than it.
In the pure method,
all parents and children
contend for a spot in the population.





**Initialization & Termination**


**Initialization** determines the search starting point 
and what portions of equation space are reachable.
GP uses random generation to
create the initial population of candidate solutions.
using a uniform random probability distribution

There are two ways to grow a
single parse tree. The first
is to grow a full tree up to 
a specified depth. The second
is to allow node selection
to include variables.
This causes generation to halt
at unspecified times while
traversing the tree,
with the resultant tree having
variable shape.
To create the initial population,
these two tree generation schemes
can be used for the entire population
or can be used for different percentages
of the population. A method known
as ramped half-and-half creates
half the population with the full method
and the second half with the variable grow method.
A size proportional set can be created by
growing an increasing number of trees
as the maximum depth increases.
For example, if we limit candidates to binary trees,
we grow twice as many trees as the previous depth.

Ensuring diversity of equations
at the start is difficult.
One method is two continually 
generate equations, eliminating
duplicates and invalid expressions,
until the population is filled.
Another method is to run several
short run GP searches,
leveraging GP's randomness (non-determinism),
to obtain a pool of partially optimized candidates. 


**Termination**

Since Genetic Programming is a heuristic search,
it has no intrinsic stopping point.
Therefore, we must tell it when to stop,
The most common method used is generational,
i.e. upon reaching a predefined number of generations or iterations.
This gives us a reasonable idea 
of how long a search will take
as well as providing 
a measurement of what can be
solved in a given number of steps.

Another class is performance based stopping criteria.
To use these, an accuracy metric needs to be defined.
One such metric is simply the 
best performing candidates error.
If the error is less than some defined threshold,
then the search is terminated.
This method, however, is sensitive to the
scale of the data and error measurement.
Another performance based method uses *hits*,
the number of data points which a candidate equation
is within some threshold of the real value
[citation]().
In this case, the search terminates if any
candidate scores a hit on all data points
or some percentage of all the data points.

Other schemes attempt to 
measure the progress of the search.
One such example is the number of generations
since a new best solution has been found.
If the search continues for a time without finding 
improvement, then termination occurs.

No matter what means is used
to determine the stopping point,
the results of the search need to be returned.
Generally a set of the best solutions are returned,
providing some amount of diversity.
This set usually comes from the Pareto frontier,
but can also include solutions which come from
successive frontiers.



**Parameters of Genetic Programming**

The GP process and its components have many
parameters which effect their behavior.
Setting and tuning these parameters is difficult
and has a significant impact on the
efficacy of a GP run.
Dynamic, feedback, and meta-heuristics 
have been proposed for auto-tuning the parameters
to the GP algorithm.


% Common Between Implementations:
% - fitness metric
% - terminations
% - building blocks

% Single Search:
% - pop size
% - init style (full,grow,half-n-half)
% - equations bounds (size,depth)
% - cross/mutate rates
% - selection for survival/replication [scheme]




% blind: (static according to a rule) [sim anneal to find optimal]
% adaptive: dynamic feedback
% self-adaptive: parameters become a genome subject to evolution [multi-level GA!]

% hyper-heuristics for parameter optimization \cite{biazzini:2009:distributed}
% track operator success
% lineage / ancestry with operator info

% credit assignment to good operators





**Schema Theory**

kouch pg47

holland 1975

form with ``blanks'' where not solved yet

introns: nop material (could be removed)

propagates through the population

increases in size as solution gets better
compactness / linkage

crossover disrupts long schema (under uniform probability) [bloat]
genetic drift - premature convergence, loss of generality (schemta)

mutation disrupts if good parts of schema are selected





























#### Limitations in GP

1. **Disruptiveness of Crossover** - the basic search operator has uniform selection probability. It is the reason for bloat and inefficiencies.
1. **Equation Bloat** - the growth in tree size to reduce probability of node selection. Bloat emerges to protect good partial solutions.
1. **Equation Redundancy** - results from multiple copies of the same equation. Compounded by commutative and associative properties.
1. **Loss of Population Diversity** - results when a partial solution dominates the population. Caused by bloat and good partial solutions.
1. **Premature Convergence** - results when a search converges upon a local optimum. Caused by loss of population diversity then next point.
1. **Difficulties with Non-determinism** - ...
1. **Fundamental Issus in GP** - ...


The basic GP algorithm has many limitations
stemming from its evaluation, selection, and breeding sub-algorithms.
Many research papers in the field have sought to
address these limitations and offer solution.
In this section we discuss these limitations, 
detailing where they come from.
We relate the solutions which offer 
improvement, to each limitation, 
and discuss their effect on the GP algorithm.
The limitations, as well as the counters,
are ofter intertwined between
several aspects of the GP algorithm.
In fact, if the initial starting points do not give
sufficient coverage of the search space,
GP will not be able to reach areas of that space.


GP has issues which it inherits from evolution, 
which is good at dealing with uncertainty and variability,
but not the ideal method for honing in on the most fit individual.
These issues stem from the difficulties
in maintaining a diverse population of equations
while converging towards the best equation.
Representation, the genetic operators,
selection mechanisms, and population structure
are interwoven in complex ways.
These difficulties, and advancements made in GP,
have effects which permeate through the
entire GP infrastructure and operation.
Measuring and understanding these
effects requires rigorous testing and analysis,
something laking but being addressed
[McDermott:2012:benchmarks](https://cs.gmu.edu/~sean/papers/gecco12benchmarks3.pdf).



**Disruptiveness of Crossover **

The basic version of this search operator 
has uniform selection probability. 
It is the reason for bloat and inefficiencies.


**diagram: tree with probabilities**

Crossover is the main exploratory operator of SR. 
Crossover facilitates large changes to an equation. 
These changes translate into
large movements in the search space. 
It is in this way that crossover 
allows SR to explore equation space.
Initially, we want to have the ability to quickly 
move around the search space. 
However, as we find good partial solutions,
we want to exploit these solutions. 
Mutation is the exploitative operator of SR.
The changes that occur by mutation are generally
more localized within the parse tree.
Mutation enables SR to refine equations.

As the partial solutions converge towards the real solution,
an increasingly larger percentage of the tree structure 
is correct as is. 
However, as the percentage of correct structure increases,
so does its chance of being selected for crossover.
This property has a dual effect on both parents of the crossover.
In one direction (which?), it is passing a portion of the correct
solution to the other parent.
In the reverse direction, crossover removes part of the correct
solution and produces an offspring which will likely 
under perform the parent.




#### Equation Bloat 

the growth in tree size to reduce probability of
node selection. Bloat emerges to protect good partial solutions.

Equation bloat is the growth of average candidate size
over course of evolution.
Bloat is inherent in any variable length representation
\cite{langdon} [190].
The general consensus for the cause of bloat
is the disruptiveness of crossover,
though \cite{Banzhaf} [22] speculated 
that fitness causes bloat.

Parsimony pressure is meant to control bloat,
but the disruptiveness of crossover,
more often than not,
overpowers the Pareto front's benefits.
Several schemes have been proposed
for reducing the probability of 
disrupting partial solutions.



**Equation Redundancy **

results from multiple copies of the same 
equation. Compounded by commutative and associative properties.


Redundancy of solutions is the propagation,
of a particular form, throughout the population.
Bloat causes partial solutions to dominate
the population as GP attempts to optimize
the best partial solution's coefficients.
This leads to a loss of diversity
and subsequently premature convergence.
These limitations all contribute to 
a good solution taking over the population.
This results in wasted effort evaluating
the same expression form and
crossing over with itself.

To our knowledge, no one has yet compared
the unique to total equations 
processed by a GP search.
This would provide a measure of duplicated effort,
but requires a way to match trees.
We use the Integer Prefix Tree (section \ref{sec-pge-ipt})
to track how many equations are processed.
We disregard the value of coefficients
and focus on unique forms.
The results are very interesting
and discussed in section \ref{sec-results-efficient}.

A inhibiting result of the last limitation is that
many redundant equations are generated and evaluated.
These equations are either disrupted
partial solutions from crossover 
or the same solution differing only
in the value of one coefficient.
The net result is that a lot of time
is wasted testing equations that are
worse or minimally different from the parent.
Basically, because GPSR is bad at tuning parameters,
many equations of the same form are tested and retested, many many times.
As GPSR convergences towards the solution, 
an increasing percentage of the offspring 
are weaker models than their parents.





**Loss of Population Diversity **

results when a partial solution dominates
the population. Caused by bloat and good partial solutions.


A major issue through the course of evolution
is maintaining the proper diversity 
within the population of candidate solutions.
One can often find a solution spreading quickly through the population,
destroying diversity and causing good partial solutions to vanish.
Generally speaking, diversity should be
greater at the early stages and reduce
as time progresses. 


If we allow too much diversity,
the algorithm cannot refine the candidates
and fails to converge to any optima.
If we force too little diversity,
the algorithm converges too quickly 
and doesn't thoroughly search the space.

Population diversity is 
difficult to diagnose and address.
There are many factors which 
effect the population diversity
through the course of evolution.
The population size, the mating pool size,
elitism, survival scheme.
The difficult in diagnosis is likely
the lack of a good measure.
We introduce a structure
for comparing unique to total 
equation forms in section \ref{sec-pge-ipt}.


**Premature Convergence **

results when a search converges upon a local
optimum. Caused by loss of population diversity then next point.

GP is a highly stochastic process and thus
promotes contradictory and inconsistent solutions.
Often, GP reaches a local optima and further
progress cannot be made towards an acceptable solution.
This behavior is known as premature convergence.
It is effected by all components of the GP process
and becomes the term to describe the event, in GP, 
when the algorithm is stuck on the wrong answer.

Premature convergence is usually the result 
of a loss of diversity among the population.
This in turn is a population management issue.
It becomes a very interwoven issue, 
relating to all aspects of the process.
Generally, premature convergence is
remedied by improving individual components.
We relate the effects of theses limitations,
and other remedies, on premature convergence
as we come to them.



**Inefficacy of Coefficient Tuning**

GP traditionally represents parameters to an equation
as real-valued coefficients.
It is a well known problem that SR 
is not effective at tuning 
the coefficients of an equation.
We first describe how coefficients are updated
and then give a probability argument
as to why it is difficult to optimize
parameters with genetic operators.

In basic GP, there are only two ways 
to change a coefficient,
crossover and mutation.
In the first case, the correct coefficient is 
substituted during crossover.
The second way is to select the 
coefficient for mutation and then
update it to the correct value.
Common mutation rates are 10% and below,
and the multiplicative factor for updating
coefficients is similarly low.

Consider the probability of selecting a coefficient.
We need to consider both the size of the equation
and the mutation rate. We multiply the
uniform probability of selection by the
mutation rate to obtain the overall chance of selection. 
Figure \ref{fig:coeff-probs}
shows the resultant coefficients for 
both binary and n-ary trees,
assuming mutation rate of 10%.
These are the rates just for
selection and do not include the
update factor. 
The missing update factor is difficult
to calculate, first because the
range of coefficients is immense, 
though not infinite, in computers,
and second because it depends upon 
the current value of the coefficient,
the correct value of the coefficient,
and the update factor itself.
It becomes difficult reach the 
correct coefficient from the real numbers,
moving small multiplicative factor each time.
Additionally, as more coefficients are
present in an equation, the task
increases in difficulty.


\begin{figure}[h!]
\centering
\caption{Coefficient Tuning Probabilities}
\label{fig:coeff-probs}
\vskip 15pt
%\\[15px]
\begin{tabular}{|l|c|c|c|}
% \hline
 % & Col 1 & Col 2 & Col 3 \\
\hline
Coefficient & $a$,$b$ & $a$,$b$,$c$ & $a$,$b$,$c$,$d$  \\
\hline
Binary & $0.1*\frac{1}{9} = 0.0111$ & $0.1*\frac{1}{16} = 0.00625$  & $0.1*\frac{1}{26} = 0.00385$ \\[1ex]
\hline
N-ary  & $0.1*\frac{1}{9} = 0.0111$ & $0.1*\frac{1}{14} = 0.00714$  & $0.1*\frac{1}{22} = 0.00455$ \\[1ex]
\hline
\end{tabular}

\includegraphics[scale=0.25, clip=true, trim=40 210 20 -20]{imgs/eqntrees/eqn-graph-space.pdf}
\end{figure}




**Difficulties of Non-determinism**


**Fundemental Issues**

1. **Non-determinism** - The √root of evil in GP
1. **Redundant Candidates** - From bloat as well as permutations on binary
   tree and terminal nodes. Due to associativity and commutativity in algebra.
1. **Structural Information Loss** - Randomized exploration operators
   lack information about the search space and equation relations.
1. **Inconsistencies in Research** - in benchmarking, metrics, and with
   cross-comparisons between implementations*.
1. **Lack of Reproducibility** - Inherent in the non-determinism that is required
   for polynomial time convergence. Also an issue with the literature*.
 
* This seems to be improving
























<div id="enhancements"></div>
<a class="right" href="#top">top</a>

### Genetic Programming Enhancements

1. **Selection Improvements** - Parent recombination and archives.
1. **Variations on crossover** - Grammar guided and probabilistic.
1. **The Island Model** - Run several GP instances with message passing.
1. **Co-evolutionary GP** - Evolve fitness predictors in parallel with equations.
1. **Hybrid Algorithms** - GP algorithms with non-GP parts


Since Koza's initial formulation of GP and SR,
there has been a plethora of research from 
generalized implementation enhancements 
to improvements addressing the issues of 
disruptiveness of crossover, bloat, population diversity, 
and premature convergence among many others.
We cover material which has 
relevance to our discussion,
though it will necessarily be abridged
due to space limitations.



#### Selection


**Brood selection**

Parents recombine multiple times for variation.


\begin{figure}[htb]
\centering
\includegraphics[scale=0.33, clip=true, trim=20 262 20 20]{imgs/gpbrood/gp-brood.pdf}
\caption{Brood selection in Genetic Programming}
\label{fig:gp-basic}
\end{figure}


Brood selection is a technique to
create better offspring 
from the crossover operation.
Rather than each set of parents 
producing only two children,
each set of parents are crossed multiple times,
producing many children.
The rational is that
by choosing multiple crossover points,
we gain a better change of 
selecting a good one.

Brood selection occurs in two phases, 
offspring creating and survival selection.
The first phase happens during crossover.
Brood selection applies crossover 
on two parents N times,
producing 2N offspring. 
In the second phase during selection,
the brood of candidates, from two parents,
are preselected to filter out the best offspring.
This best child then becomes part of the usual
survival and replication selection phases.

% \cite{tackett_1994}

% Brood selection effects the GPSR algorithm
% in both good and bad ways.
% First, selecting better crossover points
% reduces solution bloat caused by
% the destructive effects of crossover.
% \#, because good partial solutions
% have a lower chance of being disrupted,
% they can proliferate through the population,
% destroying diversity in the process.
% \#, the increases size of the offspring population
% directly increases the time spent evaluating.



**Pareto Front**

The Pareto front is a central
component to the SR framework.
The Pareto non-dominated sort,
or Pareto front, 
balances the trade-off between opposing goals
in multi-objective optimization 
[ [fonseca:1993:genetic](),
  [horn:1994:niched](),
  [van:1998:evolutionary](),
  [luke:2002:lexicographic](),
  [smits:2005:pareto]() ].
Various methods 
improve the diversity along the Pareto front,
and/or maintain archives of good solutions:
NGSA  [ [srinivas:1994:muiltiobjective]() ], 
NSGA-II  [ [deb:2000:fast]() ], 
SPEA  [ [zitzler:1998:evolutionary]() ], 
SPEA2  [ [zitzler:2001:spea2]() ], 
SPEA2+  [ [kim:2004:spea2]() ]}, 
PAES  [ [knowles:1999:pareto]() ], 
PESA  [ [corne:2000:pareto]() ],
PESA-II  [ [corne:2001:pesa]() ],
are all algorithms which aim to improve the
quality of solutions.
SPEA, PESA, MOGA --- aim to improve diversity by accounting for density along the front.
SPEA2, NSGA, NSGA-II --- use an archive to maintain the population of good solutions.
NSGA-II, SPEA2+ --- improve the time complexity of the Pareto sort itself.
The overall goal is to include individuals 
near the front and reward uniqueness and diversity
among the candidate solutions.






#### Variations on crossover

**Ideal point selection** aims to 
choose crossover points wisely.
This can be don in a context aware scheme,
where non-terminals crossing points must be of the same type.
Depth dependent crossover changes the probability
for the crossing point to be dependent upon depth.
Shallower points are favored to limit the
disruption of good subtrees.


**Stepwise Adaptive Weights** (SAW) 
alters the fitness function
with information gained during the search process \cite{eggermont:2000:stepwise}.
SAW weights each sample point,
periodically updating the weights
using the error of the best candidate solution.
If the informing candidate has non-zero error, then
either a constant is added to the weight (CSAW),
or a precision value is added (PSAW).
By variating the sample weights,
SAW accentuates points which
are not modeled well.
This exerts pressure on the
evolutionary process to 
produce better models
geared towards explaining
the difficult points.

**Tree-Adjunct Grammar Guided Genetic Programming** (TAG3P)
uses a grammar to enforce syntactical constraints on a solution
\cite{hoai:2001:framework, hoai:2002:solving, hoai:2003:tree}.
TAG3P is basically the same as GP,
having the same representation and components.
However, TAG3P differs is a couple of ways.
TAG3P only allows crossover points
where the non-terminals are the same.
A similar constraint is enforced
during mutation. Only subtrees
of the same root node can be
substituted into the parse tree.
TAG3P can also incorporate the use of
tree rewriting systems 
[ [Joshi:1975:TAG]() ].
By produces only syntactically valid solutions,
TAG3P biases the search towards those solutions \cite{hoai:2001:framework, hoai:2002:solving}.


At the individual genome level, changes to
representation, crossover, and coefficient optimization
have been explored.
Tree-based representation is standard,
others include linear, grammar-based~\cite{mckay:2010:grammar},
and graph or Cartesian GP~\cite{miller:2000:cartesian}.
Invalid mathematical operations are removed
in~\cite{keijzer:03:improving,kotanchek:2008:trustable}
and restricted by the grammar in TAG3P~\cite{hoai:2001:framework,hoai:2002:solving,hoai:2003:tree}.
Additionally, TAG3P only allows crossover points
to be of the same s-expression type.
Context-aware crossover~\cite{majeed:2006:using}
selects a snip in one tree and 
substitutes it at all valid locations
in the other parent.
\cite{korns:2008:large} extends this to include
all possible valid snip replacements from both parents.
Semantically Aware Crossover (SAC)~\cite{nguyen:2009:semantic} 
biases crossover to exchange semantically different material and
Semantic Similarity-based Crossover (SSC)~\cite{uy:2011:semantically} 
extends this, by limiting the size of material to small, manageable snips.
Real-valued coefficient optimization, 
a known difficulty for GP,
has been improved by 
local gradient search,
non-linear regression,
and swarm intelligence~\cite{topchy:2001:faster,raidl:1998:hybrid,eberhart:2001:swarm}.







#### The Island Model

The island model [cohoon:1987:punctuated]()
splits a unified population
onto several concurrent GP searches
called islands. 
The interconnections between these
islands form lines of communication.
At one extreme there is no connection
and each island as a completely
separate GP search with a smaller population.
If we follow the usual scheme of communication
then we have what is called migration.
At regular intervals, and island
informs its neighbors of its search progress.
This usually takes the form of sending
several good candidates to be included
in the neighbors equation pool.
Connection settings vary from 
a ring, fully connected, random connections,
and several other variants [alba:2000:influence]()
In [lassig:2010:benefit](),
a proof is given that islands
are needed to achieve polynomial
time convergence.
Without communication, the islands
become basic GP searches and don't
receive the added benefit of information sharing.

Using the island model with migration,
several topologies of interaction arise.
These topologies are undirected graphs.
At the extremes, 
the ring topology connects each island to one neighbor on each side
and full topology connects each island to every other island.
Other topologies connect to N random neighbors, bringing the ring
topology closer to a fully connected graph.
Using the island model for GP
permits for easy GP parallelization
[alba:2002:parallelism](http://liacs.leidenuniv.nl/~emmerichmtm/tomassini02parallel-ea.pdf).
[alba:2001:analyzing](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.452.1693&rep=rep1&type=pdf)
Analyzing synchronous and asynchronous parallel distributed genetic algorithms
and found that there was no meaningful difference in ability.
In [alba:2002:super-linear](http://atarazanas.sci.uma.es/docs/tesisuma/16640299.pdf),
they claim super-linear speed up
by running several GP searches in parallel.
However, they incorporated information sharing
between the processes which
alters the algorithm's behavior so much
that should really be considered different implementations. 


**DIAGRAMS FOR ISLAND MODEL AND ARCHIVE SELECTION**





#### Co-evolution

**Add Diagram** 


Co-evolution is the simultaneous evolution
of separate species.
Using co-evolution has several consequences
on the Symbolic Regression algorithm.
First, and most directly, evaluating equations
on only a subset of the data alleviates 
a large portion of the computational burden.
Second, co-evolution naturally adapts and
maintains pressure on both populations.
Pressure is maintained by exchanging
some of the best members of each population,
the third consequence of co-evolution.
At regular intervals, a best and diversified
set of equations is shared with the subset evolution process,
and similarly current best subsets are shared
with the equation islands. 
A fourth consequence of co-evolution is
that the subsets are free to emphasize
different areas of the data set to different extents.
This allows the search to focus on different areas
of the observation space at various times in the search.
It also permits for important points to show up
more often. 
(HODCITE) showed that points where
the rate of change in the data was increased
had a greater ability to differentiate between solutions.

Co-evolution adds a multitude of new parameters,
more than doubling the number in vanilla Symbolic Regression.
This is due to the nearly equal number of parameters
for the subset evolution process, plus
the extra parameters for describing the interaction.
Despite the large increase in parameter space,
the benefits from reduced computational effort
and increased search ability justify using co-evolution.

cite: 
[packard:1988:...]()
[kaufman:1991:...]()


% competitive vs cooperative






#### Hybrid Algorithms


Due to issues with
benchmarking SR algorithms [McDermott:2012:benchmarks](),
as well as generally poor accuracy
from state-of-the-art GP algorithms [korns:2011:accuracy](),
several recent works have proposed
hybrid or alternative techniques to SR.
[topchy:2001:faster]()raidl:1998:hybrid,eberhart:2001:swarm} use
hybrid approaches to speed equation parameter fitting.
Abstract Expression Grammar (AEG) [korns:2011:abstract](),
uses several concurrent GP searches
with abstract place-holders.
This enables the optimization methods
to focus on smaller areas of the search space in parallel.
Fast Function eXtraction (FFX) [McConaghy:2011:FFX]()
is a non-GP, deterministic algorithm for SR.
In FFX, the model is a Generalized Linear Model and
pathwise regularized learning [zou:2005:regularization]()friedman:2010:regularization} is used to optimize model parameters.
In [bongard:2013:improving](), a hybrid GP-FFX algorithm
in proposed, where FFX is used for feature selection
prior to a GP search
Their approach was shown to be more effective than either one alone.

The classical GP algorithm naturally fits both
functional and data parallelism,
and as such, there exists
a significant amount of literature on the subject.
The first investigation was done by the originator of GP,
Koza [koza:1995:parallel]().
The effects of (a)synchronous execution in distributed GP
were investigated in [alba:2001:analyzing](),
concluding that asynchronous execution achieved
equivalent or better results in less time.
[alba:2000:influence]() investigates the influence
of migration policy on distributed GA's and
[lassig:2010:benefit]() proves that
migration is required for convergence.
In [hodjat:2014:maintenance](),
the effects on, and maintenance of, long-running GP systems
is investigated.
Work towards implement GP systems on cloud providers
is explored in [veeramachaneni:2013:learning]()derby:2013:cloud}.
Other research [langdon:2010:large]()harding:2011:implementing,augusto:2013:accelerated}
has focused on utilizing the GPU
to speed up evaluation.
Several advanced GP systems have also
emerged as the field has matured,
including:
AEG [korns:2011:abstract](),
Ec-Star [oreilly:2013:ecstar](),
Eurequa [hod:09:science](), and
FlexGP [derby:2013:flexgp]().

In addition to research on scaling GP for BigData,
many works have investigated
the application of GP-based SR to real-world problems.
Here we give an overview of GP application
on differential equations and dynamical systems,
but the body of literature is filled with applications
to many fields.
General application to dynamical systems
are investigated in [lay:1994:application]()cao:2000:evolutionary,tsoulos:2006:solving,hod:08:mining,iba:2008:inference,seaton:2010:analytic}.
Specific applications to
metabolic networks can be found in [cho:2006:identification]()schmidt:2011:automated}
and genetics in [sakamoto:2001:inferring]()qian:2008:inference}.
In [hod:07:pnas](), it was shown that
the equations to a dynamical system
could be searched in parallel
by using a partitioned evaluation scheme.
Dynamical systems with multiple-time-scale,
with signals composed of simpler signals operating at different time-scales,
is investigated in [cornforth:2012:symbolic]().
[cornforth:2013:inference]() showed that
equations for unobserved variables in dynamical systems
can be recovered in some instances.
Invariants, or conserved quantities, were shown
recoverable in [hod:09:implicit_long]()hod:09:science}.
Hybrid dynamical systems,
which feature both discrete and continuous components,
were shown tractable in [ly:2012:learning]().
Much of these works use simulated data from known systems.
There are, however, many references to use of GP on
real-world problems and data as well.




























































<br>

<div id="ffx">
<a class="right" href="#top">top</a>
</div>


### Fast Function eXtraction

Fast Function eXtraction (FFX)
is the first deterministic SR implementation
[ [McConaghy:http:FFX](http://trent.st/ffx/), 
[McConaghy:2011:GPTP](http://trent.st/content/2011-GPTP-FFX-paper.pdf),
[McConaghy:2011:CICC](http://trent.st/content/2011-CICC-FFX-paper.pdf) ].
FFX does not use genetic operators,
tree based representations,
or random number generation.
Instead, FFX uses a Generalized Linear Model (GLM).
and a set of basis functions derived from the input features.
FFX then applies a series of regressions to fit
the parameters of the basis functions
to a desired complexity
This makes FFX very fast, but also
limits its flexibility and 
the complexity of solutions.



#### Algorithm

FFX uses a Generalized Linear Model (GLM) of the form:

$$ y = F(\vec{x},\vec{w}) = \sum \limits_b^B w_b  f_b(\vec{x}) $$

The GLM has linear coefficients to terms of the summation,
and is a flexible version of ordinary linear regression.
[ [McCullagh:1972:Paper](), [McCullagh:1989:Book]() ]
The $$f_b(\vec{x})$$ are not required to be linear functions themselves,
but rather linear in coefficients, to the terms of the summation.
In other words, there are no
coefficients inside any of the $$f_b(\vec{x})$$.

To learn the coefficients of the GLM, FFX uses
Pathwise Regularized Learning (PRL).
PRL augments least squares by adding regularization terms
and then sweeping across and returning multiple parameter vectors
[ [ZouHastie:2005:Paper](), [Friedman:2010:Paper]() ].
PRL also has some interesting properties:

1. Learning speed is comparable or better than least squares
1. Can learn when there are fewer samples than coefficients
1. Can learn thousands or more coefficients
1. Sets of coefficient vectors are returned trading off the number of coefficients and training accuracy


<div class="center-align"><b>Figure #</b>: FFX Algorithm</div>

{% highlight Python linenos %}

def FFX(Data):
    bases = createBasisFunctions(features)

    for b in range(1,B):
        alpha = 1.0
        while complexityOf(eqn) != b:
            eqn := PathwiseLearning(Data,alpha)
            adjustLambda(eqn,alpha)
        
        best.Push(eqn)
  
    return best

{% endhighlight %}


Following the psuedo code,
FFX first creates a set of 
basis functions for the GLM.
To do this, univariate bases from each variable
with the operations ($$x^{\pm 0.5}, x^{\pm 1}, x^{\pm2}, abs(x),log(x)$$).
In their example this produced 176 bases.
Next, the univariate bases were combined
to produce 3374 bivariate bases,
resulting in 3550 total bases.
By allowing bases to be in both the
numerator and the denominator,
the overall number of bases doubles to 7100.

Then, for all $$b$$ from $$1 \rightarrow B$$,
FFX derives a linear combination of
$$b$$ basis functions.
To learn a model, FFX applies
pathwise regularized learning
to fit the GLM coefficients.
This learning method uses
a coefficient threshold value $$\alpha$$ ...

This has the effect of alternating between 
increasing and decreasing the number of bases
and contiunues until
the number of function bases equals the desired model complexity.

FFX repeats this process for a number
of desired complexities so that
a variation of models is returned.

FFX then learns a linear combination of
$$b$$ basis functions, from $$1 \rightarrow B$$, 


This enables similar behavior to 
GP returning the first Pareto Frontier.


#### Limitations

FFX works well for many problems,
requiring far fewer computations GP,
FFX, however, suffers from two significant limitations: 

(1) there are no coefficients 
or parameters within the bases,
meaning more difficult, 
non-linear relationships are beyond its abilities.
This issue could be addressed 
by using non-linear regression
and abstract coefficients.

(2) individual terms of the summation
are limited in complexity
to a pair-wise combination of uni-variate and bi-variate
bases determined at initialization.
Seeding with increased basis functions
could become prohibitive as the number of
terms grows through pair-wise basis combinations.
In the 13 variable example provided,
the initial number of GLM basis functions was 7100.



but is limited in the complexity of solutions.
This limitation of FFX is due to only using
a linear combination of univariate and bivariate bases.
Equations such as $v = x*y*z$ are beyond the
abilities of FFX.
Additionally, there are no coefficients 
or parameters within the bases.
FFX can use non-linear functions,
like $\cos$ and $log$,
but non-linear fitting is not possible.
Thus, equations such as $e^{a-bx}$ and $a\cos(b+\theta)$
are also unsolvable by FFX.
As FFX is incapable of finding
many of the benchmarks,
we did compare against it.


















<br>

<div id="regression">
<a class="right" href="#top">top</a>
</div>

### Regression Techniques

There are many methods for regression,
which generally attempt to explain the
relationship between variables.
Here, we highlight several
which are common or relavent
to the subject matter.


#### Linear Regression

Linear regression is a technique for modelling
a dependent variable from
a set of independent variables
and unknown parameters.
The most common method for
determining the parameters
is least squares,
which minimizes the squared residuals
[ [Legrand:1805:orbites_des_comietes](https://books.google.com/books/about/Nouvelles_m%C3%A9thodes_pour_la_d%C3%A9terminati.html?id=FRcOAAAAQAAJ)].
The key is that the dependent variable
is linear to the parameters of the
basis terms constructed
from the independent variables.
Nonlinear functions map be used,
so long as parameters remain linear.


#### Nonlinear Regression

Nonlinear regression is an extension
to the linear variation where the 
independent variable can now have
more complex, nonlinear relationships
to the parameters and depenent variables.
Unlike linear regression, no guarentee
can be made to the optimality of the
final parameter estimate.
Most methods for estimating the parameters
incorporate successive iterations
which improve upon the accuracy.
Signifcant algorithms include
Gauss-Newton,
Levenberg–Marquardt,
and gradient descent
[ [Fletcher:2000:Book](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0471494631.html),
  [Madsen:2004:Methods](http://www2.imm.dtu.dk/pubdb/views/edoc_download.php/3215/pdf/imm3215.pdf)].



#### Support Vector Regression

Support Vector Regression Machines (SVRM) ere proposed
as a variation on the original Support Vector Machine (SVM)
[ [Vapnik:1996:SVRM](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.10.4845) ].
In SVM, a classification boundary is sought which
maximizes the margin between the classes.
In SVRM, the basic idea is to flip around the SVM problem
and find a line with where the deviation is minimized.
SVM and SVRM work for both linear and nonlinear models
and is a convex optimization problem
[ [Smola:1996:Tutorial](http://lasa.epfl.ch/teaching/lectures/ML_Phd/Notes/nu-SVM-SVR.pdf) ].

#### Ridge, Lasso, Elastic Net

**Ridge** regression is a regularization method
for ordinary least squares. 
It uses the L2-norm of the parameter vector,
imposing a penalization is added for excessively large parameters.
Often a scaling term is used to control
the effect of the penalty.
[[Tikhonov:1943:stability](http://a-server.math.nsc.ru/IPP/BASE_WORK/tihon_en.html)]

**Lasso** regression is similar to Ridge
as a regularization method on ordinary least squares.
Lasso uses the L1-norm, which causes
terms to have zero valued parameters,
thus effectively removing them from the model
[ [Tibshirani:1996:lasso](http://www-stat.stanford.edu/~tibs/lasso/lasso.pdf),
 [stanford:http:lasso](http://statweb.stanford.edu/~tibs/lasso.html) ]

**Elastic Net** is the linear combination of 
Ridge and Lasso techniques
[[Zou:2005:elastic](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.124.4696)].
This method uses the offsetting features 
of both methods to find a sparse model
with few non-zero terms.











<br>

<div id="graph">
<a class="right" href="#top">top</a>
</div>

### Graph Algorithms

We include several graph problems and algorithms
as they served as seeds of thought
that grew into the PGE algorithm.

#### Minimum Spanning Tree

The Minimum Spanning Tree (MST)
of a graph is a tree which
minimizes the sum of edges which
connect all vertices in a graph.
MST is solvable in polynomial time
using a greedy algorithm.

**Prim's** algorithm is a greedy algorithm 
for finding the MST of an undirected graph. 
The algorithm starts with an arbitrary vertex
and constructs the MST by adding the
lowest weight edge of a node
which is already in the MST.
A priority queue is used
to efficiently determine 
the next lowest cost edge to add.
[ [Prim:1957:Shortest](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=6773228) ]

**Kruskal's** algorithm is also a greedy algorithm
for finding the MST of an undirected graph.
The algorithm starts by treating each
vertex as a separate MST.
It then proceeds to select the minimum
edge from all remaining edges.
If the edge connects two distinct MSTs,
then it is included, otherwise, the edge
introduces a cycle and is subsequently discarded.
A disjoint-set data structure can be used
to effeciently determine this condition.
[ [Kruskal:1956:Shortest](http://www.ams.org/journals/proc/1956-007-01/S0002-9939-1956-0078686-7/home.html) ]

#### Single-source Shaortest Path

The single-source shortest path (SSSP) problem
is to find the shortest path to all nodes,
given a starting point.

**Dijkstra's** algorithm for SSSP is
a greedy algorithm which resembles Prim's.
[ [Dijkstra:1959:algorithm](http://www-m3.ma.tum.de/twiki/pub/MN0506/WebHome/dijkstra.pdf) ].
At each step, the next closest vertex
is added to the already visited set, 
thus expanding outwards in a greedy manner.
A priority queue is used as well
to improve upon runtime complexity.
The difference is that at each step,
the distances to vertices on the frontier
are updated to reflect the latest addition,
and thus possibly changing the order
of the priority queue.
Knuth generalized Dijkstra's algorithm to hyper-graphs
[ [Knuth:1977:generalization](http://www.sciencedirect.com/science/article/pii/0020019077900023)].


**A\* search** is a graph traversal algorithm
proposed as an extension to Dijksta's algorithm
with better runtime performance.
[ [Hart:1968:astar](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=4082128)]
The A\* algorithm cuts down on the size of the subgraph that must be explored,
by using a heuristic to estimate a lower bound on the "distance" to the target.
Similarly, it uses a priority queue to determine
the next vertice to include.
The difference is that the current distance
is added to the estimated distance to the target.





