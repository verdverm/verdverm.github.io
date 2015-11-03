---
layout: sr
title: Enhancing PGE
brief: Overcoming limitations in the original formulation
prev: 04-pge
next: 06-experiments
nextname: Experiments
sections:
  - name: Algorithm
    tag: algorithm
    brief: Improving the components and progressive evaluation
  - name: Memoization
    tag: memoization
    brief: Adding abstractions and relationships
  - name: Searching
    tag: searching
    brief: Viewing the search as a graph problem
  - name: Decoupling
    tag: decoupling
    brief: Separating into services and independent scaling
  - name: Remaining limitations
    tag: limitations
    brief: 
  - name: Reproducibility
    tag: reproducibility
    brief:
---




<div id="algorithm"></div>
<a class="right" href="#top">top</a>

#### Algorithm





This section describes our alterations
to the original PGE algorithm.
The first alteration involves
extending PGE to search for
differential equation and does not change
the control-flow of PGE.
The second alteration incorporates
multiple priority queues into
the main search loop
and does require modifications to
the control-flow of PGE.
In all of our modifications,
we preserve the spirit
of deterministic execution
of the original PGE algorithm.


\subsection{Representation}


\subsubsection{Equation Types}


\subsubsection{Differential Equations}

Differential equations are a mathematical model
which describe the time-derivative of
a state variable as a function of its current state.
When several state variables are measured and
used as features in the input vector,
a dynamical system can be used to describe the system.
A dynamical system is a set of ODE's,
one for each state variable,
possibly using any or all of the input features.
Dynamical systems are deterministic models
which describe the relationships between the features.
Once found for a real-world system,
dynamical systems can be used to predict behavior of the system
or examine it under different conditions.
Applications of ODE's and dynamical systems
is pervasive throughout science.
With the growth of data-driven science,
PGE can be a tool for reverse-engineering
ODE's from todays massive and complex data sets.
We begin our modifications to PGE by
enabling it to uncover differential equations.
This is a simple task,
only requiring the time-derivatives of the
data to be numerically calculated at initialization
and
a new evaluation method to be written to handle the derivative data.

