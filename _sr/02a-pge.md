---
layout: sr
title: Prioritized Grammar Enumeration
brief: Deterministic, reproducible, and reliable Symbolic Regression
sections:
  - name: Overview
    tag: overview
    brief: Foundations in Genetic Programming
  - name: Theory
    tag: theory
    brief: Organization, , and directing the search
  - name: Components
    tag: components
    brief: Representation, evaluation, optimization, memoization
  - name: Searching
    tag: searching
    brief: Processing, prioritization, pipeline
  - name: Limitations
    tag: limitations
    brief: Exponential growth realated to models and input features
  - name: Reproducibility
    tag: reproducibility
    brief: And the importance in Symbolic Regression tech
---










% \tony{separate problem from implementation}

This chapter describes our rethinking of Symbolic Regression.
Prioritized Grammar Enumeration (PGE) is the result
built on ideas from dynamic programming. 
To our knowledge, PGE is the first,
deterministic tree-based SR implementation.
PGE solves the SR problem by 
working with a grammar to prioritize
the expression enumeration of that language.
Where as GP works within a grammar,
PGE works \textit{with} that grammar.

\begin{quotation}
``A dynamic-programming algorithm solves each subsubproblem
just once and then saves its answer in a table, 
thereby avoiding the work of recomputing the answer 
every time it solves each subsubproblem''
\end{quotation}
\hfill  \cite{cormen:2009:algos}.

PGE using dynamic programming techniques
to consider an equation form only once.
This feature is enabled by 
memoization, a priority queue, and non-linear regression. 
PGE combines the flexibility GP 
with the reliability of FFX. 
It uses the grammar production rules 
to turn simple basis functions 
into complex expressions. 

PGE iteratively refines equations
by applying the grammar's 
production rules recursively.
PGE removes the top equations
from the queue, prioritizing 
the first Pareto frontier.
The top equations are then expanded
according to the production rules.
The resultant expanded equations 
are checked for uniqueness
by the Integer Prefix Tree (IPT).
The unique set of trees that remain are
fit using non-linear regression,
evaluated for fitness,
and pushed into the Pareto Priority Queue (PPQ).
The main PGE loop continues
in this way until the
stopping criteria is reached.


PGE contrasts randomized search algorithms,
such as Genetic Programming,
in several ways.
First, 
PGE uses the grammar directly.
This eliminates the possibility of generating invalid expressions
and, more importantly, provides the rules for searching its space.
Second, 
PGE is a dynamic programming algorithm that memoizes previous results.
This prevents the compounding duplication of effort
from production rules being applied to the
same equation more than once and 
in the evaluation of an equation.
Third, 
PGE fits an equation's coefficients to the training data.
This separates the search for form
from the optimization of that form.
Finally, 
PGE uses no random number generation.
This eliminates the initial condition,
consistency, and reliability issues 
that are inherent in any
randomized algorithm.

Despite the difficulties in actually searching 
a rugged optimization landscape,
we show in Chapter \ref{chapter-results}
that PGE outperforms GP, with the PGE variants
solving all but one of the benchmarks. 
PGE also offers consistency and reliability 
that GP cannot as a randomized algorithm.






















<div id="overview"></div>
<a class="right" href="#top">top</a>

#### Overview



% Problem is really searching the space DEFINED by a grammar
%  - terms \& non-terms
%  - production rules, valid expressions in the grammar (grammar guided, protected operators)
%  - representation
%    - natural is the parse tree, usually binary 
%    - index variables, constants, and even functions (as in AEG)
%    - can reduce through n-ary representation, with sorting and simplifications
%      - alters the search space, isomorphs of the same meaning, sorting \& simplifications
%    - serialization to integer sequence
%      - equivalent to linearized form, such as assembly instructions
%      - permits memoization using a memoTree (described later)
%        - this removes duplication of effort by not solving the same problem more than once
%        - important aspect of PGE as a dynamic programming algorithm for SR
% \vspace*{-.1in}


Prioritized Grammar Enumeration (PGE) is a
deterministic, dynamic programming algorithm for SR.
Being largely influenced by GP,
PGE maintains the parse tree representation for equations 
and incorporates the Pareto non-dominated sort.
PGE diverges in how it
organizes, explores, and
processes the search space.
PGE replaces the genetic operators
with grammar production rules
and random selections with well defined choices.
In doing so, PGE becomes an algorithm
offering reliability and reproducibility 
that a non-deterministic implementation cannot.

Figure 1 shows a pictorial 
representation of the PGE algorithm.
It is presented now 
to serve as a reference point 
as the details are unveiled.
Psuedocode is provided,
at the end of the section,
after the necessary material
has been covered.
% \ken{There's a missing ending to the sentence.  Maybe just a period.}

\begin{figure}[t]
\vspace*{-.1in}
\caption{Grammar for Mathematical Equations}
\lstset{label=grammar}
\begin{lstlisting}
START %* $\rightarrow$ *) E
E %* $\rightarrow$ *) E + T | E * T | T         
T %* $\rightarrow$ *) T - N | T / N | N
N %* $\rightarrow$ *) Cos(E) | Sin(E) | Tan(E) |
      Log(E) | Exp(E) | Sqrt(E) | L
L %* $\rightarrow$ *) (E) | -(E) | (E)^(E) | TERM 
TERM %* $\rightarrow$ *) Constant | Variable
\end{lstlisting}
\vspace*{-.5in}
\end{figure}



Previously, Prioritized Grammar Enumeration (PGE)
was introduced as a new, deterministic algorithm for SR~\cite{worm:2013:pge}.
In addition to creating a
consistent and reproducible algorithm for SR,
PGE also brings to light
and then addresses several, sometimes overlooked,
limitations to the GP algorithm.
We recommend the reader to
refer to the original work
for an in-depth explanation of
the ideas at work in PGE.
Here, we will overview PGE,
paying particular attention to
those aspects which are relevant
to our extensions and enhancements of PGE.
We will conclude the section
with a short discussion of the
overall limitations and opportunities
present in the PGE algorithm.

The first
key aspect to PGE is a
strictly deterministic search execution.
The inherent non-determinism in GP
results from using RNGs during
the selection and recombination phases.
These are the points where decisions
about the search progress are made.
PGE removes the non-determinism by
using a Pareto Priority Queue (PPQ) to
select the next search points
and production functions
to expand the search
from the selected points.
PGE actually pops several equations
from the PPQ at once, so as to
balance the trade-off between
accuracy and parsimony.

Deterministic execution has benefits.
First, the algorithm is consistent and repeatable.
This means that researchers are able to reproduce
results easily.
This is an important feature with
large portions of research
unable to be replicated~\cite{moraila:2013:measuring}.
Second,
deterministic execution means that
modifications to the algorithm can
be studied in isolation with their
effects becoming much easier to measure.
Third,
the PGE algorithm only needs to be
run once on a given data set.
This is a significant advantage over GP
which requires 30 or more trials
in order to obtain statistically significant results.
In all of our modifications to the algorithm,
we maintained PGE's deterministic execution nature.

