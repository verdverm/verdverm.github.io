---
layout: sr
title: Conclusions
brief: Final thoughts and places to go
prev: 06-comparison
next: A1-pypge
nextname: PyPGE
---





As we aim for an algorithm that solves the SR problem
we must consider alternative implementations to the usual GP. 
PGE is a deterministic SR implementation
with exactly reproducible results,
using no random number generation.
PGE replaces evolutionary methods with
well defined expansion rules and 
prioritizes the search with the Pareto Priority Queue.
PGE consolidates the space of equations by merging
isomorphs with sorting and simplification algorithms.
PGE further avoids duplication of effort
by considering form once,
through the use of 
abstract parameters, non-linear regression, and memoization.
This also allows PGE to separate
the search for form, from
the optimization of that form.
PGE is effective,
providing accurate results and 
returning many exact solutions in a short amount of time.
Additionally, PGE only needs to be run once 
to provide statistically significant results.

As a deterministic algorithm, 
PGE may be useful for characterizing
the difficulty of problems,
and the IPT can provide a
new metric for measuring the search coverage.
PGE may also bring new insites on 
the nature of non-convexity in SR problems. 

We believe further progress can be made
by incorporating the use of 
all-valid s-expression crossover 
and embedding PGE into the AEG framework
to make use of abstract 
variables and functions.
Speedups may be realized,
while maintaining deterministic behavior 
by parallelizing the evaluation of equations.
We hope to provide validation on more of the benchmarks
as well as differential equations, invariants, and 
other problems from domains beyond equations 
which can be represented by an abstract grammar.


% \vspace*{-0.05in}


% We also believe that drawing on ideas outside of the field,
% such as probabilistic parsing and minimum edit distance 
% from NLP will improved direction to the search and 
% enable localized searching around good candidates.

In this paper, we enhanced the PGE algorithm,
moving it towards applicability to Big Data.
We added the ability to PGE for working with
differential equations.
We added peek evaluation for reducing effort
required to determine a model's fitness.
We decoupled search from evaluation from
model manipulation, enabling PGE
to scale in the cloud.
We deployed PGE to GCE using the Kubernetes tool
and showed that PGE could
maintain operation in the face of failures
and scale to the problem at hand.

Looking forward, there remains a need to deal
with free parameter placement and the
issues that arise from input feature size.
Due to network and parsing latencies,
it also seems prudent to merge the
algebraic manipulations back into
the search core.
We will also be open sourcing our code
and building a user-interface
as we aim to make PGE accessible to
the broader scientific community.

There is also opportunity to
create a BigData problem with PGE operation
by
analyzing the algorithm across a variety of
configurations and problem types.
A global equation space structure could
be maintained across all runs
and the individual searches could use
the results from previous searches
to optimize their efficiency and efficacy.

Extracting schemas from the results of a run
or multiple runs from cross-product of
pge settings and data sets / "systems"



McConaghy also raises an important point,
can SR be a usable technology outside the field of GP?
We believe the answer is \textbf{yes}.
PGE shows great promise towards 
meeting this goal.
The most contributing factors
are its deterministic behavior
and coverage of the search space.
This gives PGE both increased 
consistency and trustworthiness.
These are two features required
in any tool or technology,
it does what it says it can do
and it does it reliably.

\section{Summary of Contributions}

We attempted to separate the \textit{problem}
of Symbolic Regression from the \textit{implementation}
of an algorithm.
Genetic Programming is a non-deterministic search heuristic
which randomly searches the space of equations.
We introduced Prioritized Grammar Enumeration
as an new framework for the SR task,
based on the techniques of dynamic programming.
PGE completely removes many of the limitations
inherent in GP through its methodologies.
By working with a grammar's definition,
search direction is ordered by the production rules.
These rules are used to iteratively build up
valid expressions towards the most promising 
areas of the search space. 
The Pareto Priority Queue refines the 
direction by emphasizing the areas
where the trade-off between 
accuracy and parsimony are most balanced.
Nonlinear regression directly fits an equation's parameters,
a vast improvement over the low probability genetic operations
for achieving the same ends.
PGE additionally eliminates the multiplicity
of effort that is embedded in the 
multiple derivations of a single equation.
The Integer Prefix Tree memoizes 
previously encountered solutions,
as well as provides a means
to measure the rate of duplicated effort.


GP and PGE take very different approaches
to the search for an expression.
GP is a search methods which
starts with random initial points 
in the space and narrows them
to a set of ideal candidates.
That is, GP attempts to \textit{converge}
to the correct solution.
PGE, on the other hand,
uses its tool set to
\textit{grow} small expressions 
towards the ideal areas
of the search space.
PGE does not converge,
rather it attempts to
encounter the best points
in the search space
as it spreads the
branches of its search tree
through the space of all equations.



\section{Summary of Results}

We used 23 benchmarks of 
various difficulties
to demonstrate the differences between
GP and PGE.
Our results show that PGE significantly out performs GP.
PGE obtains more accurate results
on all benchmarks in at least one of its variations.
It does this with guaranteed consistency.
PGE also provides greater confidence
that a solution has not been overlooked.
PGE examines a far greater number
of unique equations than GP considers.
This is a result of PGE's ability
to directly fit the parameters of a form
and remember which forms it has already encountered with the IPT.

