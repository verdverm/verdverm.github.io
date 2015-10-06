---
layout: post
title: Genetic Programming
brief: Related work, learning with evolution
sections:
  - name: Overview
    tag: overview
    brief: Learning through evolution
  - name: Algorithm
    tag: algorithm
    brief: Details of the Genetic Programming algorithm
  - name: Limitations
    tag: limitations
    brief: Problems with the original formulation
  - name: Enhancements
    tag: enhancements
    brief: Improvements upon the baseline
  - name: Fundemental Issues
    tag: issues
    brief: Which arise from randomized searches
---



<div id="overview"></div>
<a class="right" href="#top">top</a>

#### Overview


Genetic Programming (GP) is the original,
and most common implementation of SR.
In \cite{koza:1992:gen_prog},
term GP is used as both a problem and an implementation,
as well as classifying SR as a sub-problem to GP.
We want to again make a distinction between 
the task of symbolically regressing
a parse tree in a grammar,
from the method of realizing that tree.
From here on out, when we refer to
GP, we mean an evolutionary implementation of SR.
Again, we also us SR to mean the general problem,
limiting our examples to equation regression,
which we consider a specific sub-problem of SR.
The following GP concepts can be mapped to the 
generalized SR algorithm for arbitrary expression evolution.

GP is a highly stochastic,
non-deterministic search heuristic
based on natural selection
GP requires six components to be defined:
representation, evaluation, selection, genetic operators, 
initialization \& termination, and population management.
GP uses these components to refine
equations over a number generations.
From an initial, random set of equations,
GP iteratively evaluates individuals,
chooses parents to breed children,
a selects which candidates survive. 
GP continues this process until
a model of desired accuracy is discovered,
or a computational threshold is reached.

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
something laking but being addressed\cite{McDermott:2012:benchmarks}.

In this chapter, we overview 
the inner workings of GP,
citing relevant research in the field.
Section \ref{sec-gpsr-basic} 
overviews the requirements
and describes the search process
for a GP implementation. 
% Section \ref{sec-gpsr-theory} discusses
% some of the theory underlining GPSR.
Section \ref{sec-gpsr-limits} discusses 
the limitations of GP and their origins.
Section \ref{sec-gp-enhance} presents 
remedies and enhancements to the GP algorithm.
We conclude with some remarks
about the conceptual limitations of GP
and set the stage for the 
novel, deterministic method of SR.
For detailed discussions of 
tree-based Genetic Programming,
see \cite{koza:1992:gen_prog,kouch:08:thesis}.





\subsection{Origins}
\label{section-gp-origins}

Since Koza's initial formulation of GP and SR \cite{koza:1992:gen_prog},
there has been a plethora of research from 
generalized implementation enhancements 
to improvements addressing the issues of 
disruptiveness of crossover, bloat, population diversity, 
and premature convergence among many others.
We cover material which has 
relevance to our discussion,
though it will necessarily be abridged
due to space limitations.

\textbf{Early History}
\label{section-gp-origins-koza}

Genetic Algorithms...