\ken{Following paragraph too long.}
A second key aspect to PGE is
the reductions it makes to the search space.
The net result is the removal of three factorial
components of the problem.
PGE is enabled in this way by
with a few keen observations and several
sub-algorithms which work together.
The first observation is that
addition and multiplication are special operators in SR
because of their commutative and associative properties.
PGE uses a $n$-ary tree to gather the
operands to these two operators in one node
as opposed to a binary tree representation.
This flattens the tree,
removing the first combinatorial element that results
from varying tree shapes of the same equation.
This is akin to removing parentheses in the written form
and takes advantage of the commutative property.
The second observation was that
an arbitrary numbering could be
placed on the nodes and leafs of a tree.
Doing so enables the removal of another
two factorial elements to the problem.
First,
the numbering creates an ordering,
albeit arbitrary,
and allows the equation to be
sorted recursively through its syntax tree.
This only effects addition and multiplication
putting their operands into a consistent order.
In doing so,
the permutations of the operands
are reduced to a single ordering
and the second factorial is removed.
The second benefit from numbering the nodes
is the prefix-notation, integer-sequence representation
that is obtained by a pre-order printing traversal of the tree.
The linear, integer sequence is unique to each equation
and used with the Integer Prefix Tree (IPT),
a recursive map based on prefix-string matching,
to provide the necessary machinery for memoization.
The need for memoization arises because
the same equation (syntax-tree) is reachable
through different orderings of the expansion functions.
If left undetected, these multiple copies would
be treated as different equations and
duplication of effort would compound over iterations.
To detect these situations,
PGE uses the IPT to lookup and store
one unique copy of each equation.
In addition to the equation,
its current state of processing
(discovered, evaluated, or expanded).
is maintained in the IPT.
In Section \ref{section:algorithm}
we will expand the state information
maintained in the IPT to enable our multi-PPQ processing.

The third observation PGE makes
is that the search for an equations form,
its structural configuration,
can be separated for the optimization
of that form's parameters.
This is a significant advantage over GP,
which classically and usually relies
on the crossover and mutation operators
to update the parameter values.
PGE makes use of abstract parameters,
valueless placeholders in the equation,
to capture the existence and location of a
models parameters.
These abstract parameters are used
during the memoization process to capture the form
and in the evaluation phase to fully optimize an
equation the first time it is encountered.
In the optimization phase,
PGE uses the
Levenberg-Marquardt optimization algorithm~\cite{lourakis04LM}
to fully fit an equation to a set of data.
In particular, the analytical Jacobian
w.r.t. the parameters is used,
which requires a symbolic derivative to be calculated.
In Section \ref{section:decouple},
we extract the evaluation process
from the main loop into a service.
We then extract the Jacobian calculation
from the evaluation service
and replace it with
an API call in the algebra service.




PGE limitations and opportunities\\


Addressed\\
- all models are completely trained
  [expensive with large data sets]
  (pass through multiple heaps and increased data)\\
- custom algebra lacks features \& has errors
  (use a mature system SYMPY, and provide as a service)\\

Unaddressed\\
- ordering is arbitrary\\
- when / where to put coefficients\\
  (complex)
- un-dealt with exponential w.r.t. input feature size
  (due to nature of production functions)
  also determines which equations are reachable
  what is the minimalistic set of generators
  which will produce all equations eventually
  (very complex)




Though a full realization of PGE may be complex,
the original formulation is simple
and modular by design,
using simple or naive components.
There exist ample opportunities to
replace components with more advanced algorithms
as well as in distributing these components
and making them internally parallel.



In Section \ref{section:algorithm},
we extend PGE's evaluation to differential equations
as well as extending the main search loop
to use multiple priority queues.
In Section \ref{section:decouple},
we decouple the PGE algorithm into three services,
add internal parallelization to the services,
contain them with Docker,
and then deploy them to GCE.
As a final note PGE has been shown, for the first time,
to be superior to GP-based SR on a real-world problem.
In~\cite{meier:2014:symbolic},
PGE derived simple, compact functions for predicting
precrash severity in automobile accidents in less than 2ms,
exceeding the required real-time constraint
by several orders of magnitude.


\subsection{Relation to Genetic Programming}
\label{sec-pge-r2gp}

Prioritized Enumeration is 
heavily influenced by GP.
It uses the same parse tree representation
for candidate equations.
PGE, however, differs in how it
evaluates, selects, and generates
new candidates from old ones.


\noindent
\textbf{Parameters}

\noindent
PGE is nearly a parameter free
algorithm, requiring only
the building blocks, peel count,
and termination criteria
to be established prior
beginning an equation search.
Since building blocks, 
generally established by the problem or benchmark,
and stopping criteria are common to 
any search method,
PGE only has one parameter
the number of candidates to remove from the PPQ.
This is a substantial
advantage over GP,
which requires many parameters to be set.
This is a notoriously difficult task 
as was discussed in the previous chapter.


\noindent
\textbf{Evaluations}

\noindent
Evaluation is the most 
time consuming phase
of the model discovery process.
PGE performs two steps of evaluation,
fitting coefficients and evaluating fitness.
PGE uses
non-linear regression
to optimize the coefficients,
which requires an undetermined
number of evaluations
on the derivatives of the equation.
Once fit, PGE calculates
fitness on the testing set.
In GP, one evaluation
per data point, per equation
is required for both training and testing.

% \tony{touch on the reducdancy of equation forms and difficulties GPSR has with tuning coefficients}

Regressing the coefficients
has a profound effect on the 
ability of PGE to quickly
traverse the search space.
It allows for the separation
of equation form and coefficient optimization
into two sub-tasks of the overall search.
In GP, the optimization of form
is difficult and the most time
consuming portion of the search process.




\noindent
\textbf{Selection}

\noindent
To prioritize the enumeration of expressions,
we maintain, what we will refer to as, a Pareto Priority Queue (PPQ).
The contents of the PPQ are the equations
which have been regressed and evaluated,
but have not yet been expanded.
The PPQ is similar to 
the basic priority queue, 
in that we want to quickly 
prioritize the elements
which have the highest priority.
However it is different
because we are sorting on
two objectives, parsimony and accuracy,
rather than one.
When selecting the equations
to expand next,
we remove one or more elements
from the front of the heap.
Since the front of the heap
is the first Pareto front,
we prioritize the smallest
equations first

The more equations we \textit{peel} (remove)
from the front of the heap,
the more of the search space
we consider concurrently.
This enables the search to 
exploit equations that
express different levels 
of the trade off between
parsimony and accuracy.
If we select only one equation 
from the PPQ per iteration,
the search degenerates into
a search which progresses
through expression size.
This degenerate case will 
exhaust all possible equations
of the current size 
before considering
any larger equations.




\noindent
\textbf{Population and Breeding}

