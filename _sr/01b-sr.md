---
layout: sr
title: Symbolic Regression
brief: Overview, context, details, implementations
sections:
  - name: The Problem
    tag: problem
    brief: Definition, classes, appilacitons
  - name: The Components
    tag: components
    brief: Representation, evaluation, optimization, memoization
  - name: The Algorithm
    tag: algorithm
    brief: Search space, relationships, learning loop
  - name: Implementations
    tag: implementations
    brief: PGE, FFX, basic GP, modern GP
  - name: Further Considerations
    tag: considerations
    brief: Terminonolgy, implementation evaluation, reproducibility
---



##### A definition

Symbolic Regression (SR) is the problem of 
deriving expressions directly from measured data. 
It is a machine learning problem where the
output is a mathematical equation.
The process which an SR implementation employs, 
mirrors our human notions for 
mathematical discovery in science and engineering.

##### Where it fits in

SR is a generalization of
traditional methods for regression.
Linear and non-linear regression
assume a model and fit 
the model's parameters
to the data on hand.
More sophisticated methods like 
the Fourier transform and neural networks
can model almost any signal or function.
However, they don't elucidate an understanding of the
interactions and behavior of that signal or function.
SR addresses these issues by
making no a priori assumptions about the model.
A SR implementation generates, tests, and validates equations.
It searches the space defined by a model space's grammar
returning expressions, a concrete model instance or an equation.
Thus, we gain the simplicity and interpretable of equations
while maintaining the sophistication from more complex
learning methods.


##### Applications & problem types

Because SR models data with equations,
it finds a vast array of application domains.
Simple relationships are modeled with
explicit functions $y=f(X)$.
Time variant relationships are modeled with
differential equations: $\frac{dx_i}{dt} = f(X,dX)$.
Several differential equations can be combined into
a set, forming a dynamical system.
Relationships with vary in both time and space
are modeled with partial differential equations (PDEs).
Invariants, or conserved quantities can also be modeled
with an equation and its partial derivatives.
These are all incantations of ideas from calculus
and are prominent throughout the sciences and engineering.
From 
cell biology to ecology, 
physics to astronomy,
chemistry to pharmaceuticals,
economics and finance;
all fields rely on
mathematical notions and theory
to produce solid foundations
upon which decisions can be made.

##### The Importance

The importance in automatically discovering analytical models
for our increasing volumes and complexity of data is paramount.
The equation models described above are human interpretable,
precisely because they are a human conception
for talking about functional relationships
found in our observations of the world.
It is the relation between
humans, math, and science;
that SR holds a special place
in machine learning and 
making sense of the data driven world.
As in all aspects of life,
the rate and complexity at which we collect data
has exponential growth.
It is our ability to extract knowledge,
as humans, which has not kept pace.
SR holds the potential to
alleviate this situation
and accelerate the pace of 
scientific and engineering breakthroughs.


##### The Components

Like all machine learning tasks,
SR can be logically broken into three components for
representation, evaluation, and optimization.
We include a forth component, memoization,
due to its important to the SR problem.
% methods
Similarly, as in any machine learning task,
there are several algorithms which
try to solve the SR problem.
Originally, SR was born from Genetic Programming (GP),
an evolutionary algorithm for attempting this problem.
The use of GP as a method for SR
has been the de-facto until only recently.
It is for this reason that SR as a problem
is just starting to find itself researched
outside of evolutionary algorithms.
With the advent of Fast Function eXtraction (FFX)
and Prioritized Grammar Enumeration (PGE),
there are now competing methods to GP
which are also deterministic.

###### Reproducibility

This deterministic nature of FFX and PGE
is an important feature for a SR algorithm.
It is because of the link between
human, math, and science.
In science we expect reproducible results.
We believe this is why GP has not
become a predominant technology as predicted by its proponents,
and likewise, SR for being so tightly coupled to GP
for much of its history.
Here, we take a strong stance that reproducibility
is one of the key features to a SR implementation.
Reproducibility provides the necessary reliability
for scientific discovery and adoption of a new tool, 
as well as the foundation upon which research into SR
can stand.











<div id="problem"></div>
<a class="right" href="#top">top</a>

#### The Problem



origins, so we can forward reference relation to GP and its limitations

- definition
- importance
- reproducibility

Problem Types

- explicit
- diffeq
- systems
- pde
- invar

How relates to equation relationships


\subsection{A Definition}




















\subsection{Equation Types}

\begin{table}[h]
\centering
\caption[Problem Type - Equation Form]{Problem Type - Equation Form}
\label{tab:probtype-eqnform}
\begin{tabular}{|l|r c l|}
\hline
Problem Type & \multicolumn{3}{c|}{Equation Form} \\
\hline
Explicit Equations      &  $ y $ & = & $f(\vec{x}) $ \\
Differential Equations  &  $ \frac{dx_i}{dt} $ & = & $ f(\vec{x})$,$ f(\vec{x},\vec{dx}) $ \\
Partial DiffEqs         &  $ \frac{dx_i}{dt} $ , $ \frac{dx_i}{dx_j} $ & = & $ f(\vec{x},\vec{dx}) $ \\
Invariants              &  $ F(\vec{x}) $ & = & $ \frac{df_i}{dt}(\vec{x},\vec{dx}) = C $ \\
\hline
\end{tabular}
\end{table}


\noindent
\textbf{Explicit Equations}

\noindent
Explicit functions are the most basic equation type.
These are a direct mapping, or rule,
from the independent input variables to the dependent output variable.
Data is plugged in and the output is the result of depth-first evaluation. 
The most familiar of these is the line: $ y = ax + b $.
The line has one input variable and 
one output variable.
Another familiar examples is the polynomial: $ y = ax^2 + bx + c $.
Both of these equations are easily extended
to multiple dimensions and become 
hyper-planes and hyper-surfaces respectively.


\noindent
\textbf{Dynamical Systems}