\textbf{Koza's Original Formulation}
\label{section-gp-origins-koza}


% \subsection{Schema Theory}

% kouch pg47

% holland 1975

% form with ``blanks'' where not solved yet

% introns: nop material (could be removed)

% propagates through the population

% increases in size as solution gets better
% compactness / linkage

% crossover disrupts long schema (under uniform probability) [bloat]
% genetic drift - premature convergence, loss of generality (schemta)

% mutation disrupts if good parts of schema are selected





<div id="algorithm"></div>
<a class="right" href="#top">top</a>

#### The Algorithm


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



##### Representation

Section \ref{sec-sr-rep} described the general framework for 
representing equations in an SR implementation.
GP uses the operators and operands of this framework
to construct parse trees for equations.
The parse trees are chromosomes of an individual.
This analogy is important to the methodology
which uses sexual reproduction, mutation,
and natural selection to search.

One specific note about representation,
equation coefficients are real valued numbers.
As we will see, having continuous parameters,
and optimizing by evolution, makes the task much harder.


\noindent
\textbf{Populations}

The population is the pool 
of candidates equations GP has to work with.
Basic GP uses a single population.
Parents are selected from this population
for breeding, children and parents
compete for positions in the population
between generations.

The Pareto front is a central
component to the SR framework.
As such, it has received much
research attention which has
resulted in progress.
NGSA \cite{srinivas:1994:muiltiobjective}, 
NSGA-II \cite{deb:2000:fast}, 
SPEA \cite{zitzler:1998:evolutionary}, 
SPEA2 \cite{zitzler:2001:spea2}, 
SPEA2+ \cite{kim:2004:spea2+}, 
PAES \cite{knowles:1999:pareto}, 
PESA \cite{corne:2000:pareto},
PESA-II \cite{corne:2001:pesa}
are all algorithms which aim to improve the
quality of solutions.
SPEA, PESA, MOGA --- aim to improve diversity by accounting for density along the front.
SPEA2, NSGA, NSGA-II --- use an archive to maintain the population of good solutions.
NSGA-II, SPEA2+ --- improve the time complexity of the Pareto sort itself.
The overall goal is to include individuals 
near the front and reward uniqueness and diversity
among the candidate solutions.

Population size becomes an important parameter 
to the success of a particular GP implementation.
The population can be small and granular,
at the extreme a cellular population
with each equation a separate population.
The population can be big and unified
becoming a single gene pool.


\textbf{Island Model}
\tony{diagram}
% In order to facilitate diversity maintenance,
% the overall population is subdivided into
% separately evolving processes. 
% This methodology is called the Island Model and
% has its roots in the way human cultures 
% separately evolved. 
% At the extreme, each candidate becomes its
% own island and is then referred to as
% cellular grid.

% (Theory paper on expo/poly time to convergence)
% (CITE) demonstrated an important point 
% about evolving populations, knowledge flow, and convergence rates.
% They showed that a single population has
% exponential time for convergence and extended this 
% to show that N independently evolving populations
% still have exponential convergence time.
% What is needed is interaction, such as a boat
% carrying a couple of equations from one island
% to another, i.e. migration. 
% With the migration scheme,
% THEY showed that convergence times become polynomial.
% (exponential and polynomial to WHAT?)

% Are their parallel papers which do this
% talk about parallel nature of SR, GPSR, and PESR?
% super-linear speed up?
% Islands change the implementation of the algorithm
% and how it actually works
% and should not be compared against a single island run,
% at least not to claim super linear speed up.
% (CITE koza super-linear speedup, 
% Theory paper on expo/poly time to convergence)


% superlinear speedup...
% koza, [8]


The island model\cite{cohoon:1987:punctuated}
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
and several other variants \cite{alba:2000:influence}
In \cite{lassig:2010:benefit},
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
\cite{alba:2002:parallelism}.
\cite{alba:2001:analyzing}
Analyzing synchronous and asynchronous parallel distributed genetic algorithms
and found that there was no meaningful difference in ability.
In \cite{alba:2002:super-linear},
they claim super-linear speed up
by running several GP searches in parallel.
However, they incorporated information sharing
between the processes which
alters the algorithm's behavior so much
that should really be considered different implementations. 

\begin{figure}[htb]
\centering
\includegraphics[scale=0.25, clip=true, trim=30 40 20 20]{imgs/gpdiag/gp-diag.pdf}
\caption{Archive selection and Island model in Genetic Programming}
\label{fig:gp-basic}
\end{figure}




\noindent
\textbf{Initialization}
Initialization determines the search starting point 
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


\noindent
\textbf{Evaluation}
\label{sec-gpsr-eval}

Evaluation was discussed in the last chapter.
(see Section \ref{sec-symreg-eqneval})


\noindent
\textbf{Selection}
\label{sec-gpsr-sel}


Selection is the most important part
of evolutionary algorithms.
Selection determines the difference
between good and bad solutions.
Therefore it is very important 
to choose the selection mechanisms wisely\cite{Dumitrescu:2000:EC}.


Selection occurs at the generational switch,
and chooses which candidates will form
the parents that produce offspring.
In order for the search to converge
to the (locally) optimal solutions,
partial solutions must be selected
at earlier points.

As the great MPUA says
\begin{quotation}
``The sole reason we exist is to survive and replicate. That's it.''
\end{quotation}
\hfill Mystery

Selections role is to differentiate between candidates,
based on their quality, for survival and replication.
This artificial environmental pressure causes natural selection,
raising the fitness of the population.
\cite{Dumitrescu:2000:EC,goldberg:1991:comparative}
extensively cover the variations in selection schemes.
Here, we will give an overview to show what is possible.

There are two types of selection,
for survival and recombination.
Recombination is the chance of 
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

Binary Tournament \cite{goldberg:1991:comparative}
selects two individuals and competes them
for one of the parental equations.
This is down twice to generate both parents
for a recombination.
Binary tournament can be extended to 
compete N candidates against each other.
Binary tournament is similar to selecting a pivot point 
in library implementations of quicksort.

Survival is the chance of an individual
solution remaining in the population.
In the elitist method,
a parent is only removed if
one of its offspring is better than it.
In the pure method,
all parents and children
contend for a spot in the population.

% survival: chance of making it to the next generation
% -----------
% elitist vs pure
%  - elitist, child must be better than parents
%  - pure all parents and children contend for the allocated spots










\noindent
\textbf{Variation}

\label{sec-gpsr-breed}
Variation, or breeding is 
the means by which Symbolic Regression (or GP)
searches the space of equations.
The search uses both explorative and exploitative
techniques to find unexplored regions to search locally.
Crossover is the explorative technique used by Symbolic regression.
Mutation is the exploitation technique to search 
around a potential solution.
A balance is needed to make progress 
through the space and narrow in on good solutions.

% innovative vs conservative operators
% exploit vs explore
% small variations vs large changes




% mutation: 
%   - allow rate to decrease
%   - vary by tree position (prob by depth - top has lower chance)


\begin{figure}[htb]
\centering
% \includegraphics[scale=0.33, clip=true, trim=50 250 50 50]{imgs/eqncrossmutate/eqn-cross-mutate-color.png}
\caption[Genetic Operatiors]{Crossover (colored boxes) and Mutation (red circles)}
\label{fig:eqn-cross-mutate}
\end{figure}

\textbf{Crossover}, analogous to sexual reproduction, 
uses two parent equations to produce child offspring equations.
In Symbolic Regression, subtrees of the parents
are selected, snipped, and swapped. 
This method is similar to crossing DNA, 
except that SR is tree-based and not linear. 

The original method selects subtrees of an equation at random.
It is considered a destructive operation due to the significant
probability that good schemata of the tree are disrupted.
Disrupted in this context means that a partial solution,
stored in a subtree, has an internal node selected for the crossover point.
To combat this, i.e. reduce the probability of disruption,
candidate solutions grow extra 'genetic material' that has little
value in the evaluation. 
This 'natural' growth is called \textit{bloat}.

% There are several alternatives which seek to 
% reduce bloat or optimize the crossover point selection.
% - limit to differences between chromosomes


\textbf{Mutation} alters a single candidate equation
to search locally around that candidate.
It is also the way the vanilla algorithm
optimizes real-valued coefficients.
Mutation simply selects a node of a tree
and changes it to a different type.
Examples of mutations are 
a change of variable from X to Y, 
an operation from addition to subtraction,
or a coefficient scaled by a random value in some predefined range.

\textbf{Injection} is much like mutation,
in which a single candidate is altered
by choosing a single point of change.
However, instead of changing a node type,
the subtree is trimmed and replaced
by a freshly grown branch.
In terms of explorative and exploitative
search qualities,
injection lies between
crossover and mutation.






\noindent
\textbf{Termination}

% convergence: the point at which the population
% contains a majority of the same individual... redundancy...


% process iterated until a 
% candidate of desired quality is realized
% or a predefined computational limit is reached

% quality 
% threshold, lack of improvement

% time, count
% evaluations, generations, equations
% in most implementations these
% become equivalent measures



% -----
Since Symbolic Regression is a heuristic search,
it has no intrinsic stopping point.
Therefore, we must tell it when to stop,
though in general, it's difficult to know when.
Run time can be used, but is generally not
due to the effects of processing on varied hardware
and the fact that the searches tend not to 
take more than a few minutes.

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
Another performance based method uses \textit{hits},
the number of data points which a candidate equation
is within some threshold of the real value.
In this case, the search terminates if any
candidate scores a hit on all data points
or some percentage of all the data points.

% Other schemes attempt to 
% measure the progress of the search.
% One such example is the number of generations
% since a new best solution has been found.
% If the search continues for a time without finding 
% improvement, then termination occurs.

% All the aforementioned methods 
% require an extra parameter
% and are sensitive to the 
% magnitude of the data
% as well as the error accumulation function.


No matter what means is used
to determine the stopping point,
the results of the search need to be returned.
Generally a set of the best solutions are returned,
providing some amount of diversity.
This set usually comes from the Pareto frontier,
but can also include solutions which come from
successive frontiers.





\begin{figure}[htb]
\centering
\includegraphics[scale=0.33, clip=true, trim=20 262 720 20]{imgs/gpbasic/gp-basic.pdf}
\caption{The basic Genetic Programming process}
\label{fig:gp-basic}
\end{figure}

\textbf{The Basic GP Process}
\label{sec-gpsr-steps}


\textbf{Searching with GP}

GP starts by creating a 
random population of initial equations.
During each generation, 
individuals in this population are 
evaluated for fitness
to determine how well the model the data.
A subset of the equations are
the selected for breeding.
We use brood selection
which produces many offspring
per parent pair.
This is done to alleviate 
some of the limitations 
of the genetic operators,
crossover and mutation.
The offspring equations are then evaluated.
Within each brood, the best candidate
is selected into the general population.
This general populations is then
selected within for survival.
This produces the next
generation of equations.
GP continues in this fashion until
a model of desired accuracy is discovered,
or a computational threshold is reached.









% and the evolutionary operators, 
% crossover and mutation (section \ref{sec-gpsr-breed}),
% to breed parents into offspring
% between iterations, referred to as generations.

% These coefficients are optimized through the evolutionary process,
% either altered through mutation or substituted by crossover.
% This makes finding the 
% optimal values for these coefficients 
% a difficult task for GP.
% This sub-problem for SR 
% increases in difficulty as 
% more coefficients in an expression 
% create a more complex optimization space
% for a particular expression form.
% We will describe this issue
% in greater detail Section \ref{sec-gpsr-limit}.



% \textbf{Initialization}

% When Symbolic Regression starts 
% an initial set of equations is created.
% This initialization forms the starting points
% of the search and is vitally important to the
% success of the SR algorithm.




















% \noindent
% \textbf{Parameters to GP}

% \noindent
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



% Island Based:
% - \# of islands
% - layout (ring/grid)
% - connections
% - pop per or total
% - migration size / rate


% Enhancements:
%  - co-evo has same as single search
%    plus:
%      -- fitness predictor size
%  - archived pop mgmt
%    -- archive selection
%    -- archive size


























<div id="limitations"></div>
<a class="right" href="#top">top</a>

#### Limitations












\subsection{Limitations}
\label{section-gp-limitations}


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






\textbf{Representation Issues}

\noindent
\textbf{closure}

\noindent
In the basic GP algorithm,
expressions are generated at random.
This can result in invalid operations
being evolved which violate our
basic mathematical constraints.
Closure is the property of an
expression being valid, mathematically.

A simple remedy exists in which
invalid operations are removed
and functions such as log
are protected.
This method has been termed 
\textit{interval arithmetic} \cite{keijzer:03:improving,kotanchek:2008:trustable}.
A second method is to place restrictions
on the grammar, as in
\cite{hoai:2001:framework,hoai:2002:solving,hoai:2003:tree}.
Hoai prevents invalid expressions from being generated
where the previous method removes them later.


\noindent
\textbf{Inefficacy of Coefficient Tuning}

\noindent
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
Common mutation rates are 10\% and below,
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
assuming mutation rate of 10\%.
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








\textbf{Premature Convergence}

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



\textbf{Bloat}

Equation bloat is the growth of average candidate size
over course of evolution.
Bloat is inherent in any variable length representation\cite{langdon} [190].
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

% disruptiveness of crossover
% probability argument
% create extra material  -g/L sin(theta) + 0.0001 * theta * x
%  - no justification


\noindent
\textbf{Disruptiveness of Crossover}
% \tony{diagram: tree with probabilities} \ref{fig:coeff-probs}

\noindent
Crossover is the main explorative operator of SR. 
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















\textbf{Population Diversity}

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


\textbf{Redundancy of Candidate Solutions}

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



% \subsection{Difficulties of Non-determinism}






<div id="enhancements"></div>
<a class="right" href="#top">top</a>

#### Enhancements




GP has had many enhancements
that are meant to overcome its limitations.
These enhancements come in two classes,
remedies addressing specific issues
and improvements that effect
many aspects of the algorithm.

% improvements to GP
% remedy vs improvement

% fixed: determined prior to run
% static or dynamic
% feedback mechanism

% bootstrap initialization

Since Koza's initial formulation of GP and SR \cite{koza:1992:gen_prog},
there has been a plethora of research from 
generalized implementation enhancements 
to improvements addressing the issues of 
disruptiveness of crossover, bloat, population diversity, 
and premature convergence among many others.
We cover material which has 
relevance to our discussion,
though it will necessarily be abridged
due to space limitations.

%Population level improvements:
Selection is arguably the most important
aspect of GP,
determining which solutions 
continue contributing to the search
and which results will ultimately be returned.
The Pareto non-dominated sort,
or Pareto front, 
balances the trade-off between opposing goals
in multi-objective optimization 
\cite{fonseca:1993:genetic,horn:1994:niched,van:1998:evolutionary,luke:2002:lexicographic,smits:2005:pareto}.
Various methods 
improve the diversity along the Pareto front,
and/or maintain archives of good solutions:
NSGA-II~\cite{deb:2000:fast}, 
SPEA2~\cite{zitzler:2001:spea2}, 
SPEA2+~\cite{kim:2004:spea2+}, and
PESA-II~\cite{corne:2001:pesa}.
These algorithms all aim to improve the
quality of solutions in a population.
Age Layered Population Structure (ALPS)~\cite{hornby:2006:alps}
partition the population by age to
restrict competition and breeding interactions,
combating premature convergence.

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

Abstract Expression Grammar (AEG)~\cite{korns:2011:abstract},
uses several concurrent searches
with state-of-the-art GP implementations.
AEG replaces functions, variables, and coefficients
with abstract place-holders.
These place-holders enable different optimization methods
to focus on restricted subsections of the search space or 
parts of an expression.
Parameters and restrictions to a SR method
are encapsulated into a SQL-like language,
providing high level specifications
and fine-grained search control.
Opening book rules allow each island
to be tailored to search a reduced
area of the search space, while
closing book rules enable AEG to
update the constraints on islands
which have stagnated.
The author states that designing closing book rules
is time consuming, were arrived at empirically, 
and often need to be tailored to the SR system and problem at hand.
AEG was shown to make many problems tractable with current techniques~\cite{korns:2011:accuracy}.
Additionally, almost any SR algorithm can be used within the AEG framework.


\textbf{Bloat}
% \tony{depth based probability}

% bloat counters \cite{panait:2004:alternative}

% Counter: (Brood Selection, More intelligent cross point selection, hill climbing)

% brood?
\noindent
\textbf{Brood Selection}

\begin{figure}[htb]
\centering
\includegraphics[scale=0.33, clip=true, trim=20 262 20 20]{imgs/gpbrood/gp-brood.pdf}
\caption{Brood selection in Genetic Programming}
\label{fig:gp-basic}
\end{figure}

\noindent
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

\noindent
\textbf{Ideal point selection}

\noindent
Ideal point selection aims to 
choose crossover points wisely.
This can be don in a context aware scheme,
where non-terminals crossing points must be of the same type.
Depth dependent crossover changes the probability
for the crossing point to be dependent upon depth.
Shallower points are favored to limit the
disruption of good subtrees.


% - improvements to components
% -- variation operators
% ---- crossover: brood meant to decrease effect of destructive crossover
% ---- context aware crossover [139,216]
% ---- smarter crossover [131] uses subtree eval contribution
% ---- depth dependent [123] favored shallower points


\textbf{Population Diversity}

Maintaining population diversity 
is one of the most pressing issues
in GP. A diverse population is 
required to search effectively.
Many aspects of the GP
algorithm effect diversity.
Archive selection schemes
maintain a separate population
of equations so that 
good solutions are not lost.
The island model uses
separate GP searches
so that the population is distributed.
This prevents one individual from
dominating the entire population
and migration allows the separate
process by sharing information.


% ancestry information
% archive selection
% Island model

% -- initialization
% ---- multiple brief pre-runs to create diverse initial pop
% ---- RAND\_tree [132,30] uniform sampling of tree-derivation grammar

% % \textbf{Redundancy of Candidate Solutions}

% results in redundancy within population, premature convergence, excessive evaluation


% \textbf{coefficient tuning}
% Counter: open research question

% local gradiant search of numeric leaf values
% \cite{topchy:2001:faster}

% We believe that we can remove the process of 
% coefficient tuning from the GP process.
% This is done by using placeholder coefficients
% rather than floating point coefficients.
% The equations with placeholders are
% sent to a linear or non-linear solver
% which returns the best values of these coefficients.
% This causes the evaluation cost of a 
% single equations to rise substantially.
% However, as we will show in our contributions to GPSR, 
% tuning coefficients this way allows GPSR
% to focus on form rather than function.
% Despite the increased cost of candidate evaluation,
% our results show that this 
% ...
% Reduces the time/steps to convergence
% increases the correct convergence rate
% ... 


\textbf{Other Advancements}
\label{sec-gp-adv}

% \textbf{Cost of Evaluation}

% Counter: Fitness Predictors
% these also help with solution bloat
% parallel execution

\textbf{Co-Evolution }
\tony{diagram}
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

% \textbf{coevolution}

% packard 1988
% kaufman 1991


% competitive vs cooperative

% --------------



% - innovative ideas enhancing GP performance
% -- simplification [339]
% -- layered learning (hierarchy) [57,125,126,141,295]




% - ensemble, in effort to make trustable \cite{kotanchek:2008:trustable}


% - hybrid tried by many
% -with non-lin, interval arithm, \cite{raidl:1998:hybrid}
% -- results not very parsimonious










Symbolic Regression is the problem in which
analytical formula are derived
directly from observational or measured data
without any \textit{a priori} domain knowledge.
Abstractly, SR searches
the expression space
defined by a grammar to
find the best form of an expression.
In practice, the space is usually
mathematical formula and the expression
is an equation where the variables
are the features in the data set.
Thus, SR is a function identification task
where the inputs and outputs are known
and the search is for an unknown model.

The most common implementation of SR
is called Genetic Programming (GP) \cite{koza:1992:gen_prog},
an algorithm inspired by Genetic Algorithms (GA).
The classical GP algorithm is a
probabilistic search over the
syntax-tree representation of an equation.
GP starts by randomly creating an
initial pool (population) of equations.
During each iteration (generation),
individuals in this population are
evaluated for fitness,
selected for survival and replication,
and then recombined using methods which resemble
sexual reproduction and mutation.
The GP algorithm completes when
a model of desired accuracy is discovered
or a computational threshold is reached.

Due to issues with
benchmarking SR algorithms~\cite{McDermott:2012:benchmarks},
as well as generally poor accuracy
from state-of-the-art GP algorithms~\cite{korns:2011:accuracy},
several recent works have proposed
hybrid or alternative techniques to SR.
\cite{topchy:2001:faster,raidl:1998:hybrid,eberhart:2001:swarm}~use
hybrid approaches to speed equation parameter fitting.
Abstract Expression Grammar (AEG)~\cite{korns:2011:abstract},
uses several concurrent GP searches
with abstract place-holders.
This enables the optimization methods
to focus on smaller areas of the search space in parallel.
Fast Function eXtraction (FFX)~\cite{McConaghy:2011:FFX}
is a non-GP, deterministic algorithm for SR.
In FFX, the model is a Generalized Linear Model and
pathwise regularized learning~\cite{zou:2005:regularization,friedman:2010:regularization} is used to optimize model parameters.
In~\cite{bongard:2013:improving}, a hybrid GP-FFX algorithm
in proposed, where FFX is used for feature selection
prior to a GP search
Their approach was shown to be more effective than either one alone.

The classical GP algorithm naturally fits both
functional and data parallelism,
and as such, there exists
a significant amount of literature on the subject.
The first investigation was done by the originator of GP,
Koza~\cite{koza:1995:parallel}.
The effects of (a)synchronous execution in distributed GP
were investigated in \cite{alba:2001:analyzing},
concluding that asynchronous execution achieved
equivalent or better results in less time.
\cite{alba:2000:influence} investigates the influence
of migration policy on distributed GA's and
\cite{lassig:2010:benefit} proves that
migration is required for convergence.
In~\cite{hodjat:2014:maintenance},
the effects on, and maintenance of, long-running GP systems
is investigated.
Work towards implement GP systems on cloud providers
is explored in~\cite{veeramachaneni:2013:learning,derby:2013:cloud}.
Other research~\cite{langdon:2010:large,harding:2011:implementing,augusto:2013:accelerated}
has focused on utilizing the GPU
to speed up evaluation.
Several advanced GP systems have also
emerged as the field has matured,
including:
AEG~\cite{korns:2011:abstract},
Ec-Star~\cite{oreilly:2013:ecstar},
Eurequa~\cite{hod:09:science}, and
FlexGP~\cite{derby:2013:flexgp}.

In addition to research on scaling GP for BigData,
many works have investigated
the application of GP-based SR to real-world problems.
Here we give an overview of GP application
on differential equations and dynamical systems,
but the body of literature is filled with applications
to many fields.
General application to dynamical systems
are investigated in~\cite{lay:1994:application,cao:2000:evolutionary,tsoulos:2006:solving,hod:08:mining,iba:2008:inference,seaton:2010:analytic}.
Specific applications to
metabolic networks can be found in~\cite{cho:2006:identification,schmidt:2011:automated}
and genetics in~\cite{sakamoto:2001:inferring,qian:2008:inference}.
In~\cite{hod:07:pnas}, it was shown that
the equations to a dynamical system
could be searched in parallel
by using a partitioned evaluation scheme.
Dynamical systems with multiple-time-scale,
with signals composed of simpler signals operating at different time-scales,
is investigated in~\cite{cornforth:2012:symbolic}.
\cite{cornforth:2013:inference} showed that
equations for unobserved variables in dynamical systems
can be recovered in some instances.
Invariants, or conserved quantities, were shown
recoverable in~\cite{hod:09:implicit_long,hod:09:science}.
Hybrid dynamical systems,
which feature both discrete and continuous components,
were shown tractable in~\cite{ly:2012:learning}.
Much of these works use simulated data from known systems.
There are, however, many references to use of GP on
real-world problems and data as well.











\textbf{Components}
\label{section-gp-enhancements-components}

\textbf{Islands}
\label{section-gp-enhancements-islands}

\textbf{Hybrids}
\label{section-gp-enhancements-hybrids}




<div id="issues"></div>
<a class="right" href="#top">top</a>

#### Fundemental Issues




\textbf{Non-determinism}
\label{section-gp-issues-non-determinism}

\textbf{Benchmarking}
\label{section-gp-issues-benchmarking}



Candidate fitness metrics,
methods for comparing implementations,
and benchmark problems
vary widely across the GP field.
Last year, \cite{McDermott:2012:benchmarks} 
surveyed three years of literature from EuroGP and GECCO GP track,
bringing this issue to the forefront of the community.
Their aim was to start a discussion
on unifying and standardizing the evaluation process
in GP.
We agree with these ideals and
use 22 of their SR target functions
for the evaluation of PGE.
Further, we believe PGE can contribute to this effort,
as a deterministic, base-line algorithm,
against which evolutionary methods can measure themselves.
% \tony{(last paragraph of Section 5) [copied into tex file]}
We do, however, disagree with the assumption in ~\cite{McDermott:2012:benchmarks},
that results should not be expected to be repeatable,
and thus unverifiable by a third party.
A non-GP practitioner will not likely
use a tool which gives different
answers each time it is used.
This has been partially addressed by 
\textit{rate of convergence}
(how often an implementation finds an answer)
and 
\textit{cumulative probability of success}
(the probability that an ideal solution would be found on or prior to generation $i$).
Both of these methods require many trials.
Nevertheless, we agree that the optimum is less obtainable
and that a consensus needs to be reached 
on unbiased methods for comparison between different implementations. 

% \tony{
% want to add a paragraph about metrics for implementations and benchmarks.
% covering the many methods, but definitely
% rate of convergence in its two forms 
% (1) how often a solution is found
% (2) how long before the algorithm reaches a local optima and stops making progress
% Then bring in paper about "GP needs better benchmarks"
% and comment on their comment about 
% finding exact solutions isn't important as accuracy
% b/c in industry solutions are not known
% (my comment is that industry won't trust an implementation
% that can't return the correct answer to known problems)
% they do comment on the lack of rigor in benchmarking GP
% and have sought to bring unity to this (which I like)
% }


% 5. APPROPRIATE STATISTICS
% Suggesting or adopting standard benchmarks in itself is
% not enough to produce meaningful results: the statistical
% procedure for comparing methods is crucial, and effective
% comparison benefits from consistency in the literature in this
% regard. How should we perform such comparisons?
%
% A large portion of early (and indeed current) GP results
% were measured using ideal solution counts: whether or how
% often the optimum, or some threshold near the optimum,
% was reached. The most common approach [32] defined the
% computational effort measure as an estimate of the minimum
% number of individuals to be processed in a generational
% algorithm in order to achieve a z = 99% probability of
% discovering a solution. More formally, this was defined as
%
% min_i m × (i + 1) ×  { ln(1−z) / ln(1−P(m,i)) }
%
% , where i was a generation
% number, m was the population size, and P (m, i) was the
% cumulative probability of success, that is, the probability that
% an ideal solution would be found on or prior to generation i,
% as gathered through samples.
%
% This measure has received significant criticism [51, 7, 43, 47,
% 4]. Critics have noted that ideal solution counts are really a
% measure of how well a method solves trivial problems, rather
% than the nontrivial ones found in real world applications.
% Attempts have since been made to address another central
% criticism: poor accuracy and statistical invalidity [8, 68].
%
% We think that benchmark comparison measures should
% instead assume that techniques will be applied, ultimately,
% to problems where the optimum is not expected to be discov-
% ered, much less repeatedly and easily. For single objective
% problems, two obvious candidates are best fitness of run (ap-
% propriate for problems where the goal is optimization) and
% generalizability measures such as final testing against a with-
% held generalization set, or K-fold validation (appropriate for
% problems where the goal is to perform model-fitting).

% \com{Interesting discussion paragraph to add.
% Very comprehensive background of GP for a conference paper.  If you need room, you could probably cut some of the details here.
% Question about flow:
% As it appears to me now, I see:
% Intro GP, lots of ways it gets done,  then a bit on other SR methods, then back to applications of GP, then metrics and benchmarks.
% Consider reorganizing: equal amounts on GP (can focus on more recent advances) and SR (maybe less on SR since you touch  on it in the intro).  Keep the two topics as separate as possible to make the discussion easier to follow.

% You do a good job highlighting the limitations of each approach, and that's a good thing to keep, especially if PGE does not have those limitations.}





