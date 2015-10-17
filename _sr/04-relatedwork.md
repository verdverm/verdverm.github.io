---
layout: post
title: Related Work
brief: Standing on the shoulders of others
sections:
  - name: Fast Function eXtraction
    tag: ffx
    brief: The first deterministic algorithm
  - name: Memoization
    tag: memoization
    brief: Recalling overlapping sub-problems
  - name: Graph Algorithms
    tag: graph
    brief: Graph techniques related to PGE
  - name: Data Processing
    tag: data
    brief: Preprocessing, feature selection, sampling
---




<div id="ffx"></div>
<a class="right" href="#top">top</a>

### Fast Function eXtraction



Fast Function eXtraction (FFX)~\cite{McConaghy:2011:FFX}
is a recently purposed SR implementation 
which does not use genetic operators or
a tree based representation.
Instead, FFX uses a Generalized Linear Model (GLM) of the form:
\begin{equation*} 
\vspace*{-.1in}
\label{eqn:linear}
    y = F(\vec{x},\vec{w}) = \sum \limits_b^B w_b f_b(\vec{x}) 
% \vspace*{-.1in}
\end{equation*}
FFX learns a linear combination of
$b$ basis functions, from $1 \rightarrow B$, 
by applying pathwise regularized learning.
Basis functions are incrementally included and fit until
the number of functional bases equals the desired model complexity.
The GLM is linear in coefficients, w.r.t. the terms of the summation,
though trigonometric, logarithmic, and other non-linear functions are permitted. 
FFX is deterministic, 
making no use of random number generation
and is also computationally efficient.
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


\subsection{Representation}
\subsection{The Algorithm}
\subsection{Results}
\subsection{Limitations}
\subsection{Usecases}





<div id="memoization"></div>
<a class="right" href="#top">top</a>

### Memoization


\subsection{Prefix String Matching}
\subsection{Postfix String Matching}






<div id="graph"></div>
<a class="right" href="#top">top</a>

### Graph Algorithms







<div id="data"></div>
<a class="right" href="#top">top</a>

### Data Processing




\subsection{Noise Reductions}
\subsection{Feature Selection}