\noindent
In PGE, there is no need to
maintain a diverse population
in which survival and replication
determine the outcome of the search.
In fact, one of the goals of PGE
is to only process 
an expression form once.
This is managed by the IPT 
which tracks the equations that have 
been evaluated and expanded.
Equations which have been
generated, regressed, and evaluated
sit in the PPQ.
Once an equation has been
removed from the PPQ
and expanded upon,
it requires no further consideration.




















<div id="theory"></div>
<a class="right" href="#top">top</a>

#### Theory




\subsection{Organizing the Search Space}

Figure \ref{grammar} is a grammar for mathematical equations
and the one we use in this work.
% \ken{An example, or the one we actually use?}
A grammar, such as this one, 
defines the search space which
a SR implementation will explore.
The terminals, non-terminals, and production rules
form the building blocks from which 
valid equations may be constructed.
Equations are composed of these basic components 
to form the `DNA' of an expression,
a functional genome that mirrors 
the parse tree for an equation. 
Operators (+ - * / sin exp etc.) are the 
internal nodes to the tree.
Operands are the terminals or leaves
representing state variables, constants, and real-valued numbers.
PGE, like AEG, uses indexed coefficients,
enabling these abstract parameters 
to be optimized separately from 
the search for form. 

PGE uses $n$-ary trees, 
where operands can have a variable number of children.
In the $n$-ary tree representation,
the associative operators can have $n$ sub-trees,
flattening and reducing the tree's size.
This is a slight modification from the usual binary tree;
only affecting the associative operators addition and multiplication.
The $n$-ary tree does not change the 
modeling ability of the equation,
but will effect the
trade-off between parsimony and accuracy.
This in turn effects 
the selection operation of any SR implementation,
though we do not investigate this issue here.

In addition to the reductions in parse tree size, 
the $n$-ary representation eases the 
design of sorting and simplification algorithms.
These algorithms, detailed next,
work within the parse tree
to reshape equivalent trees into a canonical form.
This effectively merges isomorphic equations,
reducing the size of the search space,
while simultaneously adding structure
to the search space.
% \newline
\newpage

% reduces the number of equation forms
% and orders the search space,
% \com{creating a sort of structure to that search space.}
% The simplification algorithms are analogous to 
% rewrite rules from the parser literature\cite{Aho:1972:TPT},
% and are reminiscent of high school algebra. \\

% \vspace*{-.2in}
\noindent
\textbf{Reducing the Search Space}
\label{sec-sr-space}

The size of the space defined by a grammar
is infinite, even when disregarding the 
increase brought by considering real valued coefficients.
This is the result of a grammar's production rules
being applicable recursively and indefinitely.
Adding to the multiplicity, 
an equation will usually have 
several derivations for each parse tree
and isomorphs through manipulations 
with basic algebra techniques.
Consider the equation $a \cdot b \cdot c$ (Figure \ref{fig:eqn-combis}). 
This equation has 12 different binary tree representations,
from six leaf permutations and two shape permutations.
If we use both addition and multiplication,
this number of trees is 48.

As the number of operations,
operands, and tree complexity are increased,
the size of the search space
undergoes a combinatorial explosion.
To consolidate this space, PGE
imposes operator restrictions,
simplifies equations,
and partially orders sub-expressions.
When combined, these methods 
only allow syntactically valid equations to be considered,
merge isomorphic equations into a canonical form,
reduce the overall size of the search space,
and create a structural ordering to the search space.

\begin{figure}[h!]
\centering
\includegraphics[scale=0.2, clip=true, trim=0 20 0 20]{imgs/eqncombis/eqn-combis4.png}
\vspace*{-.2in}
\caption[Equation Tree Permutations]{Equation Tree Permutations}
\label{fig:eqn-combis}
\end{figure}


Operator restrictions,
or interval arithmetic \cite{keijzer:03:improving},
disallow invalid mathematics
such as dividing by zero 
or taking the logarithm of a negative number.
In general, we wish to only consider valid equations,
however, there may be instances when
an invalid equation is an intermediary
to a valid equation ($log(x) \rightarrow log(abs(x))$).
Though this issues is beyond the scope of this paper,
it deserves further investigation.
% \ken{Why ``in general''?  Do we ever want to consider an invalid equation?}

Simplifications group like terms together ($x+x$), 
replace sub-expressions which evaluate 
to a constant value ($\sin\pi$, $\frac{x}{x}$, or $x-x$),
and reduce unnecessarily complex expressions such as $\frac{1}{\frac{1}{x}}$.
The resulting equations are equivalent,
simpler forms.
% These algorithms replace 
% sub-expressions with simpler versions
% which evaluate to the same value,
% % convert one parse tree to an simpler, equivalent tree,
% and are reminiscent of algebraic transformations.
% , known as tree rewriting systems 
% \cite{Joshi:1975:TAG,dershowitz:1982:orderings,huet:1980:equations},
There is debate as to how
simplification effects the SR process \cite{kinzett:2008:using,kinzett:2009:online,mcree:2010:symbolic}.
Certainly, changing the tree effects
the Pareto trade-off which in turn
has consequences on selection and 
therefore search progress.
Questions still remain as to 
how much and which simplifications should be applied, 
which forms of the equation should be kept,
and the overall effects simplification has on the search process. 
Despite these questions,
PGE still employs 
the use of the aforementioned simplifications. 
This is done to eliminate
those sub-expressions which
unnecessarily complicate equation
and the overall search space.
If they were not replaced,
many equivalent variations of a good equation
could crowd out other potential solutions,
as they would be selected more often.
This would result in the algorithm
stagnating in a local optima of the search space.
Simplifications effectively trim
out parts of the search space
which are redundant, and also
return results which are more comprehensible.

% \ken{It may be a good idea to actually list the actual rewrite rules used.}

% other why's of PGE's use of simplification
% (reducing the search space)
% see last paragraph of this section


Partial ordering of sub-expressions
provides the necessary machinery for comparing 
and thus sorting terms of associative operators.
In PGE, partial ordering is created by
placing a relative order on each building block type.
Terminals are less than non-terminals,
variables are less than constants,
and unary functions are less than binary functions.
Since addition and multiplication are the only associative operators,
they are the only building blocks affected by sorting of sub-expressions.
Figure \ref{fig:eqn-combis}, right column, shows 
the canonical form of $a \cdot b \cdot c$ with a $n$-ary tree and sorting. 
If $a<b<c$, then there is 
only one representation for each of the expressions,
reducing the original 48 to just 4.
The savings created by sorting 
become larger as equations
become more complex.
% \ken{Complete details would be nice, if there is time and space.}

Partial ordering, coupled with 
the $n$-ary tree representation and simplifications,
yields many-fold reductions of the search space.
Invalid and ineffectual expressions are removed,
variations of associative forms are limited,
and isomorphs are combined,
shrinking the number of representable equations 
that need to be explored by a SR implementation.
PGE takes reductionism one step further,
fully optimizing an equation in the search space
the first time it is encountered
and remembering which equations
it has discovered thus far.
These features enable PGE 
to discard equations it
has already seen
and is described next.
% \ken{Make sure that what you mean by "optimizing" is explained here or before this point, or use some kind of backwards/forward reference.}

\subsection{Evaluating Forms Once}

At its core, PGE is a dynamic programming algorithm
which aims to evaluate each sub-problem once.
In PGE and SR, a sub-problem is a particular
equation form, namely the parse tree and its parameters or coefficients.
The key to evaluating forms once
is to fully optimize a form the first time it is seen
and to remember the forms which have already been explored.
PGE optimizes forms by fitting 
abstract parameters with non-linear regression and
by recording which equations it has already seen with a lookup trie.
% The memorization of previously encountered sub-problems
% is the central idea behind dynamic programming \cite{cormen:2009:algos}.
\newline

\noindent
\textbf{Non-Linear Regression}

Non-linear regression is not unique to PGE, or GP for that matter,
but it is a central component of PGE's
ability to evaluate an equation form once.
As PGE encounters new equation forms,
it fits the abstract parameters using non-linear regression,
resulting in the `best' version of that form on the training data.
PGE uses the Levmar C library implementation of the 
Levenberg-Marquardt optimization algorithm \cite{lourakis04LM}.
The analytical Jacobian version is used
by symbolically calculating the derivations
of an equation w.r.t. each coefficient.
In cases were an equation is linear
to the coefficients, the Levmar library
returns in one iteration by using
singular value decomposition (SVD).
Training performance is used as the metric
for fitness comparison, along with equation size,
as is usual when using Pareto fronts.
The fully optimized form is later
evaluated on unseen testing data 
to provide an unbiased measure of accuracy.