With dynamical systems,
Runge-Kutta-4 numerical integration
is used to simulate the system and produce a trace
from a given set of initial conditions.
This requires all equations to be present
and all points to be evaluated four times,
an expensive proposition.
We draw on two works which address these limitations.
In~\cite{hod:07:pnas},
partitioned evaluation is used to
search for a single equation,
allowing all equations to be searched in parallel.
In partitioned evaluation,
the measured values for the missing equations
is substituted into the RK4 integration
and only the equation being evaluated
needs to be integrated.
In~\cite{hod:08:mining},
numerical derivatives are calculated for the input features
and equations can be optimized for the time-derivative value.
This has several benefits \ken{Garbled.}
First,
point evaluations by four because the equation can be explicitly evaluated on the time-derivative.
Second,
because point evaluation is explicit and no longer integration,
the point evaluations are independent,
allowing them chosen without concern for order or position.
It also means we can get a good estimate of fitness
by selecting just a few points from critical areas
of the input feature time-series.
Third,
evaluating on the time-derivatives
produces simpler equations during the search process
due to the lower-level of comparison being made
and that the effect of small perturbations in the equation
have more significant effects on the output.
(Usually the time-derivative is on a much smaller scale than the state value,
It's certainly more sensative to minor changes)






\subsection{Series of Heaps}
\label{section:heaps}




Arguably, the most resource intensive
phase of both GP and PGE is the evaluation phase.
Extensive work has been done in both
making this phase parallel and distributed.
Another useful idea is evaluating models
on a subset of the data. This method has
been shown to provide good estimates
with as few as just 8 data points~\cite{hod:08:coevo_fp}

We use the idea of subsampling and
introduce an extra stage of processing,
which we call \textit{peeked evaluation}.
Peeked evaluation is used to provide
a quick estimate of fitness from
a small number of training points.
First, the training data is uniformly sampled
to produce a much small data set.
More sophisticated methods could be
used and interesting research questions
lie in selection and predictiveness
of sampling techniques.
These questions, however,
are beyond the scope of this work.

With peeked evaluation, each equation can now
exist in five states (in order):
discovered,
estimated,
fully fit,
expanded,
scored on test data.
The first two states do not
require a priority queue, as
an equation is estimated when it is discovered
and scored when it has been completely processed.
The middle three states have a
priority queue between them,
and with the respective phases,
form a cyclic relationship
depicted in Figure \ref{figure:cyclic}.
An equation flows through this
cycle by being popped from a queue
to proceed to the next stage,
and is as follows.
First, a model results from
the expansion of another equation.
If it's unique, then
it gets Peek evaluated and pushed into the FitQueue,
otherwise it's discarded.
Next, it gets popped from the FitQueue,
undergoes full Fit before
being pushed into the ExpandQueue.
If the model is of sufficient
accuracy, it will eventually
be popped from the ExpandQueue,
Scored on the testing data,
and be used to create new models,
which are then checked for uniqueness
and Peek evaluated,
thus closing the loop.


The main loop itself,
is constructed as a
sequence pop-process-push sequence
for each stage operate in sequence themselves.
The main loop starts by popping
estimated models from the FitQueue,
fully Fits them, and pushes them
into the ExpandQueue.
Next the ExpandQueue is popped,
the outgoing models scored,
then used to create new models.
These new models are checked for
uniqueness, estimated, and
pushed into the FitQueue.
In this way, a single model can flow
through all three tiers of evaluation
in a single iteration.

always maintain deterministic execution


\begin{figure}[t!]
% \vspace*{-.3in}
\caption{PGE Sequential Loop with Multiple Heaps}
\lstset{label=pgeloop1}
\begin{lstlisting}
for each iteration:
    peeks := PeekHeap.Pop(4*P)
    fullfitEvaluate(peeks)
    FullfitHeap.Push(peeks)

    ffits := FullfitHeap.Pop(2*P)
    scoreEvaluate(ffits)
    ScoreHeap.Push(ffits)

    to_expand := ScoreHeap.Pop(P)
    expanded := expand(to_expand)
    unique := memoize(expanded)
    peekEvaluate(unique)
    PeekHeap.Push(unique)
\end{lstlisting}
\vspace*{-.3in}
\end{figure}

% \begin{figure}[t!]
% % \vspace*{-.3in}
% \caption{PGE Concurrent Loop with Multiple Heaps}
% \lstset{label=pgeloop2}
% \begin{lstlisting}
% for each iteration:
%   run in parallel:
%   1)  peeks := PeekHeap.Pop(4*P)
%       fullfitEvaluate(peeks)

%   2)  ffits := FullfitHeap.Pop(2*P)
%       scoreEvaluate(ffits)

%   3)  to_expand := ScoreHeap.Pop(P)
%       expanded := expand(to_expand)
%       unique := memoize(expanded)
%       peekEvaluate(unique)

%   sync point:
%     FullfitHeap.Push(peeks)
%     ScoreHeap.Push(ffits)
%     PeekHeap.Push(unique)
% \end{lstlisting}
% \vspace*{-.3in}
% \end{figure}





\subsection{Feature Selection}

Pre-selection

post-selection

online


\subsection{Evaluation}

\subsubsection{Multiple Experiments}

2 methods
 - one sr with extra features
 - two sr, requires more experimental data?


System Parameters

Equations generalize better



\subsubsection{Other Metrics}

Info Gain

More from Search Improvements






\subsection{Optimization}


Variations on the PGE algorithm
can be created by altering how initialize PGE
and step through the grammar via its production rules.
We can seed PGE with a richer set of basis function,
and even allow complete sub-trees to become building blocks.
Further, by enriching the production rules applied at each node,
we can enlarge the set of equations generated at each point in the search space.

