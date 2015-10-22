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

#### Fast Function eXtraction
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



#### Support Vector Regression


#### Linear / Nonlinear Regression



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