PGE's treatment of coefficients
is in direct contrast
to the probabilistic optimization
GP uses through its genetic operators.
Abstract parameters and non-linear regression 
enables the separation of search for equation form,
from optimization of a form's parameters.
% \ken{Good point, I think.}
This separation, in turn, enables an equation form
to be fully evaluated once,
removing duplication of effort that GP experiences
when using genetic operators to 
optimizing the coefficients of an equation form.
\newline

\noindent
\textbf{Memoization of Equation Forms}

In PGE, a sub-problem is equivalent 
to a particular equation form.
Sub-problems are encountered
when an equation has
several parse derivations
and isomorphs to an equation
exist through algebraic manipulations.
This means there are multiple 
orderings of the production rules which
result in the same equation
and that each equation may
appear in more than one form,
as several equivalent points 
within a grammar's representable space.

Detecting previously encountered equations
is the key to the dynamic programming approach taken by PGE.
The memoization of form allows PGE 
to consider a form just once.
PGE matches equations by comparing 
the serialized representation of the equations.
Serialization transforms an equation into a sequence of integers
by assigning a unique value to each node type.
The resulting integer sequence is equivalent
to the prefix notation of the equation.
Also, since PGE uses abstract coefficients,
they are all converted to the same value.
This means PGE only memoizes their existence and location.

PGE uses a trie structure, implemented as an 
integer prefix tree (IPT),
for the lookup table of
currently explored equations.
An equation serial is the key
that the IPT uses to return a boolean value,
indicating if the respective equation is new or not.
The IPT was inspired by the 
suffix tree algorithm for string matching 
\cite{Weiner:1973:LPM,Farach:1997:OST}.
The suffix tree algorithm 
gives log-time lookup for
string existence in a piece of text.
Similarly, the IPT provides log-time determination, 
w.r.t. the size of the equation alphabet (terminals \& non-terminals),
and linear-time to the length of the serial (a sequence of integers),
as to whether an equation has been encountered before.
If the IPT is reasonably balanced, 
then it has log-time w.r.t. the number of
equations encountered thus far,
with worst case being linear-time.

Listing \ref{pretree} provides the psuedocode for the IPT.
The IPT is a recursive structure
which is iteratively built as new equations are encountered.
To perform a lookup, and possible insertion,
a serial $S$ and the root \textit{memoNode}
are passed to the \textit{Insert} function.
At each recursive call, 
equivalently each \textit{memoNode} of the IPT
and position in the serial $S$,
the first element of $S$ (the current node type)
is looked up in a balanced binary tree ($memoNode.next$).
If the node does not exist,
it implies that this serial has not been seen before,
and thus, that this is a new equation. 
When this happens, a new \textit{memoNode}
is created and each successive recursive call
will produce a new \textit{memoNode}.
Recursion continues until the 
serial has been completely traversed.
If no new nodes have been inserted,
then it means that this equation
has been encountered before,
and is subsequently discarded.

The IPT also tracks 
the number of total unique visits.
This allows PGE to report
the total number of unique
equations evaluated,
which is the same as the total
number of equations evaluated in PGE.
Due to the reductions of isomorphs
to a canonical form, the reported amount of space 
explored by PGE is much larger in the
original, unreduced search space.
To our knowledge, no one has 
before reported the unique number 
of equations evaluated.
The IPT is easily incorporated
into almost any SR implementation,
and we believe that it can improve the reporting
of the extent to which the search space was explored,
as well as the amount of effort expended
on searching for form versus 
optimizing forms.




% \ken{It's still not clear.  What are you memoizing? The key is a sub-expression, right? What's not clear is what the value is}

% \dken{Why do you need the IPT?  Why not use a red-black tree? The IPT sounds a bit like a trie. How is it different?}
% \dken{It's clear how memoization can save work, but how does it detecting overlapping subproblems?
% Give details, and an example would also probably be helpful.}