\noindent
Dynamical systems are a set of differential equations,
either heterogeneous or homogeneous.
Each differential equations, in turn,
is a rule for the rate of change,
in one variable over time, to the current state of all variables.
That is to say that the future depends upon the past.

To evaluate differential equations,
techniques of numerical integration are required.
There are many methods of numerical integration \cite{kress:98:num_analysis}.
Runge-Kutta 4 (RK4) is one such technique.
It makes four smaller steps in time, 
updating the input variables along the way.
Since RK4 involves four evaluations of a function,
it requires four times the computational effort.
RK4 also requires all of the differential equations, 
for a dynamical system, in order to simulate the system.
RK4 integrates from current state to produce the
next state of the system. It thus requires
a temporal ordering of the data.
We use the RK4 algorithm in this work
to produce the data sets for the dynamical systems.

When performing an SR search, it is possible
to decompose the differential equations for separate evaluation.
We can approximate the integrated values
of the other variables
by substituting interpolated data.
This partitions the SR search 
making the equation recovery simpler task \cite{hod:07:pnas}.
We call this Partitioned RK4 (PRK4).
PRK4 requires the current and next
states of the system, and four evaluations,
in order to measure the fitness of an equation.
It also maintains the temporal restriction
of data in the evaluation process.

An alternative evaluation method
for differential equations
exists, if the numerical derivatives 
of the data can be calculated.
The equations fitness is then
measured by its ability to predict 
the numerical derivative.
There are two reasons for doing this.
The first is that small variations in the equation
result in a larger magnitude 
of difference from the fitness function.
The integrals of $x^2$ and $x^2+1$ 
diverge linearly, which means the
integrated values of RK4 are very similar.
The fitness landscape of the
numerical derivative method is less smooth.
The second reason for evaluating
against the numerical derivative data
is that we can perform a single point evaluation.
We perform four times fewer evaluations
and we can perform them at arbitrary points.
\cite{hod:08:mining}

% \tony{One day... I would like to perform some experiments on this last bit}

% A natural extension to differential equations
% is partial differential equations.
% PDEs allow more than time to be independent measurements,
% such as x, y, and z in three dimensional space.
% We not yet made an attempt at this type of equation.


\noindent
\textbf{Invariants}

\noindent
Invariant equations represent the solution to 
a set of homogeneous differential equations and
are the integral solution to that dynamical system.
Well known examples from physics are 
the conservation of energy, mass, and angular momentum.
This begs the question:
 ``are there conserved quantities in biological or ecological systems.'' 
Previous work \cite{hod:09:science,hod:09:implicit_long}
has shown that it is actually possible to
uncover the Hamiltonians for conservation of angular momentum,
directly from measured data. 
We do not, however, explore the search for invariants in this work.





\subsection{Applications}























 
<div id="components"></div>
<a class="right" href="#top">top</a>

#### The Components





All machine learning techniques 
require three components: 
Representation, Evaluation, and Optimization.
Representations are the conceptual and actual
models we choose for the problem space.
Evaluation is how one model is determined
to be better than another. It is also
how a model's fitness is defined.
Optimization is the technique
which searches the representational space
and maximizes model fitness.
Often, these three components have a
high degree of coupling, 
and thus there are natural pairings.
Additionally, we include Memoization
due to its paramount role in the SR problem.
This role is significant because the SR representational space 
contains an extremely high degree of overlapping subproblems.


\subsection{Representation}
\label{section-sr-components-representation}

Many equation representations have been explored
in SR research.

Binary: natural to computers

Other: graph, ccgp, linear, mapping

N-ary: natural to algebra


Combination of n-ary and linear mapping (prefix notation),
which are equivalent,
give PGE part of its power and sophistication


In order model with Symbolic Regression,
equations need to be represented \textit{in cilico}.
The method of representation 
determines the methods
we can use to work with the equations.
Tree structures are the most common
implementation for equation representation,
because, as we will see, they fit most
naturally with the theoretical concepts.

\noindent
\textbf{Equation Representation}

\noindent
A grammar defines a language in a recursive manner \cite{Aho:1972:TPT}. 
A grammar is comprised of a start symbol,
nonterminals, terminals, and production rules.
The language generated by a grammar G, denoted L(G),
is the set of sentences generated by G.
A sentence $s$ is in L(G) if there is 
a sequence productions which results $s$.
This sequence of productions constructs
the derivation or parse tree for $s$.
If a sentence $s$ has a derivation
then it is in the language G.
Thus, grammar allows us to determine if 
a sentence is in a language and
conversely provides a means to
recursively enumerate sentences in a language.
Listing \ref{grammar} is an example 
of a grammar for mathematics.
It is also the grammar we use 
throughout this work.

\begin{figure}[h!]
\lstset{caption={Grammar for Mathematical Equations},label=grammar}
\begin{lstlisting}
START -> E
E -> E + T | T          // subtraction handled by negatives & constants
T -> T * N | T / N | N
N -> Sqrt(E) | Cos(E) | Sin(E) | Tan(E) | Log(E) | Exp(E) | L
L -> (E) | -(E) | (E)^(E) | TERM 
TERM -> Constant | Variable
\end{lstlisting}
\end{figure}