Dimensionality was a problem for both GP and PGE.
In GP it decreases effectiveness especially when
many of the variables are irrelevant.
In PGE, dimensionality causes the productions
to grow exponentially faster. 
The PGE run times increased
drastically with dimensionality.
PGE processing also experienced
longer run times as the complexity
of expressions increased
through the use of alternate generating methods.

PGE was also easier to implement.
It has no interacting processes,
random number generation,
or other sources of non-determinism.
Not only does this make debugging easier,
but it also makes a deeper inspection
of the search progress possible.


\section{Suggested Research Directions}

We continue to aim our research towards 
building a SR technology.
We hope that the fruits of our labor
will one day be a tool in the scientists arsenal.
This is no easy feat, however, we think
there are several enhancements
which will help to get SR there.
The first is to unify GP and PGE
into one process, leveraging
the benefits of each in an
information sharing framework.
A second advancement is to
incorporate ideas from Natural Language Processing (NLP)
techniques.
\cite{klein:2005:parsing}
offers a method of probabilistic parsing in NLP.
These ideas will apply if weights or probabilities
can assigned to the production rules and 
combined with the fitness of equations.
Finally, an interface to the search process
will permit Human-Computer Interaction.
This would allow feedback between man and machine,
the collaboration of experts and computers,
in uncovering the dynamics of a system.


random...
\cite{knuth:1977:generalization,nederhof:2003:weighted,babovic:00:hydro}



% \textbf{Hybrid GP-PE}

% building a Hybrid system\\
% bringing the best of each to the other and having them work together\\

% Rapid hybridized GP with non-linear fitting
% PGE and GP work together
% PGE is local search
% GP is broad based randomized search


% \textbf{Equation Designer}
% User can:
% - start search (both GPSR \& PESR)\\
%   then evaluate and manipulate results\\
% - provide functional form\\
%   which can have coefficients fit\\
%   or\\
%   incorporated into GSPR/PESR search

% Brain farm the non-expert in a game


% We believe PGE can also benefit from Natural Language Processing (NLP)
% techniques may become useful when SR is framed as we have.
% \cite{klein:2005:parsing}
% offers a method of probabilistic parsing in NLP.
% These ideas can be applied if weights or probabilities
% are assigned to the production rules and 
% combined with the fitness of equations.
% This would give us an estimate of how 'far'
% it is to the next node,
% as opposed to knowing how far 
% we have traveled once we have arrived.



% \noindent
% \textbf{Hyper-graphs}

% \noindent
% During the course of writing this work,
% we had one of those 'ah-ha' moments.
% We believe that Knuth's generalization
% of Dijkstra's algorithm \cite{}
% for parsing and hyper-graphs
% may be applicable to Symbolic Regression.


% % Methods of SR
% -Non-deterministic
% -Genetic Programming
% -Fast Function Extraction
% -Types of Problems
% --Explicit
% --Diffeq
% --Partial Diffeq
% --Invariant

% Contributions
% -System Parameters
% -Genetic Programming Enhancements
% --System Parameters
% --Non-linear regression of coefficients
% --Memoized equations
% % -Prioritized Enumeration of a grammar


% System Parameters\\

% ensamble\\
% system parameters\\

% NLP \& hypergraph stuff

% klien probablistic parsing \cite{}

% knuth generalization of djikstra MST  \cite{}
% recent rebuttle to klien that cites last \cite{}

% simplifying / sorting / optimizing (like parser optimizations?)

% text parser to implement (need to provide eval funcs somehow, structs? simulation,metrics?)
%   -grammar
%   -rewite rules


% \textbf{GPSR}

% incorporate PESR stuff


% pareto front structure idea
%  - tree for log time insert (like a heap)
%  - each member of a front has pointers
%    to the next place to insert
%  - on insertion,removal, pointers need to be updated recursively
%  - density estimation via barnes-hut

% \textbf{PESR}


% richer basis function set

% \tony{rethink methodology, complexity, work from IpreTree?}

% what productions have given improvements?

% localize to tree nodes

% a second grammar gen tree with ipretree for memoization

% IPT: 
% What extra information is stored
% at each node
% what can we use each for

% -statistics (ins,lookups)
% -ancestry   (parent(s))
%   -- multi geneology due to now graph rep of search space.


% \textbf{multi-tiered Generators}
% progress up tiers if sol'n not found

% what shall the tiers be? give examples

% brief on what each tier can
% - represent, abstract to building blocks
% - solve, abstract to complexity / features of an equation


% \textbf{Policy Based Generators}
% Tie together the last few subsubsections

% Policy based expansion of equations by generating functions


% what are the policies we have implemented?

% show examples of each operation
% context related restrictions

% - traverse tree, creating context/expr-stats (like serialization) 


% TREAT VARIABLES LIKE COEFFICIENTS... AS PLACEHOLDERS!!!







% *************
% four modes of writing:

% writing from scratch in tex file
% editing in tex file
% reading pdf and making notes in tex file
% reading pdf and making notes on tablet