% \tony{We haven't seen anything like the IPT in SR before}

\begin{figure}[t!]
% \vspace*{-.3in}
\caption{Memoziation Tree}
\lstset{label=pretree}
\begin{lstlisting}
struct memoNode {
  int               curr_type
  map[int,memoNode] next
  
  int unique
}

func Insert(S []int, N memoNode) bool {
  inserted = false
  in = N.next[S[0]]

  // does this branch exist?
  if in == nil
    in = new(memoNode)
    in.curr_type = S[0]
    N.next[S[0]] = in
    inserted = true
  
  // recursive call to insert
  if len(S) > 1 
    inserted = Insert(S[1:],in) || inserted
  
  // visitation accounting  
  if inserted == true
    N.unique++

  return inserted
}
\end{lstlisting}
\vspace*{-.3in}
\end{figure}


\subsection{Removing Non-Determinism}
\label{subsec:rm-nondet}
% \subsection{Enumerating a Grammar with Generating Functions}

Removing sources of non-determinism 
was a central theme to the development of PGE.
The aim was to produce an algorithm
which would give the same results with each invocation.
To achieve this deterministic behavior, 
%PGE operates in a single thread of execution
%% Multithreaded code can still be algorithmically deterministic. -Ken
PGE makes no use of random number generation.
It performs the exact same algorithmic steps
given the same parameters and same training data.
PGE replaces 
the initialization, breeding and
selection mechanisms of GP.
The first two are detailed here and
the selection policy is described 
in Section \ref{subsec:dir-search}.

To determine the SR starting points,
GP uses methods like grow, full, and ramped half-and-half 
to randomly generate initial equations.
In contrast, PGE initializes a search with 
a set of basis functions, such as
$c_0*x_i$, $c_0 + c_1*x_i$, $\frac{c_0}{x_i}$, and $c_0*f(x_i)$.
These starting points are the simplest functions
and are predetermined by the usable building blocks.
Instead of growing equations at the beginning,
PGE starts with simple functions,
expanding them to reach 
new, unseen areas of the search space.
% PGE may be seeded with an even richer set of basis function,
% and even allow complete sub-trees to become building blocks.

To expand a candidate equation,
%the currently discovered, most promising equations,
PGE uses generating functions 
derived from the grammar's production rules.
Generating functions are the deterministic replacement 
for the non-deterministic genetic operators,
crossover and mutation.
Each generation function corresponds to
one or more of the grammar's production rules. 
The generation functions are policies
for how to expand and modify
an equation's parse tree to obtain 
functions `close' to the current one.
New equations are produced by recursively applying
the generating functions over the parse tree.
From a single tree, this process produces
a set of reachable equations within
one step of the input equation.
As the production rules are applied recursively,
the current node's type determines
the appropriate generation function(s) to apply.
Listing \ref{expand} shows some example generation functions. 
\textit{AddTerm} increases
the number of terms in a summation, such as
$aX + bY \Rightarrow aX + bY + cZ$. 
\textit{WidenTerm} increases
the number of terms in a multiplication, such as
$aXY^2 \Rightarrow aX^2Y^2$ or $aXY^2 \Rightarrow aXY^2Z$.
\textit{DeepenTerm} increases
the complexity of a term, such as
$aXY \Rightarrow a(X+bZ)Y$ or $aSin(X) \Rightarrow aSin(X+Y)$.

\begin{figure}[t!]
% \vspace*{-.3in}
\caption{PGE Expansion Functions}
\lstset{label=expand}
\begin{lstlisting}
func AddTerm(E Expr) {
  E %* $\rightarrow$ *) E + c*TERM
  E %* $\rightarrow$ *) E + c*N(TERM)
}
func WidenTerm(T Expr) {
  T %* $\rightarrow$ *) T * TERM
  T %* $\rightarrow$ *) T * N(TERM)
  T %* $\rightarrow$ *) T / TERM
  T %* $\rightarrow$ *) T / N(TERM)
}
func DeepenTerm(N Expr) {
  N %* $\rightarrow$ *) N + c*TERM 
  N %* $\rightarrow$ *) N + c*N(TERM)
  N %* $\rightarrow$ *) (c*TERM) / N 
  N %* $\rightarrow$ *) N / (c*TERM) 
}
\end{lstlisting}
\vspace*{-.3in}
\end{figure}

Variations on the PGE expansion algorithm
can be created by parameterizing where and 
which generation functions are applied to a candidate.
By modifying the productions applied at each node,
we can reduce or increase the set of equations 
generated at each node of the tree,
and thus each point in the search space.
In this paper,
we used three different expansion methods.
The basic method (PGE-1) restricts the grammar 
by removing productions which result in
non-distributed expressions like $ax*(b+cx*(d+x^2))$.
It only uses \textit{AddTerm} and \textit{WidenTerm}
during the recursive expansion.
The second method (PGE-2) adds back the previously mentioned restriction,
using all three generation functions from Listing \ref{expand}.
This results in isomorphs
which are too `far' apart 
for simplification rules to consider the same.
Despite being equivalent,
these isomorphic forms can produce very different offspring,
and represent separate areas of the search space.
% which may be discovered  
% at different stages of the search.
% \ken{So then why test it? Does it have some potential advantage?}
The third method (PGE-3) is FFX inspired,
but starts with only a set of univariate bases.
These bases are iteratively 
grown into a summation of multiplications
by applying \textit{AddTerm} and \textit{WidenTerm},
creating candidates with more and increasingly complex bases.
PGE-3 differs from the PGE-1 method by
explicitly defining the root node to be addition
and placing stricter limitations on the complexity
of each term in the summation.
% \ken{If there is time/space, it would probably be good to add details on these PGE methods.}

% \dken{Is every expansion applied to every node?}

The initialization and generating functions,
determine the set of reachable expressions in a SR search.
As with the equations themselves,
there is a trade-off between
space and complexity;
how wide and how deep a search can explore.
The expansion methods discussed above
enable PGE to remove 
non-determinism at the individual level.
To fully remove non-determinism, and give direction to the search,
the selection strategy still needs to be replaced.

\newpage




\vspace*{-.4in}
\subsection{Directing the Search}
\label{subsec:dir-search}

SR seeks to optimizes both the
parsimony and accuracy of equations.
PGE uses a priority queue to express
which points in the search space
to expand next. 
By incorporating the Pareto non-dominated sort
into a priority queue,
the PGE search 
can exploit and optimize 
the trade-off between competing objectives
in a deterministic order.
\newline

\noindent
\textbf{The Pareto Priority Queue}

The Pareto Priority Queue (PPQ)
is the deterministic mechanism
for controlling the search direction of PGE.
The PPQ replaces selection for mating
with prioritized equations for expansion
(selection for survival is unnecessary
since all equations are remembered).
The PPQ is what its name implies,
a priority queue built on the Pareto non-dominated sorting.
The PPQ prioritizes expansion towards
those branches of the search space which
balance size and accuracy best.
The PPQ removes the need for
generations, survivors, and
mating pools, storing
all explored equations which
have not been expanded.
Our experimentations have not shown this to
be prohibitive. Consumed memory
never exceeded 500Mb, even in the face of
hundreds of thousands of unique equations. 
% \dken{It stores all explored equations, right?  Is space an issue?
% Maybe some ballpark calculations to show that it is not.}

To construct the PPQ, successive 
Pareto frontiers are appended onto a linear structure.
Thus, the smallest equation from the
first Pareto front is at the head of the queue.
The next elements are the remainder of 
the first Pareto front in increasing size.
The remaining Pareto fronts 
follow a similar pattern.
Priority is first given to the Pareto frontier
and then to size within the frontier.
This is the same as Pareto sorted array
that results from the GP Pareto sort
during selection.

During processing, PGE removes the top 
$p$ equations from the PPQ in order to select
the next areas to expand.
By doing so, PGE selects the $p$ smallest 
equations from the first Pareto frontier.
This gives variation across the trade-offs
for which equations to expand,
exploiting multiple paths in the space simultaneously.
If only the first (smallest) equation is removed,
search would progress through the space by size.
If $p$ is too large,
then overly complex equations are produced, 
over fitting the data and
causing bloat to ensue.
Bloat in PGE is the result
of good solutions
crowding the front of the PPQ.
As the search progresses,
extraneous material is added
to candidates which has little
effect on the accuracy of the equation.
This has a compounding effect, whereby 
the extra material increases the 
number of expansion points of the tree,
creating even more similarly accurate
expressions with ineffectual sub-expressions.

% \ken{Can you add another sentence to explain why/how that happens?}

PGE's selection policy is deterministic.
With each independent PGE invocation,
and each iteration,
the same equations will be at the front of the queue.
This means the same equations will be expanded,
the same productions will be applied,
and the same results will be returned.
\newline


\noindent
\textbf{Processing in PGE}

In PGE, processing follows a deterministic execution path.
It uses no random number generation. % or asynchronous execution.
%and runs in a single thread of execution.
%% Multithreaded code can still be deterministic.  -Ken
%% I was thinking about that for future work (parallelizing the eval code with sync points)
Given a parameter setting and training data,
PGE will execute the same way every time.
Further, the PGE search algorithm only has to be run
once in order to obtain conclusive results.
This is an advantage over GP implementations, 
which are run multiple times to produce
statistically significant results
for the number of successful trials.
PGE has no analogue to the percentage
of successful trials that GP has.

The PGE search proceeds as follows.
Initialization generates
a set of basis functions for each variable.
These basis functions are then
memoized by the IPT, 
fit to the training data,
evaluated on the testing data,
and pushed into the PPQ.
The main PGE loop iteratively
pops $p$ equations from the top of 
the PPQ for processing.
Each of these equations is expanded
through recursive application of the generation functions.
The resulting equations are memoized using the IPT.
If the equation has been encountered before,
it is discarded.
The remaining unique equations are
fit to the training data
with non-linear regression,
evaluated on the testing data,
and pushed into the PPQ.
PGE continues until
a model of desired accuracy is discovered
or a computational threshold is reached.
Theoretically, PGE could 
explore the entire space of representable equations
given infinite space and unlimited time.

\begin{figure}[h!]
\vspace*{-.2in}
\caption{The PGE Search Loop}
\lstset{label=prioenum_code}
\begin{lstlisting}
PPQ = %* $\emptyset$ *)
memoTree = %* $\emptyset$ *)
func PGE_Search(int p, GenerationFunc gFuncs,
                Data trainData, Data testData ) {
  bases = createBasisFunctions()
  memoTree.insert(bases)
  bases.FitCoefficents(trainData)
  PPQ.push(bases)
  bases.Evaluate(testData)

  while (check_stopping_criteria() != stop) 
    new_eqns = %* $\emptyset$ *)
    for i=0; i < p; i++ 
      top_eqn = PPQ.pop()
      new_eqns += Expand(top,gFuncs)
    
    for e in new_eqns 
      did_ins = memoTree.insert(e)
      if did_ins 
        e.FitCoefficents(trainData)
        PPQ.push(e)
        e.Evaluate(testData)
}
\end{lstlisting}
\vspace*{-.3in}
\end{figure}