\subsubsection{Generating Functions}
\label{subsec-pge-vari-genfuncs}

The basic PGE method restricts the grammar 
by removing productions which result in
non-distributed expressions like $ax*(b+cx*(d+x^2))$.
The second method adds back the previously mentioned restriction.
A third method is FFX inspired,
but runs reverse to FFX.
A series of univariate bases are created
and then grown into a summation of multiplications
by adding and widening terms.


We can seed PGE with a richer set of basis function,
such as those used in FFX. We also believe that
PGE may be able to run the FFX process in reverse,
growing the linear combination as opposed to pruning it.

The building blocks in PGE define the scope of the search space.
The more we have the larger the space and the faster it grows.
We can provide different sets of building blocks,
to the PGE algorithm, performing a search for each set.
When all searches have finished, we can
combine the searches to give a richer set of results.

By removing the restrictions from the current method,
we can increase the number of equations derivable from a given expression.
This is done by enriching the production rules applied at each node,
which will in turn enrich the set of equations generated.
This will result in duplication through
the representation of on equation in different forms.
These representations are not equivalent through
our current rewrite rules.

All of these methods will determine
how much of, and how deep into, the
space of equations PGE will search.
As with the equations themselves,
there is a trade-off between
space and complexity which
is often difficult to balance.

% basic: described in chapter 4\\
% method2: implements deeper expansions, creating multiple forms of same equation,
% but allows terminals to be replaced with more complex expressions\\
% method3: FFXish, create univariate bases (...) and use addTerm, widenTerm to create linear combos of


% \tony{psuedocode for variations}

\subsubsection{Parallel and Tiered PGE}

Drawing on the ideas of the island model,
we can run multiple PGE searches in parallel.
For GP it's multiple copies
of the same search, 
sharing information by migration.
In PGE we use different searches
with different parameters and productions.
Our implementation doesn't share information yet,
but it is easily incorporated by
checking incoming migrants with IPT.
Those that are unique would get pushed into the PPQ.

Another variation on the parallel theme is
to spread one search process across multiple
computation units, distributing work.
This would operate the same as a non-parallel
implementation, but just faster.

A different variation on the parallel implementation
is to have a tiered PGE.
The first level would use
the simplest basis functions and production rules.
The first tier could have a restricted
operator set, such as removing non-linear functions,
and a reduced variable set with feature selection \cite{steve:12:thesis}.
Progressive tiers can increase
the number of operators, variables, and
the complexity of the generating functions.
This would allow PGE to search deeply
into the simpler spaces and exploit
this information with increasingly complex processing.






























<div id="memoization"></div>
<a class="right" href="#top">top</a>

#### Memoization


\subsection{More Abstract Memoization}





**Equation Relationships**

<div class="center-align">
<span><b>Figure #</b> - The Search Space Graph</span>
<img class="responsive-img" src="/sr/img/PGE_Search_Space_Graph.png" />
</div>


deeper equation abstractions,
richer relationships,
and a persistent formula library.






\subsection{Persistant Library}






























<div id="searching"></div>
<a class="right" href="#top">top</a>

#### Searching




\subsection{The Search Space Graph}

\subsection{Node Centric Searching}

focus is on models and reducing error

\subsection{Edge Centric Searching}

focus is on relationships and improving information gain






























<div id="decoupling"></div>
<a class="right" href="#top">top</a>

### Decoupling

In order to address todays
challenging big data problems,
PGE needs to be scaled to the cloud.
This section describes how
PGE can be decoupled into a set of services.
We decoupled the PGE algorithm
into three services:
algebraic manipulations,
model evaluation,
and the search loop.
These three services were
initially chosen
because they constituted the
majority of the runtime.
We believe it also possible
to decouple the expansion and
memoization functionality into
their own services.