In Symbolic Regression,
equations are constructed as binary trees  
made of basic components called building blocks.
The tree of building blocks 
makes up the `DNA' of an equation.
It matches the parse or derivation tree 
for a given equation, and can also
be called its Abstract Syntax Tree (AST). 
Building blocks come in two types,
operators and operands.
Operators are the internal nodes of the AST and
include familiar mathematical functions (+,-,*,/,sin,exp,etc.).
Operands are the terminals or leafs of the AST
and represent state-variables, constants, and real-valued numbers.
There are two ways to represent constant,
indexed and floating point.
The real value floating point representation
has been the most common in GP literature.
The value is randomly assigned, mutated
by multiplying  it by a small number 
or swapping it out with another during crossover. 
Indexing associates a constant in the tree
with an element into an array. This permits
the coefficients to be optimized outside
of the equation form. This can be done
by a second evolutionary algorithm
or by standard regression techniques.
We use real-valued coefficients in GP
and indexed coefficients in PGE.

In Genetic Programming, 
binary trees have been the prevailing method
for representing equations,
but they have not been the only method.
\cite{Hod:2007:graphrep} considered 
graph representations for equations,
sometimes referred to as Cartesian GP \cite{miller:2000:cartesian}.
In Fast Function eXtraction \cite{McConaghy:2011:FFX}, 
described in section \ref{subsec-ffx},
equations are represented as a
linear combination of simple basis functions.
\begin{figure}[h!]
\centering
\caption[Equation Representation]{Equation Tree Representations. Row 1: Binary,  Row 2: Nary}
\label{fig:eqn-trees}
\vskip 15pt
%\\[15px]
\begin{tabular}{|l|c|c|c|}
\hline
 & Col 1 & Col 2 & Col 3 \\
\hline
Equation & $ax + bx^2$ & $ax + bx^2 + cx^3$ & $ax + bx^2 + cx^3 + dx^4 y^3$  \\
\hline
\end{tabular}

\includegraphics[scale=0.25, clip=true, trim=40 210 20 -20]{imgs/eqn-trees.pdf}
\end{figure}

In this work, we use n-ary trees, 
where each operand can have a variable number of children.
In our implementation, 
the n-ary representation 
only affects two operators,
the associative ADD and MUL.
In fact, in any tree based representation,
some operators (internal nodes)
such as COS and LOG always have
only one outgoing edge to their operand.
Figure \ref{fig:eqn-trees} shows
the comparable representations
of several equations as both
binary and n-ary trees.
Note that the binary trees are balanced,
which may not be the case with randomized generation.
Figure \ref{fig:eqn-cross-mutate}
contains an example of the SIN operand.

The n-ary tree representation
has no effect on the 
constituents or modeling ability of the equation.
It does however, alter the equation tree's size and structure.
Changing size of equations 
effects the trade-off between parsimony and accuracy.
This multi-objective trade-off, 
often called Pareto sorting, 
is the multi-objective optimization search of SR.
Any change to the fitness function undoubtedly effects 
the operation of any SR implementation.

Additionally, the n-ary representation
eases the design of simplification algorithms.
These algorithms, detailed next,
work within the parse tree
to reshape it to a canonical form.
The simplification algorithms are analogous to 
rewrite rules from the parser literature\cite{Aho:1972:TPT},
and are reminiscent of high school algebra.

% It alters
%   - size / height of tree (one of the metrics used in parato \ref{})
% Jury is out on
%  - effect on GP (need to limit simplification \textbf{doable?})
% It makes easier / enables
%   - the design of sorting / simplification algorithms 



To find the best expression forms,
SR searches the infinite space of 
expressions defined by a grammar.
A grammar defines the
terminals, non-terminals, and rules
for representing and constructing expressions. 
To traverse the space of expressions,
a SR implementations require methods
for representing, generating, testing, and comparing expressions.
We limit our examples to mathematical equations,
however, the concepts can be mapped to any 
system that a grammar can be devised for.

The most natural and common equation
representations in SR implementations
are binary trees.
Binary trees mirror the parse trees for a grammar,
in our case, equations.
The terminals of the tree are the variables and 
the non-terminals are functions.
Variables are the inputs and outputs,
functions are the arithmetic operators and mathematical functions.
Evaluating a tree representation,
along with many other tree operations and manipulations,
amount to depth-first traversals of the tree.
Equation evaluation also 
involves determining relative quality
compared to other equations.
In SR, measuring quality incorporates
to balance in trade-off between
accuracy and complexity.
The Pareto non-dominating sort
enables a partial ordering of equations 
into successive frontiers.
The Pareto fronts,
along with the equation generation methods,
provides direction to the search. 
The equation generation methods, however, are where the
implementations diverge in methodology,
and is arguably the most important part.









\subsection{Evaluation}
\label{section-sr-components-evaluation}

Symbolic Regression explicates relationships 
between variables using mathematical equations.
As an abstract problem, 
SR is capable of modeling many kinds of data sets.
The type of data, and 
its presentation to a SR implementation, 
determine the resultant equations producible.
The fitness function for equation evaluation
is partially the presentation. 
The available fitness functions
depend upon the independent measurements of the data.
If time is one of these, then we can consider differential equations.
To fully evaluate candidate equation
a fitness score is also calculated.
Any number of error equations can be used,
and are also dependent upon the data,
its scale, and its features.

With the variety in data and
methods of evaluation,
its no surprise SR can tackle many problems.
Results from explicit mappings,
to systems of differential equations
and even conserved quantities
have been reported in the literature
\cite{hod:09:implicit_long,hod:09:science}.
GP has also been applied to circuit design,
gene regulatory networks, and to
evolve path following algorithms.

Despite the apparent successes in GP, 
there has been a lack of sound science
in the field of SR \cite{McDermott:2012:benchmarks}
(\textit{this margin is too narrow to contain} the full list of citations).
Fair comparison requires
careful consideration of
how an implementation is measured.
SR implementations are complex
and contain subtle differences which 
can bias results if used in isolation.
The best practice is to use
multiple metrics that
demonstrate and reinforce conclusions.
Ultimately, the best measure of any SR implementation 
will be its inclusion into the research process of a domain expert.


Candidate fitness metrics,
methods for comparing implementations,
and benchmark problems
vary widely across the GP field.
\cite{McDermott:2012:benchmarks} 
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


Equation evaluation involves
calculating individual fitness and 
relative comparison to other functions.
However, the type of data and its
presentation determine how we
measure error and the kind of resultant
equations we should expect.

Once we can evaluate and compare equations,
we can consider what types of problems 
an implementation can attempt.
These can be
uniformly sampled inputs as well as
time-series, data sampled over time,
and even space.

We will also want several ways
to compare implementations 
within a framework and across,
such as comparing GP and PGE. 
Each metric measures several
aspects of an implementation,
and a true evaluation can
only come by using multiple metrics
in conjunction.

\noindent
\textbf{Data Presentation}

\noindent
Data sets come in many varieties.
How we measure data effects
the methods we can employ
to uncover equations from that data.
One method is to uniformly sample
the input variables. This is easy
when the variables have 
a well defined range and can easily be simulated or observed.
This is the case for equations like $y=f(\vec{x})$.
In the real world, we have limited
access to the multitude of
states a system can exhibit.
Often the only independent variable
we can measure is time.
The dependent variables are measured
over time and produce a 
data set called a time-series.
Time-series can be presented
in ways that will 
allow SR to uncover equations
that relate the current state of the system
to the rate of change in a variable.

Running multiple experiments 
provides an increased view
of the variation within a system,
and is the norm in science.
Usually multiple initial conditions
for an experiment can be used
to give coverage to the dynamics
of a system, even capturing bifurcations.
The data can be further enriched by
include time independent variable measurements.
Examples of these are the length and mass
of a pendulum or the water temperature of a titration.
We refer to these as system parameters, 
parameters which can change value between experiment
but don't vary over the course of a single experiment.
Using multiple experimental settings with multiple initial conditions
provides a greater sampling coverage of the system dynamics.
Performing multiple experiments is good science,
but can drastically increase the
complexity and amount of data on hand.

Methods to reduce the amount
of data presented include sub-sampling
and feature selection.
Sub-sampling creates small subsets
of the original data for presentation.
These subsets give a prediction
of an equations fitness on the entire data set.
They can be modified over the course
of the search process to accentuate 
different aspects of the data set.
In \cite{hod:08:coevo_fp}, subset optimization
is merged with the equation search 
to create a co-evolutionary algorithm.
This will be discussed further in section \ref{sec-gp-adv}.
\cite{tommaso:1997:discussion} 
discusses another method of sub-sampling,
decomposing an overall problem
into subsets that emphasize different sub-tasks or partial solutions.
A learning algorithm can use the partial solutions
to the simpler tasks to construct
an overall solution to the bigger problem.



\noindent
\textbf{Fitness Function}

\noindent
To test hypotheses, SR requires 
a fitness score to be assigned to each candidate.
The accuracy of an individual can be measured in terms
of the difference between the output produced and the output expected.
Size is usually measured as the number of nodes,
both terminal and non-terminal,
that are contained in the tree.
Each tree is assigned a scalar value
by using a well defined procedure.
SR seeks to maximize an equations fitness
by improving accuracy while minimizing complexity.

Each equation is typically tested 
with a number of fitness cases
representing different environments or situations \cite{deb:1999:mogas}.
Its accuracy is computed by 
calculating the summed error 
for an equation on the test data, usually via
average absolute error, mean squared error, mean log error.
Less direct fitness calculations include:
total hits, which tallies the number of data points that
an equation is 'close' to, determined by a threshold.
Ranking calculates a score
based on relative order by considering 
the Pareto dominates, is dominated ratio.
The most common fitness metrics are 
mean squared error and average absolute error.

PGE uses a two step process for evaluating equations.
First, PGE uses nonlinear regression to fit
the abstract parameters, of an equation form, to a training set.
Second, the optimized form is evaluated
on testing data using one of the aforementioned fitness measures.
To perform nonlinear regression,
we make use of the Levmar C library \cite{lourakis04LM}.
Levmar provides an ANSI C implementations of the 
Levenberg-Marquardt optimization algorithm, 
both unconstrained and constrained versions
(under linear equations, inequality and box constraints). 
The Levenberg-Marquardt (LM) algorithm is an iterative technique that finds a local minimum of a function that is expressed as the sum of squares of nonlinear functions. It has become a standard technique for nonlinear least-squares problems and can be thought of as a combination of steepest descent and the Gauss-Newton method. When the current solution is far from the correct one, the algorithm behaves like a steepest descent method: slow, but guaranteed to converge. When the current solution is close to the correct solution, it becomes a Gauss-Newton method \cite{lourakis04LM}.






\noindent
\textbf{Pareto Front}

\noindent
In multi-objective optimizations,
no one fitness measure trumps the others.
There is an irregular
trade-off between the various measures.
Many times, this trade-off is between 
real-valued error metrics when 
attempting to optimize several constraints.
In Symbolic Regression,
there are two fitness measures 
a real-valued error and a discrete size.
We prefer SR to find the simpler equations
which model the data accurately. 

The Pareto non-dominated sort,
usually just called the Pareto front,
addresses this trade-off between opposing objectives 
\cite{luke:2002:lexicographic,smits:2005:pareto,van:1998:evolutionary,fonseca:1993:genetic,horn:1994:niched}.
The Pareto front is a non-dominated sorting.
That is, no other solution is better than the solutions of the
Pareto front in both complexity and performance.
In mathematical terms, vector $\vec{u} \prec \vec{v}$ if
$\forall i, f_i(u_i) \leq f_i(v_i)$.
% \tony{ correct math definition?}
In the case of SR, we have first consider the
discrete objective, parsimony,
and then the continuous objective, accuracy.
A smaller function will always dominate
any function which is larger and less accurate.
A large function $g$ dominates $f$ when
its error is smaller.
That is to say that we accept larger
functions when they are more accurate.

The Pareto front is layered into 
non-dominating sets of equations, called frontiers.
Each frontier represents a set of equations
which maintain the non-dominance relationship.
We can remove the first frontier
to obtain the second frontier.
Appending the succesive fronts end-to-end
is often done 
to create a linear ordering 
of the equations being sorted.
\begin{figure}[h!]
\centering
\includegraphics[scale=0.50, clip=true, trim=0 0 0 0]{imgs/pareto_front.png}
\caption[Pareto Fronts]{A series of successive Pareto Fronts}
\label{fig:pareto-front}
\end{figure}





\subsection{Optimization}
\label{section-sr-components-optimization}


\begin{figure}[h!]
\centering
\includegraphics[scale=0.20, clip=true, trim=35 20 20 140]{imgs/srbasic/sr-basic.pdf}
\caption[Three Methods for Symbolic Regression]{The basic process for Symbolic Regression and implementations}
\label{fig:gp-basic}
\end{figure}


Symbolic Regression, though often called so, 
is not an algorithm itself, but rather a problem 
which is solved by an implementation.
This section introduces implementations for SR.
All three follow the same general logic:
determine each candidates fitness,
choose the best candidates, and
make new candidates from the current best candidates.

The most common method for implementing SR is GP,
a non-deterministic search heuristic.
GP has enjoyed 28 years as a field of research,
with many incremental improvements and enhancements.
FFX as a recently proposed, deterministic
algorithm for SR.
FFX moves SR towards being considered a technology.
This work introduces PGE,
a SR implementation based on dynamic programming.
PGE is deterministic, effective, efficient,
and we hope another step in
the direction of SR becoming more than research.

% In preview of comparison, we make use of
% an analogy from the single-source, shortest-path problem.
% In this problem, the objective is to 
% find the shortest path in a graph,
% from a starting node to all others.
% There are two algorithms for accomplishing this,
% Bellman-Ford \cite{bellman:1956:routing}
% and Dijkstra \cite{dijkstra:1959:note}
% Bellman-Ford is an $O(VE)$ algorithm that is 
% easily parallelized.
% Dijkstra is an $O(E+VlgV)$,
% however it is a sequential algorithm.
% The astute reader will connect the
% single-source shortest-path algorithms
% to their SR counterparts, described next.



\subsection{Memoization}

Make the case

Explain GP hasn't

Explain why important














































 
<div id="algorithm"></div>
<a class="right" href="#top">top</a>

#### The Algorithm




\subsection{The Search Space}

The equation search space is defined
by a grammar through its terminals,
non-terminals, and production rules.
It is an exponential space that
can be represented as a tree or a graph.
As a tree, the space is the ordered expansion of applied productions,
with the start symbol at the root.
The graph is similar, but connects
nodes in the tree that are equivalent.
In the graph, there are multiple paths
to an equation, coinciding with the multiple
derivations for an equations parse tree.

Defining the building blocks 
from which equations can be built,
also defines the space
of representable expressions
that be searched.
The size of this space is infinite
even when disregarding the 
massive increase brought on by real valued coefficients.
This is because a grammar is infinite
through its production rules.
Even further, the same expression
can have a multitude of parse trees.
Consider the equation $a+b+c$ (Figure \ref{fig:eqn-combis} left and middle columns). 
This equation has 12 different binary tree representations,
six leaf permutations and 2 shape permutations.
If we add multiplication to the mix,
this number increases to 48.
As the number of operations,
operands, and tree size are increased,
the size of the search space
experiences a combinatorial explosion.
Some example equation spaces to consider are: 
\begin{itemize}
\item The space of all polynomials in one variable
\item The space of all polynomials in more than one variable
\item The last item with trig, log, \ldots 
\item Increasing the depth of expressions (i.e. allowing recursive `()') 
\item Allowing division (put any of the previous spaces on top, bottom, or both) 
\newline
\end{itemize}