% \vspace*{-.1in}
\noindent
\textbf{Parameters}

PGE is nearly a parameter free
algorithm, requiring only that
the building blocks, generating functions,
the value of $p$, and termination criteria
be established prior to
beginning an equation search.
% \ken{Has peel count been defined? I know what it is, but should do it for the reviewers.}
Since building blocks are 
generally established by the benchmarks,
and stopping criteria are relatively
common across SR implementations,
PGE has only two unique parameters:
(1) $p$, the number equations to remove from the PPQ
and 
(2) which generation functions to use.
% PGE has no populations, 
% no generations or ages, 
% and no random number generation.
This is a substantial
advantage over GP,
which requires many parameters to be set,
a notoriously difficult task.



% \com{Is there any way to make it clear where the parameters are in this pseudo-code?
% I can read the text and see what they would be, but it helps to have them quickly pointed out.  When does done become true?  Again, written in text but not clear just looking at the algo.

% Nit-picky:
% Where does TrainData and TestData come from? Parameters?
% Does PPQ start empty?}



































<div id="components"></div>
<a class="right" href="#top">top</a>

#### Components




PGE has four components
which enable its search capabilities.
The first of these are the generating functions
which produce new equations from previous equations.
The second is an Integer Prefix Tree which enables
memoization of equations from their serialized representation.
The third component is non-linear regression 
which separates form from optimization.
The fourth component is the Pareto Priority Queue
which gives order to the search space
by prioritizing equations over one another.



\subsection{Representation}

\subsubsection{Equation Representations}

\subsubsection{Integer Prefix Tree}
\label{sec-pge-ipt}
\begin{figure}[h!]
\centering
\includegraphics[scale=0.33, clip=true, trim=20 200 20 20]{imgs/ch4/a+b+c.pdf}
\caption{Multiple derivations of $a+b+c$}
\label{fig:abc}
\end{figure}

The Integer Prefix Tree (IPT) is at the core 
of the PGE dynamic programming framework. 
The IPT detects overlapping subproblems
by comparing integer sequences,
the serialized representation of an equation.
Detecting overlapping subproblems
enables us to eliminate duplication of effort
in an exponentially growing search space.

In PGE, a subproblem is a particular equation form.
Subproblems are encountered
because the search space of equations
is a graph and not a tree. 
This means there are multiple paths, to a particular equation,
through the search space.
This is a consequence of the multiple orderings
for application of generating functions
which will produce the same parse tree.
Figure \ref{fig:abc} shows how the equation $a+b+c$
has multiple derivations.
One con imagine how the number of derivations
increases exponentially as the 
equation complexity increases. 
(see figure \ref{fig:eqn-combis} for some further examples)

The IPT was inspired by the 
suffix tree algorithm for string matching 
\cite{Weiner:1973:LPM,Farach:1997:OST,Skiena:1998:ADM}.
The suffix tree algorithm 
gives log-time lookup for
string existence in a piece of text.
Similarly, the IPT provides log-time determination, 
w.r.t. the size of the equation alphabet,
as to whether a subproblem has been encountered before.
Since the ASCII alphabet is equivalent to the integers, 
in a mathematical mapping sense,
we can use any sized alphabet,
or equivalently, range of integers.

The serialization process transforms
an equation into a sequence of integers.
By assigning a unique integer
to each node type,
and performing a in order traversal of the tree,
the prefix notation of the equation is generated.
For addition and multiplication
we also append the number of children.
This is done since we use
an n-ary tree instead of a binary tree
as described in section \ref{sec-sr-rep}.
Each sequence represents a unique equation
and the parse tree is recoverable from the sequence.

% \tony{show several examples in a table or diagram with tree/table ??? }
% % also with,
% %  lines between segments of the serial
% % and the parse tree
% % in a diagram