\begin{figure}[h!]
\caption{Diagram of cPGE Phases and Flow}
\label{fig:diagram}
\center
\includegraphics[scale=0.4, clip=true, trim=0 350 0 0]{imgs/diagram.pdf}
% \includegraphics[scale=0.5, clip=true, trim=20 20 20 165]{imgs/diffeq_time_compare.pdf}
% \vspace*{-.15in}
\end{figure}



The algebra and evaluation service functionality
are presented as JSON APIs.

The algebra service is independent and does not
depend on the other two services.
The evaluation service depends upon
the algebra service for calculating
the analytical jacobian of a model
w.r.t. the parameters.
The search service depends upon both
the algebra and evaluation service.

Each search service has its own set
of evaluation service instances.
The algebra services are more flexible,
as they are independent.
Several variations we explore are:
1) each service instance having its own dedicated
algebra instance (additionally the search process
can have multiple instances)
2) a search instance and its evaluator instances
can share a pool of algebra services
3) multiple PGE search processes can
share a larger pool of algebra service instances.
We explore the trade-offs and appropriate situations
for each case in the evaluation phase.
The best setups are tied to both the problem at
hand and the current implementation.

Runtime profiling shows that the Python interpreter
and the use of the 'eval' function from within Sympy
are a performance bottleneck. Rewriting this service
with a more efficient implementation will require
a reorganization and restructuring of the service
redundancy and sharing. The decoupling of the
PGE search into several services allows

Our preliminary experiences in decoupling allowed us
to reduce the original count of algebra service instances after converting messages to use
the serialization of a model, as opposed to
the human readable versions of the model.
This was most likely the result of removing
the string processing necessary in tokenization and parsing into the syntax tree. The integer serialization maintains the syntactic information of the model.


\subsection{Representation Service}

The original PGE algorithm
internally implemented
basic algebra operations to
collect terms and perform
simple rewrites.
While decoupling this service,
we opted to replace the internal algorithms
with a third-party library.
We chose Sympy for algebraic manipulations
as it offers more mature
and well tested set of functionalities.

We present the algebra service as a JSON API
to

Became the most expensive phase of
the modified PGE algorithm.

Initially we used the string representation
of an equation when sending messages between services.
To alleviate some of the overhead
we converted to using the same
integer serialization as is used in the
memoization process.


\subsection{Evaluation Service}

As evaluation is the most resource
intensive part of the search,
this was the first natural choice
to decouple. Each PGE search
will require several evaluator instances
and so we chose to have them only
concerned with a single data set
at a time.

PGE uses a third-party library, Levmar,
to perform non-linear fitting
of a model's parameters.
PGE uses the analytical jacobian
fitting function and thus requires
the jacobian, w.r.t. the parameters,
to be calculated.
The evaluator service calls upon
the algebra service to perform this
operation on its behalf.
Since both the subset and fullfit
evaluation phases make use of
the non-linear regression,
they thus both require the jacobian
to be available.



Each evaluation service instance
is first sent the necessary information
for setup, including the parameters
and the dataset to be used for evaluation.
They then sit in an event loop waiting for
a request to evaluate a model.

Peek evaluation makes a call to the algebra
service to calculate the analytical jacobian
and then uses Levmar to non-linearly
regress the parameters to the model
on a very small sampling of the data.

Fullfit evaluation uses the evaluator services
model cache to avoid a second, unnecessary
call to the algebra service.
Fullfit uses the entire training data
to regress the parameters to the equation.

Scoring evaluation calculates the models
fitness on an independent testing set.



\subsection{Memoization Service}


Per instance 

and

Persistant Library






\subsection{Search Service}

The search loop exists
as its own service and is the main
control-flow structure.


During each iteration, PGE delegates
to the appropriate services
for algebraic simplifications
and the 3 evaluations tiers.












<div id="limitations"></div>
<a class="right" href="#top">top</a>

#### Remaining limitations








<div id="reproducibility"></div>
<a class="right" href="#top">top</a>

#### Reproducibility





Still, even when distributed, enhanced

numerical issues