\begin{figure}[h!]
\centering
% \includegraphics[scale=0.36, clip=true, trim=0 0 0 0]{imgs/eqncombis/eqn-combis.png}
\caption[Equation Tree Permutations]{Equation Tree Permutations}
\label{fig:eqn-combis}
\end{figure}
% Considering $a+b+c$ further (Figure \ref{fig:abc}),
% there are multiple paths to the
% parse tree for this expression.
% The equation search space is then
% actually a search graph, not a search tree.
% Equivalent forms would have cross connections
% through the rewrite rules.
The space of equations can be consolidated
by imposing restrictions,
weak ordering sub-expressions,
and simplifying equations with rewrite rules.
These methods drastically
reduce the size of the space to be searched.

Simple restrictions disallow invalid mathematics,
operations such as dividing by zero 
or taking the logarithm of a negative number.
This is sometimes called interval arithmatic
in the literature \cite{keijzer:03:improving}.
In general, we wish to only consider valid equations.
Partial weak ordering of the building blocks,
is achieved by placing a relative order 
on each building block type.
Weak ordered type information provides 
the necessary machinery for sorting associative operators.
Sorting is further eased by the n-ary representation.
Since addition and multiplication are the only associative operations we consider,
they are the only building blocks effected by ordering and sorting.
Figure \ref{fig:eqn-combis} right column shows 
the canonical form of $a+b+c$ with a n-ary tree and weak ordering. 
If $a<b<c$, 
then there is only one representation of this expression.
Weak ordering, coupled with the n-ary tree
enables a twelve-fold reduction of the search space.