% \ken{What are you memoizing? The key is a sub-expression, right? What's not clear is what the value is}

PGE uses the IPT memoization tree defined in Listing \ref{pretree}.
The IPT is a recursive structure and insertion algorithm
which memoizes a sequence of integers.
We build the IPT as we encounter new expressions.
As each node in the IPT is visited,
its associated counter is incremented.
If the insertion algorithm has to create
a new node, then the expression is also new,
and the expression type is stored in that new node.
New node creation is propagated back up the tree
as the insertion function unwinds.
The root IPT node unique counter is incremented if
a new insertion took place.
Each insertion or lookup takes O(mlog(n)) operations,
where m is the length of the serial
and n is the size of the alphabet.
The depth of the IPT is equal to 
the length of the longest serial encountered. 

% \tony{I underlined O(mlogn), I think it's correct}
% - m to traverse the serial
% - logn to lookup/insert at each node
%   (map == balanced binary tree at each node)

At each node of the IPT,
the current node type in the serial
is looked up in a balanced binary tree ($PrefixNode\rightarrow next$).
If the node does not exist in the IPT,
then it is created.
The creation of an IPT node
implies that this serial has not been seen before. 
Recursion continues until the 
serial has been completely traversed.
The IPT also tracks the number of times
each node in the structure has been visited.
We keep counts for total visits as recurse,
and unique visits as the stack unwinds after an insertion.
This allows us to do some accounting
of the number of unique equations
as well as how many times each
equation is produced by the generation functions.
We use the IPT to compare
the efficiency of GP and PGE in section \ref{sec-results-efficient}.

The IPT conceptually turns the search space from
a tree into a graph by matching and memoizing
subproblems, or equations.
This greatly reduces the amount of work \ken{how is a graph easier to search than a tree?}
that the PGE must perform
while searching for ideal equations.
As mentioned in Chapter {chapter-symreg},
the search space is also reduced by
sorting equations into a canonical form and 
simplifying them by rewrite rules.
We believe the rewrite rules 
can be combined with the IPT
into a hyper-graph.
This, however, will be the
subject of a future work.
\begin{figure}[h!]
\lstset{caption={Integer Prefix Tree},label=pretree}
\begin{lstlisting}
type PrefixNode struct {
  val int
  cnt int
  vst int

  next map[int]*PrefixNode
}

func (n *PrefixNode) InsertSerial(s []int) (did_ins bool) {
  in, _ := n.next[s[0]]

  // does this branch exist?
  if in == nil {
    in = new(PrefixNode)
    in.val = s[0]
    in.next = make(map[int]*PrefixNode)
    n.next[s[0]] = in
    did_ins = true
  }

  // recursive call to insert
  if len(s) > 1 {
    did_ins = in.InsertSerial(s[1:]) || did_ins
  }

  // visitation accounting  
  // (-1 is the root of the memoization tree)
  in.vst++
  if n.val == -1 {
    n.vst++
  }
  if did_ins {
    in.cnt++
    if n.val == -1 {
      n.cnt++
    }
  }

  return did_ins
}
\end{lstlisting}
\end{figure}




\subsection{Evaluation}

\subsubsection{Non-Linear Regression}
\label{sec-pge-nonlin}

As stated in section \ref{sec-symreg-eqneval},
we use of the the Levmar non-linear regression C library \cite{lourakis04LM}.
Though not unique to PGE, or GP for that matter,
non-linear regression is 
a central component to the PGE algorithm.
It enables the separation of search for form 
and optimization of that form's parameters.
Great gains in efficacy are realized by
separating the search for equation form,
from the optimization of parameters.

PGE achieves this separation by
handling the parameters differently.
Parameters are indexed into an array, 
which means they do not store their value internally.
The indexed parameters contribute only to form,
taking on value only after non-linear fitting.
Handling parameters in this manner 
is analogous to the way variables are treated,
which only contribute to fitness during evaluation.
In this way, the search for form,
and the optimization of coefficients
are split into separate tasks.
This separation has a profound
implications on the efficiency and effectiveness of PGE.

PGE's treatment of parameters
is in direct contrast
to the probabilistic optimization
GP uses through its genetic operators.
Some GP implementations have
incorporated the use of regression
for fitting coefficients.
However, they make no use of memoization,
and therefore still suffer from duplication of effort.

% PGE begins with small, simple expressions
% and expands them into increasingly complex expressions. 
% These expressions are equation forms,
% or the parse tree,
% and the parameters are abstract, indexed coefficients.
% To give the value to the parameters,
% PGE uses non-linear regression and
% fits the coefficients for that form.




\subsection{Optimization}

\subsubsection{Generating Functions}
% \subsection{Enumerating a Grammar with Generating Functions}

\begin{figure}[h!]
\lstset{caption={PGE Expansion Functions},label=expand}
\begin{lstlisting}
func Generate(Curr Expr) (ret []Expr) {
  for each node in Curr {
    switch E.Type() {
    case ADD:
      tmp := AddTerm(Curr, E)
      ret = append(ret, tmp[:])

    case MUL, DIV:
      tmp := WidenTerm(Curr, E)
      ret = append(ret, tmp[:])

    default:
      tmp := DeepenTerm(Curr, E)
      ret = append(ret, tmp[:])

    }
  }
  return ret
}

func AddTerm(Curr, E Expr) (ret []Expr) {
  // E -> E + c*L
  // E -> E + c*N(L)
}
func WidenTerm(Curr, T Expr) (ret []Expr) {
  // T -> T * L
  // T -> T * N(L)
  // T -> T / L
  // T -> T / N(L)
}
func DeepenTerm(Curr, N Expr) (ret []Expr) {
  // N -> ( N + c*L )
  // N -> ( N + c*N(L) )
  // N -> ( (c*L) / N )
  // N -> ( N / (c*L) )
}
\end{lstlisting}
\end{figure}


Generating functions are
the means by which PGE searches
the space of all equations.
They are the deterministic
replacement for the
non-deterministic genetic operators,
crossover and mutation, used by GP.
Each generating function is a policy
for how to expand and modify
an equation's parse tree to obtain 
functions 'close' to the current one.

PGE uses the grammar's production rules 
expand previously encountered equations.
New equations are produced by applying
the function \textit{Generate}, from Listing \ref{expand},
while recursing over the parse tree.

The \textit{Generate} function determines the
current node's type and applies the appropriate
production function. 
Each production function corresponds to
one or more of the grammar's production rules. 
\textit{AddTerm} increases
the number of terms in a summation, such as
$aX + bY \Rightarrow aX + bY + cZ$. 
\textit{WidenTerm} increases
the number of terms in a product, such as
$aXY^2 \Rightarrow aX^2Y^2$ or $aXY^2 \Rightarrow aXY^2Z$.
\textit{DeepenTerm} increases
the complexity of a term, such as
$aXY \Rightarrow a(X+bZ)Y$ or $aSin(X) \Rightarrow aSin(X+Y)$.

\begin{figure}[h!]
\lstset{caption={Grammar for Mathematical Equations in PGE},label=pge-grammar}
\begin{lstlisting}
START -> E
E -> E + T | T          // subtraction handled by negatives & constants
T -> T * N | T / N | N
N -> Sqrt(E) | Cos(E) | Sin(E) | Tan(E) | Log(E) | Exp(E) | L
L -> (E) | -(E) | (E)^(E) | TERM 
TERM -> Constant | Variable
\end{lstlisting}
\end{figure}


The generating functions define
the set of reachable expression
in conjunction with the supplied building blocks 
(terminals and non-terminals of the grammar).
However, generating functions do not determine
the order in which the space is searched.
This is the role of the PPQ 
(section \ref{sec-pge-ppq}),
which prioritizes the areas to explore next.









\subsubsection{Pareto Priority Queue}
\label{sec-pge-ppq}



In the search to model a data set or system
we desire parsimonious and accurate equations.
The Pareto Priority Queue (PPQ) 
determines the order 
the space of equations is searched.
The PPQ gives equations which expand the
branches of the search space
towards small equations with low error.

% \tony{show how pareto fronts turn into an array or queue}

To construct the PPQ,
successive Pareto fronts are 
appended to the end of the queue.
Thus, the smallest equation from the
first Pareto front is at the head of the queue.
The next elements are the remainder of 
the first Pareto front in increasing size.
The remaining Pareto fronts 
follow a similar pattern.
Priority is first given to the Pareto frontier
and then to size within the frontier.
This is the same as Pareto sorted array
that results from the GP Pareto sort
during selection.

When processing, we remove the top 
$p$ equations (3 in our experiments)
when selecting the next areas to search.
By doing so, we select the $p$ smallest 
equations from the Pareto frontier.
This gives variation across the trade-offs
for the equations to be expanded,
and thus variation in the search direction too.
If the PPQ operated like a heap,
the smallest equations would be replaced
from the next front and the search
would progress through the space by size.
The same is true if we only remove one equation.
If we remove too many,
then we get overly complex and over fit expressions.
This causes bloat to ensue,
and the search slows down due to computational effects.




\subsection{Memoization}




































<div id="searching"></div>
<a class="right" href="#top">top</a>

#### Searching


\begin{figure}[h!]
\caption{The Prioritized Grammar Enumeration process}
\label{fig:prioenum_fig}
\centering
\includegraphics[scale=0.33, clip=true, trim=20 20 20 60]{imgs/ch4/PrioEnum.pdf}
\end{figure}


In PGE, processing follows a deterministic call path.
It uses no random number generation
and runs in a single thread of execution.
Given a setting of parameters,
PGE will execute the same way every time.
We only have to run the PGE search once 
in order to obtain conclusive results.
GP, in contrast, has to be executed 
a minimum of 30 times
to obtain statistically significant results.


\subsection{Search Processing}

PGE initializes the search by generating 
a basis function for each variable:
$c_0 + c_1*x_i$, $c_0*x_i$, and $\frac{c_0}{x_i}$
Listing \ref{create_basis_funcs} shows
the basis function creation method
and can be easily extended,
such as mimicking FFX.
These basis functions are then
memoized by the IPT, 
fit to the training data,
evaluated on the testing data,
and placed into the PPQ.
\begin{figure}[h!]
\lstset{caption={CreateBasisFunctions},label=create_basis_funcs}
\begin{lstlisting}
func (pe *PrioritizedGrammarEnumeration) CreateBasisFunctions() {
  eqns := { % *$c_0$*)}
  for i < len(input_variables) {
  eqns = append(eqns,%*$c_0*x_i$*))
  }
  return eqns
}
\end{lstlisting}
\end{figure}