Simplification groups like terms together, 
remove sub-expressions which evaluate 
to a constant value ($\sin\pi$, $\frac{x}{x}$, or $x-x$),
and reduce unnecessarily complex expressions such as $\frac{1}{\frac{1}{x}}$.
These algorithms, known as tree rewriting systems 
\cite{Joshi:1975:TAG,dershowitz:1982:orderings,huet:1980:equations},
convert one parse tree to an equivalent and simpler tree.
Simplifications cut out areas of the search space
and remove some paths to expressions such as $\frac{x}{1+x}$.

There is debate as to how
simplification effects the SR process \cite{kinzett:2008:using,kinzett:2009:online,mcree:2010:symbolic}.
Simplifications effect the structure of the AST
through its manipulation, which in turn
effects the areas of the overall search space
reachable from a partial solutions AST.
It may be that in order to get to the best
or correct solution requires an intermediate
and illegal solution to be used.
This could also be the case if illegal operation
is replaced by a mediocre partial solution.
This can be visualized as crossing a deep ravine
in order to climb the higher mountain on the other side.
Questions remain as to 
how much and which simplifications
should be used. Further, which form of the equation 
should we keep? The original? The simplified? Both?
With a hyper-graph, we may be able to connect
all forms of an equation together,
something we will consider in the future.

The simplifications used commonly in the SR literature
are to group terms like $ax+bx$,
cancel terms like $\frac{x}{x}$, 
and to use interval arithmetic to
remove illegal operations.
In addition, depth and size bounds are often placed on the equation''s derivation tree.
Placing bounds on the tree explicitly places bounds on the search space.
Generally, a small bound on the size or depth is started with and increased
if the models returned are unsatisfactory.


\subsection{Equation Relationships}

\subsection{The Search Loop}
\label{section-dt-qualities}























 
<div id="implementations"></div>
<a class="right" href="#top">top</a>

#### Implementations



SR implementations are the
assemblages of methods 
for representing, generating, and testing hypotheses.
The most common implementation of SR 
has been the evolutionarily inspired method
called Genetic Programming (GP) \cite{koza:1992:gen_prog}.
GP is part of the larger family
of Genetic Algorithms (GA) \cite{holland:1962:outline,goldberg:1988:genetic},
a class of algorithms 
inspired by `survival of the fittest'.
GP differs from GAs by solution representation.
In GAs, solution representation is 
a fixed size structure.
In GP, solutions vary in size,
represented as a parse tree within a grammar.


\subsection{Genetic Programming}

The terms Genetic Programming and Symbolic Regression 
were originally coined by \cite{koza:1992:gen_prog}.
As previously mentioned, SR developed 
as a sub-problem of Genetic Programming.
In the Genetic Programming (GP) literature,
GP is a term for both a the problem \textit{and} the implementation,
and SR is nomenclature for restriction to equations.
If we instead consider SR
as the task of deriving expressions
in the language defined by a grammar,
then GP becomes an evolutionary implementation 
for the SR problem. 
In this light, program design is viewed
as the sub-problem to SR, as is equation regression,
and GP is an evolutionary framework for realizing that task.

GP is a highly stochastic,
non-deterministic heuristic
for searching a space of expressions.
GP uses natural selection
to evolve models representable by 
a parse tree within a grammar. 
GP requires six components to be defined:
representation, evaluation, selection, genetic operators, 
initialization and termination, and population management.

GP uses the aforementioned components to refine
equations in an iterative, or generational, process.
GP starts by creating a 
random population of initial equations.
During each generation, 
individuals in this population are 
evaluated for fitness,
selected for survival and replication,
and then recombined using
sexual reproduction and mutation.
GP continues in this fashion until
a model of desired accuracy is discovered,
or a computational threshold is reached.
This process uses information learned
through evolutionary progress
to guide the future search direction. 

The GP process and its components have many
parameters which effect their behavior.
Setting and tuning these parameters is difficult
and has a significant impact on the
efficacy of a GP run.
Dynamic, feedback, and meta-heuristics 
have been proposed for auto-tuning the parameters
to the GP algorithm.

GP, as a non-deteriministic algorithm
comes with a host of issues.
These issues stem from problems created
by the representation, the effect of the
genetic operators, and the difficulties
in maintaining a diverse population of equations.
These limitations, however, offer opportunity
for advancement, and GP has seen dozens of papers
each year. Chapter 3 will give
a more detailed account of these limitations
and the advancements in the fields of GP and SR.

\begin{figure}[h!]
\lstset{caption={GPSR Search},label=gpsr_process}
\begin{lstlisting}
func GP_Search() {
  eqns := createInitialEquationPopulation()

  while !done {
    eqns.Evaluate(TestData)
    eqns.ParetoSort()
    parents := eqns.Select()
    eqns = parents.Breed()
  }

  best := eqns.Select()
  return best
}
\end{lstlisting}
\end{figure}
\subsection{Variations on Genetic Programming}
\noindent
\textbf{SAW}

\noindent
Stepwise Adaptive Weights (SAW) 
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

\noindent
\textbf{TAG3P}

\noindent
Tree-Adjunct Grammar Guided Genetic Programming (TAG3P)
uses a grammar to enforce syntactical constraints on a solution
\cite{hoai:2001:framework,hoai:2002:solving,hoai:2003:tree}.
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
tree rewriting systems \cite{Joshi:1975:TAG}.
By produces only syntactically valid solutions,
TAG3P biases the search towards those solutions\cite{hoai:2001:framework,hoai:2002:solving}.
\newline






\begin{figure}[h!]
\lstset{caption={FFX Search},label=ffx_process}
\begin{lstlisting}
func FFX_Search() {
  bases := createBasisFunctions()
  
  for b := 0 -> B {
    %* $\lambda$ *) := 1.0
    while numBases(e) != b {
      e := eqns.FitCoefficents(TrainData,%* $\lambda$ *))
      adjustLambda(e,%* $\lambda$ *))
    }
    best.Push(e)
  }
  
  best.ParetoSort()
  return best
}
\end{lstlisting}
\end{figure}
\subsection{Fast Function eXtraction}
\label{subsec-ffx}
Fast Function eXtraction (FFX)
is a deterministic SR implementation \cite{McConaghy:2011:FFX}.
FFX does not use genetic operators or
a tree based representation.
Instead, FFX uses a Generalized Linear Model (GLM).
GLM is a linear combination of expressions in the form: 
\begin{equation} 
\label{eqn:linear}
    y = F(\vec{x},\vec{w}) = \sum \limits_b^B w_b f_b(\vec{x}) 
\end{equation}
The $f(\vec{x})$ are not required to be linear functions themselves,
but rather linear in coefficients, to the terms of the summation.
In other words, there are no
coefficients inside any of the $f_b(\vec{x})$. \\

FFX first creates a set of 
univariate bases from each variable
with the operations ($x^{\pm 0.5}, x^{\pm 1}, x^{\pm2}, abs(x),log(x)$).
In their example this produced 176 bases.
Next, the univariate bases were combined
to produce 3374 bivariate bases,
resulting in 3550 total bases.
By allowing bases to be in both the
numerator and the denominator,
the overall number of bases doubles to 7100.
% \tony{these numbers seem to be off: 13var * 3pow * 5ops = 195}

For all $b$ from $b \rightarrow B$,
FFX derives a linear combination of
$b$ basis functions.
To learn a model, FFX applies
pathwise regularized learning
to fit the GLM coefficients.
This learning method uses  
a coefficient threshold value $\lambda$ and varied it until
the number of function bases equals the desired model complexity.
FFX returns all of the models sorted,
using the non-dominated Pareto sort.

FFX works well for many problems,
requiring far fewer computations GP,
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
we did not implement the algorithm
or compare against it.




\begin{figure}[h!]
\lstset{caption={PGA Search Function},label=pga_srch_func}
\begin{lstlisting}
func PGE_Search() {
  eqns := createBasisFunctions()
  IPT.insert(eqns)
  eqns.FitCoefficents(TrainData)
  eqns.Evaluate(TestData)
  PPQ.push(eqns)

  while !done {
    top := PPQ.pop(p_eqns)
    new_eqns := Expand(top)
    
    for e := range new_eqns {
      did_ins := IPT.insert(e)
      if did_ins {
        e.FitCoefficents(TrainData)
        e.Evaluate(TestData)
        PPQ.push(e)
      }
    }
  }
}
\end{lstlisting}
\end{figure}
\subsection{Prioritized Grammar Enumeration}


This work introduces Prioritized Grammar Enumeration (PGE), 
the first tree based implementation of Symbolic Regression.
PGE solves the symbolic regression problem by 
working \textit{with} a grammar, 
to prioritize the enumeration of expressions in that grammar.
PGE uses the grammar's production rules 
to turn simple basis functions 
into increasingly complex expressions. 
PGE is a dynamic programming algorithm and is also deterministic.
PGE considers a model \textit{form} only once,
by employing memoization,
a priority queue, and non-linear regression. 
PGE combines the flexibility of GP 
with the reliability of FFX. 

Initially, PGE starts with 
a set of basis functions:
$c_0*x_i$, $\frac{c_0}{x_i}$, and $N(x_i)$.
Each basis function is 
fit to the training data,
evaluated on the testing data,
and placed into the Pareto Priority Queue (PPQ).
The PGE algorithm iteratively
pops equations from the top of the queue for processing.
Each of these equations is expanded
by applying the grammar's production rules recursively.
The new equations are memoized using
a specialized structure, the Integer Prefix Tree (IPT).
The IPT uses an equation's serialized representation
to track which solutions have been processed already.
The IPT ensures that we only consider 
an equation form once.
This allows PGE to eliminate duplication of effort
in evaluation and expansion.
Unique equations are
fit to the training data, 
evaluated on the test data, 
and pushed into the priority queue.
PGE continues until
a model of desired accuracy is discovered
or a computational threshold is reached.

Variations on the PGE algorithm
can be created by altering how initialize PGE
and step through the grammar via its production rules.
We can seed PGE with a richer set of basis function,
and even allow complete sub-trees to become building blocks.
Further, by enriching the production rules applied at each node,
we can enlarge the set of equations generated at each point in the search space.
One variation of PGE is even 
similar to reversing the FFX pruning into growing (Section \ref{subsec-pge-vari-genfuncs}).
These variation will be discussed in detail
in Section \ref{sec-pge-vari}.































 
<div id="considerations"></div>
<a class="right" href="#top">top</a>

#### Further Considerations



\subsection{Separating Task from Implementation}


In this work, we view SR as only a problem
and view GP as an algorithm for performing SR.
We attempt to make a distinction which
the SR literature has not by using GP
as a term for both the problem \text{and} solution.
We view SR, not as a sub-class, 
but as a super-class to GP, 
as the regression within a grammar. 
A particular programming language is a specific grammar
and an instance of the SR problem.
So can be circuit or atomic regression.
Mathematical equations are another instance of the SR problem
and the one we focus on.


We want to reiterate the difference
between problem and implementation.
Symbolic Regression is the task
which uncovers relationships in data
by searching the expression space defined by grammar.
An implementation is the assemblage of methods
which realize the Symbolic Regression task. 
We believe the lack of separation has 
led to some missed opportunities is SR research.
In this work, we step back from SR
to fundamentally change the way we
think about regressing symbolic expressions.


We also make this distinction 
because recent work \cite{McConaghy:2011:FFX}
introduces, to our knowledge, the first
deterministic algorithm for SR called
Fast Function eXtraction (FFX),
offering a new means of performing an equation search.



\subsection{Implementation Evaluation}

In order to compare SR implementations,
and before trusting them on unsolved problems,
methods for quantifying the effectiveness
of their search capabilities are needed.
The methods employed include:
accuracy, number of evaluations performed, number of candidates tested
number of generations or iterations, rate of convergence, and clock time.
Some measures are biased towards
one or another SR implementation,
depending on the setup and framework.
Clock time is a relatively unbiased measure
if the environment is the same and is closely
related to the amount of work performed by a SR implementation.
Further, when using certain measures,
other measures become the terminating condition
upon which we base the original measure.
Alternating variations include,
counting the number of iterations until the best solution's accuracy meets a threshold,
or running for a predefined number of iterations and reporting the level of accuracy achieved.
In this way, the efficacy measure, as well as
the termination condition we choose,
create an interplay of measures and parameters
which must also be taken into consideration
when drawing conclusions about an implementation.

Before describing each measure 
we would like to note that
the performance quantification methods represent 
differing objectives and measurements of performance
and should not be used in isolation.
Consider clock time, which can give us insight into
how time to solution scales with solution complexity,
gives no insight into the quality of the solution.
Couple this with accuracy and gain a measure of quality,
but we are still left without knowledge of the
implementations ability to create meaningful models.
As one could imagine,
using a single or limited set of measures can result in 
misleading or biased comparisons.
There is inconsistent use,
and wide range, of measures
in the SR literature
which can make comparison difficult at times.



\noindent
\textbf{Number of Iterations}

\noindent
The number of iterations
is often equated with how many steps
it takes to find a solution.
GP has a natural step between parents and children
and is referred to as generations.
Each generational step 
uses the current solutions and genetic operators
to produce new candidate solutions.
The number of generations is
loosely tied to how long it
takes a GP implementation to 
converge to an answer.
In PGE, the generational step
is applying the grammar productions
to the best candidate solutions.

Measuring performance by iterations
is easily a biased measure.
It requires careful attention to detail. 
Different implementations use
different logic and parameters, 
searching different amounts of equation space per iteration.
Varying the number of equations
or the layout of the population
effects the search rate.
Fewer iterations is not always better,
but can be a useful measure to minimize
when optimizing the parameters
within a particular SR implementation.
When comparing between implementations,
iterations becomes misleading if
other factors are not considered.


\noindent
\textbf{Accuracy of Candidate Solutions}

\noindent

Accuracy predicts a candidates
ability to model a given data set.
Depending on the goals in using SR
accuracy may or may not be the right measure.
If we seek the most predictive model
then accuracy can tell us which model is best.
However, it is often the goal in SR
to provide insight through meaningful relations.
This is the trade-off between
accuracy and parsimony.
We want the simplest equation
that isn't to simple.
In SR, we usually return multiple models
instead of one single best model.
This allows the domain expert can
evaluate the varying 
degrees of complexity and accuracy.

It is usually the case 
that the most accurate model
has also over fit the data set.
Over fit models high frequency signals within the data
by adding subexpressions to fit these signals.
Validation sets overcome this issue by 
testing the model on unseen data 
after training. 
This results is an unbiased measurement,
unless the learner is also being optimized.
In that case, cross validation or
a third data set is used as
the never-before-seen testing data.
\newline


\noindent
\textbf{Rate of Convergence}

\noindent
The rate of convergence is defined as 
an implementation's probability
of finding the correct solution.
This metric is because
GP is a randomized algorithm
which produces inconsistent results.% \cite{}.
A randomized algorithm's results
depend on the initial starting points.
GP has non-deterministic behavior when
creating the initial equation population
and when genetic operations are applied during breeding.
To compensate for the lack of consistency,
GP researchers run many trials. 
The final results of all runs are tallied
to come up with a probability for success.
Rate of convergence can be a good measure
when comparing the relative efficacy of GP implementations.
It can also be used to tune the
parameters of the GP implementation.

PGE doesn't have a rate of convergence.
It is a deterministic algorithm
which executes the same way,
in the same order,
every time.
Thus, given a set of parameters,
PGE will either find the solution or it will not.
The ability of PGE to find a solution depends
upon the expansion functions and the 
amount of time alloted for searching.

Rate of convergence will not allow
us to make direct comparison between GP and PGE.
It will permit us to loosely infer problem complexity 
with the both implementations
difficulty in finding the 'correct' solution.
Further complicating this issue is that
determining convergence is not well defined.
The literature has used 
hit ratio,
error thresholds,
and $R^2$ correlation.
Real convergence is the matching of form,
which can be done by manual inspection
or by tree comparisons.
To our knowledge, no one has
reported this type of convergence
by directly stating how close 
the results are to the true form.

% for convergence rate:
% who hod compares against
%   - success == hits
%   - hit == <0.01 error on a point
% hod defines as 
%   - in implicit: error < e, but doesn't give e
%   - graph: .9999 correlation



\noindent
\textbf{Clock Time}

\noindent
Clock time tells us how long, 
from when we hit enter,
until we get our answer.
All other considerations equal,
it is an unbiased measure.
Generally every thing is not equal,
and why comparing several measures is useful
and no measure should be used in isolation.

At some point, algorithms and computers
become fast enough at a problem
that time becomes less of an issue.
To a domain expert, 
the difference between an hour and two,
or hours and a day, may not be important.
When they are modeling a large data set
for a particular problem,
a 24 hour turnaround is often acceptable,
especially when one considers the time 
it takes to publish in a journal.

Time, despite being something not to fool with,
is a powerful measure. Small incremental improvements
compound in time to create meaningful progress.
When time is coupled with other metrics,
we can gain measures for the amount of work.


\noindent
\textbf{Amount of Work}

\noindent
Amount of work done is a good metric when
we want the most return for what we put in.
Work, however, can be difficult no quantify.
In SR, work is usually measured by counting
the number of evaluations made,
and relating this measurement over time.

Counting evaluations is easy in GP.
Calculation is population size
multiplied by generations and the number of data points.
A refinement to counting evaluations
is to recording the ratio of unique equations 
to total number equations evaluated.
To our knowledge, 
no one has reported 
using this measure. 
Our memoization structure, the IPT, 
will allow us to relay interesting results
on the number of unique equations
compared to the total number of equations
by both GP and PGE.


% Counting the number of candidates tells us 
% how many equations we actually considered.
% If we count the number of evaluations we
% made on each equation, we get a measure of work. 
% \[
% Work=|Cand|x|Eval|
% \]
% Most work occurs during
% the evaluation phase of the search process. 
% The computation complexity of simulation and evaluation,
% far outweighs the time taken for 
% the remainder of the search process.
% We can reduce this work by 
% reducing either of the terms, 
% number of equations or number of evaluations.


% We can further refine this by considering 
% the number of unique equations evaluated
% compared to the total number.
% We want to be smart about
% how many and which,
% equations and data points we choose.
% Coupling the unique to total equations
% with the number of evaluations
% will provide us a good comparison
% between the SR implementations.
% GP evaluates many equations
% fewer times, but experiences
% great amount of redundancy in form.
% PGE spends a larger amount of
% effort per equation,
% considers a form only once.






\subsection{Reproducibility and the Importance of Determinism}
\label{section-sr-reproducibility}




\subsection{The Issues}

- cs
- gp
- science

\subsection{The Importance}
\subsection{Systems for Reproducibility}




 