\begin{figure}[h!]
\lstset{caption={Prioritized Grammar Enumeration Search Loop},label=prioenum_code,stepnumber=1}
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
\lstset{stepnumber=0}
\end{figure}
The main PGE loop 
makes the following steps (line numbers):
(9) $p$ equations are from the top of the PPQ.
(10) The $p$ equations are expanded to create
more complex equations \textit{new\_eqns}
by applying the grammar's production rules 
recursively to an equation's parse tree.
(12-19) Each equation $e \in $ \textit{new\_eqns} is processed.\\
(13) The IPT uses an equation's serialized representation
to checks if $e$ has been seen before.
If it has, $e$ is discarded, otherwise $e$ is unique and
(15) fit to the training data
(16) evaluated on the test data
and (17) pushed into the PPQ.
The main PGE loop continues until 
the stopping criteria is reached (8).
Theoretically, PGE would 
explore the entire space of representable expressions
given infinite space and an unlimited amount of time.




\subsection{Prioritization Strategies}



\subsection{Data Qualities Related}

































<div id="limitations"></div>
<a class="right" href="#top">top</a>

#### Limitations


\subsection{Model Parameters}

Fitting

Amount of Data (fully trained) -> tiered

\subsection{Input Features}

Exponential Explosion


% PGE main ideas / key features
%   Deterministic
%     - consistent \& reproducible results
%     - allows components to be studied in greater isolation

%   Search Space Reductions
%     - $n$-ary tree
%     - communativity \& associativity
%       of addition \& multiplication
%     - overlapping sub-problems
%     - Memoization

%   Evaluating Form Once
%     - Separate form from optimization

% PGE specifics which are relevant

%   Non-linear regression
%     - abstract coeff
%     - Levmar
%     - analytic Jacobian
%     - data \& functional parallelism
%       (usual point of parallelization)

%   Pareto Priority Queue
%     - Like a heap
%     - provides the direction

%   Search Loop
%     - pop-expand-eval-push

%     => (pop-eval-push)+ -> pop-expand-push
%     => (pop-FUNC)++ -> (push)++

% PGE limitations and opportunities


% Addressed
% - all models are completely trained
%   (pass through multiple heaps and increased data)
% - custom algebra lacks features \& has errors

% Unaddressed
% - when / where to put coefficients
% - un-dealt with exponential w.r.t. input feature size
%   (due to production functions)



During the development of PGE,
we encountered some of the limitations
with our current implementation and reasoning.

PGE does not handle dimensionality well.
As the number of variables increases,
so do the number of equations generated.
Growth is exponential to the number of variables.
This is because of the production rules
being applied to each node of the parse tree,
which expand with all possible variables.
Further, with more complex generator functions,
equations which are the same mathematically,
are not equivalent through our current rewrite rules.
The combination of these two effects
compounds the issue of the exponential rate of equation generation.
This fact may only be partially limiting,
as the various forms of one equation
represent different areas of the search space,
and different forms are producible from
these points in the space.

Another issues relates to poor partial
solution fitness early in the search process.
Some benchmarks are difficult to approximate
with small functions. Others have good
approximations which experience bloat,
though not for the same reason as GP.
PGE bloat occurs because the extra
terms of the expression have little effect
on the fitness of the equation.
However, each node in the excess is
expanded upon, further exasperating the situation.



















































<div id="reproducibility"></div>
<a class="right" href="#top">top</a>

#### Reproducibility




By design, as an algorithm

Importance of Open Sourcing

Python & Scikit-Learn code







