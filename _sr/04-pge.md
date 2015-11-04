---
layout: sr
title: Prioritized Grammar Enumeration
brief: Deterministic, reproducible, and reliable Symbolic Regression
prev: 03-relatedwork
next: 05-enhancements
nextname: Enhancing PGE
sections:
  - name: Theory
    tag: theory
    brief: Rethinking the Symbolic Regression problem.
  - name: Components
    tag: components
    brief: Representation, evaluation, optimization, memoization
  - name: Searching
    tag: searching
    brief: Directing, prioritization, reducing waste
  - name: Limitations
    tag: limitations
    brief: Exponential and combinatorial problems and sub-tasks. 
  - name: Reproducibility
    tag: reproducibility
    brief: And the importance in Symbolic Regression tech
  - name: Relation to GP
    tag: relation
    brief: Concept relations for those familiar with GP
---





Prioritized Grammar Enumeration (PGE) is a
deterministic and highly efficient algorithm for 
Symbolic Regression (SR). 
It answers the question, how would you solve SR
without using random number generators?
This requirement forced us to rethink 
the fundamental approach to SR.
PGE is the result of this process.
To our knowledge, 
PGE is the first SR implementation that is both
deterministic and tree-based.
PGE's unique perspective on SR
brings the problem structure to the forefront.
At the same time, it
enables vast reductions in effort
and opens the door to
advanced analyses not
possible with other methods.
PGE also offers consistency,
capability, and reliability 
not available with other methods.
We believe PGE is the forefront
of SR technology.


 

#### An Overview

Prioritized Grammar Enumeration (PGE) is a
deterministic algorithm for SR.
PGE solves the SR problem 
from a language point of view, 
to prioritize the enumeration of expressions in that grammar.
By recognizing the structure of the search space,
PGE turns the SR problem into a graph traversal problem.
PGE also recognizes multiplicity of points in
in the search tree and overlaps them, resulting in the search graph.
PGE uses dynamic programming techniques that memoizes previous results
and prevent the compounding duplication of effort.

PGE further shrinks the search space by
reducing models to a canonical form
with the rules of algebra and simplification.
Recursion and generating functions are applied
to produce new forms from the current model.
By placing valueless parameters, 
which are later determined with non-linear regression,
PGE additionally separates the search for model form
from the optimization of any given form.


PGE takes reductionism one step further,
fully optimizing an equation in the search space
the first time it is encountered
and remembering which equations
it has discovered thus far.

Partial ordering, coupled with 
the trie representation and simplifications,
yields many-fold reductions of the search space.
Invalid and ineffectual expressions are removed,
variations of associative forms are limited,
and isomorphs are combined,
shrinking the number of representable equations 
that need to be explored by a SR implementation.

To consolidate this space, PGE
imposes operator restrictions,
simplifies equations,
and partially orders sub-expressions.
When combined, these methods 
only allow syntactically valid equations to be considered,
merge isomorphic equations into a canonical form,
reduce the overall size of the search space,
and create a structural ordering to the search space.

The third observation PGE makes
is that the search for an equations form,
its structural configuration,
can be separated for the optimization
of that form's parameters.
















<br>

<div id="theory">
<a class="right" href="#top">top</a>
</div>
  

### Theory

1. **Removing Non-determinism** - Creation of a completely reproducible SR algorithm.
1. **Search Space Organization** - Understanding and designing the structure of the search space.
1. **Evaluating Forms Once** - Designing the model for detection and avoidance of overlapping subproblems.


PGE was born from the process of removing
random number generators from GP.
This required methods for 
selection, survival, and replication
to all be replaced. 
The replacement process
brought to light several issues
which have not been addressed
by the GP community.

The theory underlying PGE
is based on intuitive principles.
First, take into account the rules from algebra, 
to reduce model multiplicity into a canonical form,
thereby reducing search space complexity.
Second, design models so that they
are only handled once. This requires that
they are also designed with dynamic programming
techniques in mind.
Third, remove all sources of non-determinism
to create a completely reproducible algorithm. 
This also simplifies development and debugging
of the software which implements the algorithm.



#### Removing Non-determinism

Removing sources of non-determinism 
was a central theme to the development of PGE.
The aim was to produce an algorithm
which would give the same results with each invocation.
The reason for this goal was the 
detrimental effects non-determinism has
on search algorithms. We believe
it to be an inherent and unavoidable
difficulty present in the GP algorithm.
You can find details on GP in [Chapter 7](/sr/07-gp)

To achieve deterministic behavior, 
PGE makes no use of random number generation.
It performs the exact same algorithmic steps
given the same parameters and same training data.
This requires several aspects of the PGE algorithm
to be defined deterministically.

**Initialization** establishes the starting points
from which PGE searches. Determinism starts here
by constructing a set of basis functions
from the input variables. 

**Prioritization** determines which points 
in the space to search next. This process
uses a priority queue coupled with a
Pareto non-dominated sorting algorithm.

**Exploration** discovers new models by
making small changes to a given model.
To maintain determinism, PGE makes 
all possible changes to a model,
given the particular exploration scheme in use.

**Communication** occurs when PGE uses
parallel execution. In order to maintain
deterministic behavior, well defined
synchronization points are used.


Details of each aspect will be expanded upon
in the upcoming sections and next chapter.




#### Search Space Organization

The size of the space defined by a grammar
is infinite, even when disregarding the 
increase brought by considering real valued coefficients.
The main contributions are combinatorial components
at both the search space and model levels of the problem.
PGE's great efficiency gains are the result
of methods designed to combat the combinatorial components.
We begin at the model level, where the main tool
is the trie based representation.
It is dynamic programming which comes to the rescue
at the search space level.


**Tree Representation Combinatorics**

PGE primarily uses the trie based representation
for the models, as detailed in the last chapter.
The reason for this is the combinatorial
number of different binary tree representations
for the equivalent model.
These different representations arise
from permutations of the leaf nodes
and from variations in the tree structure.
Consider the equation `a•b•c` (Figure 4-1). 

<div class="center-align">
<span><b>Figure 4-1</b> - Combinatorics of the Tree</span>
<img class="responsive-img" src="/sr/img/eqn-combis.png" />
</div>

This equation has 12 different binary tree representations,
from six leaf permutations and two shape permutations.
If we account for both addition and multiplication,
the number of trees grows to 48.
As you can imagine, with 
increasing numbers of operations and operands, 
the tree complexity and this number
undergoes a combinatorial explosion.

The advantage of the trie based model
is the ability to take advantage of the
commutative and associative properties
of addition and multiplication.
Because of these properties,
we are free to order the operands,
sub-trees in the model trie, as we choose.

Commutativity is the ability to rearrange parentheses
and is associated with the multiple tree representations
for the same expression. By using the trie,
we flatten a binary tree and metaphorically 
erase the parentheses from the expression.

Associativity means that we can sort 
the operands to addition and multiplication.
By sorting them, we create a consistent ordering
which can be treated as the canonical form for a model.
In doing so, we remove the combinatorial element
associated with the permutation of leaf nodes.
Sorting is possible by 
creating a ordering on node types.
This is easily achievable by assigning
an integer to each node type.

By turning binary trees into tries
and by sorting the tries,
each model can have a canonical form.
Figure 4-1, right column, shows 
the canonical form of `a•b•c`. 
After applying the reductions,
the original 48 models is now just 4.
This savings created by sorting 
become even more important as equations
become more complex.


**Algebraic simplifications**

There are other sub-expressions which arise
that we would also like to remove and reduce.

Simplifications group like terms together ($$x+x$$), 
replace sub-expressions which evaluate 
to a constant value ($$\sin\pi$$, $$\frac{x}{x}$$, or $$x-x$$),
and reduce unnecessarily complex expressions such as $$\frac{1}{\frac{1}{x}}$$.
The resulting equations are equivalent,
simpler forms.


There is debate as to how
simplification effects the SR process 
[ [kinzett:2008:using](), [kinzett:2009:online](), [mcree:2010:symbolic]() ].
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

PGE uses the simplification techniques
which are present in the SymPy Python library.
This and further implementation details
can be found in [Appendix-A1](/sr/A1-pypge).






#### Evaluating Forms Once

At its core, PGE is a dynamic programming algorithm
which aims to evaluate each sub-problem once.

<blockquote>
A dynamic-programming algorithm solves each subsubproblem
just once and then saves its answer in a table, 
thereby avoiding the work of recomputing the answer 
every time it solves each subsubproblem.
<br><span class="right">~ Cormen:2009:algorithms</span>
</blockquote>

<br>

In PGE and SR, a sub-problem is a specific form, 
namely the parse tree for an equation and its terminals.
Recall that PGE uses placeholders
for the parameters, so an equation form accounts
for the existence of a parameter
without knowing its value.


The key to evaluating forms once
is to fully optimize a form the first time it is seen
and to remember the forms which have already been explored.
PGE fully optimizes forms by fitting the
valueless parameters with non-linear regression,
thus assigning it a value.
In order to memoize the equation forms,
they are converted to a linear representation
and then recorded in a lookup structure
called the Integer Prefix Trie.
This is possible because 
each equation has a canonical form
which is unique.



**Non-linear Regression** is not unique to PGE, or GP for that matter,
but it is a central component of PGE's
ability to evaluate an equation form once.
As PGE encounters new equation forms,
it fits the abstract parameters using non-linear regression,
resulting in the 'best' version of that form on the training data.
PGE uses the
Levenberg-Marquardt (LM) optimization algorithm [CITE]()
to fully fit an equation to a set of data.
In cases were an equation is linear w.r.t.
the parameters, the LM algorithm library
returns in one iteration by using
singular value decomposition (SVD).

PGE's treatment of parameters
and use of non-linear regression 
enables the separation of search for equation form,
from optimization of a form's parameters.
In this way, the search for form,
and the optimization of coefficients
are split into separate tasks.

This separation has a profound
implications on the efficiency and effectiveness of PGE.
It enables an equation form
to be fully evaluated once,
removing duplication of effort that GP experiences
when using genetic operators to 
optimize the coefficients of an equation form.
Some GP implementations have
incorporated the use of regression
for fitting coefficients.
However, they make no use of memoization,
and therefore still suffer from duplication of effort
which results from multiple copies of the same equation.



**Memoization**



Canonical forms for equations 
reduced one source of combinatorics in the SR problem.
A second source is from multiple derivations.
That is multiple paths over the graph which
reach the same node. Below is a diagram
which demonstrates this.

<div class="center-align">
<span><b>Figure #</b> - Multiple Derivations</span>
<img class="responsive-img" src="/sr/img/a_b_c.png" />
</div>

In this diagram, we start with models
which consist of a single variable.
Now we could take each of these models
and add a different variable to it.
Consider though that we could 
start with $$x$$ and add $$y$$
or
start with $$y$$ and then add $$x$$,
both arriving at the canonical for $$ x+y $$.
Repeat this process, adding a third variable,
and we have six paths to the model $$ x+y+z $$.

It is important that we detect this situation,
by determining that each of the six $$ x+y+z $$
are really the same model.
If we do not detect the separate models as one,
would would end up repeating a lot of work.
This repetition would become a combinatorial
explosion of exponential proportions.

PGE uses dynamic programming techniques
to detect multiple derivations and
consider an equation form only once.
This feature of PGE is enabled by 
the Integer Prefix Trie and
an integer linear representation
for the equation models.
The next section will fill in the details
of both representation and memoization.
































<br>

<div id="components">
<a class="right" href="#top">top</a>
</div>
  
### Components

1. **Representation** - Trie and linear representations with valueless parameters
1. **Evaluation** - Nonlinear regression for parameters, fitness metric for models
1. **Optimization** - Exploration, prioritization, and regularization
1. **Memoization** - Detecting overlapping subproblems to avoid duplicate work


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



#### Representation

PGE uses multiple representations for an equation.
The syntax trie is used for optimization.
The integer sequence is used for memoization.


**Syntax Trie**

PGE uses trees, 
where operands can have a variable number of children.
In the n-ary tree representation,
the associative operators can have n sub-trees,
flattening and reducing the tree's size.
This is a slight modification from the usual binary tree;
only affecting the associative operators addition and multiplication.
The n-ary tree does not change the 
modeling ability of the equation,
but will effect the
trade-off between parsimony and accuracy.
This in turn effects 
the selection operation of any SR implementation,
though we do not investigate this issue here.

In addition to the reductions in parse tree size, 
the n-ary representation eases the 
design of sorting and simplification algorithms.
These algorithms, detailed next,
work within the parse tree
to reshape equivalent trees into a canonical form.
This effectively merges isomorphic equations,
reducing the size of the search space,
while simultaneously adding structure
to the search space.


**Linear integer sequence** is 
the prefix notation representation
of an equation, mapped to the integers.
It is equivalent to the trie representation
with one-to-one correspondence.
The linear integer sequence is obtained by
mapping each node type to a different integer
and the performing a pre-order traversal
of the trie, collecting the integers
by appending them to a list.

The usefulness of this representation
is for efficiency in implementation.
Integers can be used for constant time
lookups, where otherwise we may have been
limited to a higher complexity operation.
The linear representation is mainly used
in conjunction with the Integer Prefix Trie (IPT)
during the memoization process.
The IPT is an efficient data structure
for recording and looking up equations
and will be detailed shortly.

Additionally, the linear representation 
can be used for interprocess and network
communication. It's main benefit there
is on the receiving side, where
we can avoid the complexity of parsing
the human readable version of an equation.


**Abstract parameters** are the valueless
placeholders used as coefficients
in equations. They signify that a parameter
is present and where in an equation it occurs.
The benefit of abstract parameters is two-fold.
First, equation form matching and memoization
can happen without regard to their value.
Second, they enable the optimization
of the parameters to be performed
in a separate process, via non-linear regression.
This is the key to separating
the optimization of a given form,
from the optimization which occurs
at the global scale, in the space of all equations.






#### Evaluation


**Non-linear parameter fitting**
though not unique to PGE, or GP for that matter,
is a central component to the PGE algorithm.
It enables the separation of search for form 
and optimization of that form's parameters.
Great gains in efficacy are realized by
separating the search for equation form,
from the optimization of parameters.

PGE achieves this separation by
using abstract parameters.
Parameters are indexed into an array, 
which means they do not store their value internally.
The indexed parameters contribute only to form,
taking on value only after non-linear fitting.
Handling parameters in this manner 
is analogous to the way variables are treated,
which only contribute to fitness during evaluation.



**Fitness metrics** are composite metrics
which combine a notion of accuracy and complexity.
They are used to compare the relative
fitness between two models or equations.
They are the multi-objective value
which SR implementations seek to optimize.
The most common fitness metric is to
use the tree size and the mean squared error.
Many values for accuracy and complexity
may be used, and more than one may be used.
Additionally, the values in the fitness metric
may be weighted to give preference.
Another useful practice is to normalize
the values used in the fitness metric,
across the set, before sorting
into successive non-dominated sets.
The Pareto non-dominated sorting methods,
described in the previous chapter,
use fitness metrics to determine
the successive non-dominated sets of equations.








#### Optimization


SR is a multi-objective optimization task
seeks to maximize accuracy
while minimizing complexity.


PGE uses a priority queue to express
which points in the search space
to expand next. 
By incorporating the Pareto non-dominated sort
into a priority queue,
the PGE search 
can exploit and optimize 
the trade-off between competing objectives
in a deterministic order.


**Exploration Operators** are
the means by which PGE searches
the space of all equations.
Each exploration operator is a policy
for how to expand and modify
an equation's parse tree to obtain 
functions 'close' to the current one.

<div class="center-align"><b>Figure #</b>: PGE Exporation Functions</div>

{% highlight Python linenos %}

def Grow(model):
    add_expands = add_extend(model)
    mul_expands = mul_extend(model)
    var_expands = var_substitution(model)

    return var_expands + add_expands + mul_expands


def add_extend(model):
  // E -> E + c*L
  // E -> E + c*N(L)

def mul_extend(model):
  // T -> T * L
  // T -> T * N(L)
  // T -> T / L
  // T -> T / N(L)

def var_substitution(model):
  // N -> ( N + c*L )
  // N -> ( N + c*N(L) )
  // N -> ( (c*L) / N )
  // N -> ( N / (c*L) )

{% endhighlight %}





PGE uses the grammar's production rules 
expand previously encountered equations.
New equations are produced by applying
the function *Grow*, from Listing \ref{expand},
while recursing over the parse tree.

The *Grow* function determines the
current node's type and applies the appropriate
production function. 
Each production function corresponds to
one or more of the grammar's production rules. 
\textit{AddTerm} increases
the number of terms in a summation, such as
$$aX + bY \Rightarrow aX + bY + cZ$$. 
\textit{WidenTerm} increases
the number of terms in a product, such as
$$aXY^2 \Rightarrow aX^2Y^2$$ or $$aXY^2 \Rightarrow aXY^2Z$$.
\textit{DeepenTerm} increases
the complexity of a term, such as
$$aXY \Rightarrow a(X+bZ)Y$$ or $$aSin(X) \Rightarrow aSin(X+Y)$$.


The generating functions define
the set of reachable expression
in conjunction with the supplied building blocks 
(terminals and non-terminals of the grammar).
However, generating functions do not determine
the order in which the space is searched.
This is the role of the PPQ 
(section \ref{sec-pge-ppq}),
which prioritizes the areas to explore next.



**Prioritization Strategies**

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


**Regularization** is the process of
introducing a penalty for complexity
in order to avoid overfitting.
In PGE and GP, this is an implicit process
which is part of the Pareto non-dominated sort.
PGE uses the PPQ and a pop count to
control the amount of regularization.

During processing, we remove the top 
*p* equations (3 in our experiments)
when selecting the next areas to search.
By doing so, we select the $p$ smallest 
equations from the first Pareto frontier.
This gives variation across the trade-offs
for the equations to be expanded,
and thus variation in the search direction too.
If we only remove one equation,
the smallest equations would be replaced
from the next front and the search
would progress through equation space by size.
If we remove too many,
then PGE starts to produce
complex and over fit models.









#### Memoization

**Detect overlapping subproblems**
is the key to the dynamic programming approach taken by PGE.
In PGE, a sub-problem is equivalent 
to a particular equation form.
Sub-problems are encountered
when an equation has
several derivations,
or paths over the search graph
which reach the same node.
This means there are multiple 
orderings of the production rules which
result in the same equation
and that each equation may
appear in more than one form,
as several equivalent points 
within a grammar's representable space.


The memoization of form allows PGE 
to consider a form just once.
PGE matches equations by comparing 
the serialized representation of the equations.
Serialization transforms an equation into a sequence of integers
by assigning a unique value to each node type.
The resulting integer sequence is equivalent
to the prefix notation of the equation.
Since each sequence represents a unique equation,
the parse tree is recoverable from the sequence.
Also, since PGE uses abstract coefficients,
they are all converted to the same value.
This means PGE only memoizes their existence and location.


**The Integer Prefix Tree** (IPT) is at the core 
of the PGE dynamic programming framework. 
The IPT detects overlapping subproblems
by comparing integer sequences,
the serialized representation of an equation.
Detecting overlapping subproblems
enables us to eliminate duplication of effort
in an exponentially growing search space.

The IPT was inspired by the 
suffix tree algorithm for string matching 
[[Weiner:1973:LPM](),
[Farach:1997:OST](),
[Skiena:1998:ADM]()].
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


PGE uses the IPT memoization tree defined in Listing \ref{pretree}.
The IPT is a recursive structure and insertion algorithm
which memoizes a sequence of integers.
The IPT is built up as new expressions are encountered.
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

The IPT also tracks the number of times
each node in the structure has been visited.
We keep counts for total visits 
and unique visits.
This allows us to do some accounting
of the number of unique equations
as well as how many times each
equation is produced by the generation functions.
There has been no previous research on the topic
of unique equations in relation to the
total number of equations created or evaluated.
We believe this to be due to the lack of 
a method for matching equations, which is 
due to the lack of canonical forms in the literature.
We use the IPT to compare
the efficiency of GP and PGE in section \ref{sec-results-efficient}.

The IPT is also the enabling structure
which conceptually turns the search space from
a tree into a graph by matching and memoizing
subproblems, or equations.
This greatly reduces the amount of work,
by eliminating duplication,
that the PGE must perform
while searching for ideal equations.
As mentioned earlier,
the search space is also reduced in size by
sorting equations into a canonical form and 
simplifying them by rewrite rules.


<div class="center-align"><b>Figure #</b>: Integer Prefix Tree</div>
{% highlight Python linenos %}

class Node:

  def __init__(self, key=0, value=None):
    self.map = {}  # int -> Node
    self.key = key
    self.value = value

  def insert(self,iis, value):
    if len(iis) > 1:
      ii = iis[0]
      if ii not in self.map:
        self.map[ii] = Node(key=ii)
      return self.map[ii].insert(iis[1:], value)

    if len(iis) == 1:
      ii = iis[0]
      if ii not in self.map:
        # print "  new node for key: ", ii
        self.map[ii] = Node(key=ii, value=value)
        return True
      else:
        return False

  def lookup(self,iis):
    if len(iis) > 1:
      ii = iis[0]
      if ii in self.map:
        return self.map[ii].lookup(iis[1:])
      else:
        return False, None

    if len(iis) == 1:
      ii = iis[0]
      if ii in self.map:
        return True, self.map[ii].get_value()
      else:
        return False, None


{% endhighlight %}




















<div id="searching">
<a class="right" href="#top">top</a>
</div>
  
### The Search Loop


Initially, PGE starts with 
a set of basis functions.
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



<div class="center-align">
<span><b>Figure #</b> - PGE Flow Diagram</span>
<img class="responsive-img" src="/sr/img/PGE_flow_diagram.png" />
</div>


PGE reverses a grammar's rules into productions
to expand simple basis functions 
into increasingly complex expressions. 
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


Use expansion operators to grow 
current best equations. One for
ADD,MUL and one for substitution.

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



Directing the Search
    Pareto Priority Queue (PPQ)
       -  Balance size and fitness
       -  Select from the frontier

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

<div class="center-align"><b>Figure #</b>: PGE Search Loop</div>
{% highlight python linenos %}

def loop(iterations):
  for I in range(iterations):
    popd = pop()

    # expand popd models, they are now fully processed
    expanded = expand(popd)

    # filter and memoize expanded models
    to_memo = filter(expanded)      
    to_eval = memoize(to_memo)

    # fit and evaluate these models
    eval(to_eval)

    # push fully fit models into the queue
    push(to_eval)

{% endhighlight %}


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







Prioritization Strategies
    Pareto Priority Queue
       -  L2-norm
       -  Information Gain
 
Reducing Waste
    Candidate equations are evaluated
    on all training data. Most are poor
    quality, thus wasting cycles.




Variations on the PGE algorithm
can be created by altering how initialize PGE
and step through the grammar via its production rules.
We can seed PGE with a richer set of basis function,
and even allow complete sub-trees to become building blocks.
Further, by enriching the production rules applied at each node,
we can enlarge the set of equations generated at each point in the search space.

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
















<div id="limitations">
<a class="right" href="#top">top</a>
</div>
  
### Limitations


Exponential to |{Features}|
    Recursive expansion function at all
    valid points creates a compounding
    growth in new candidates over time.
 
Parameter Optimization
    Non-linear regression is not
    guaranteed to find optimal solution.
    There are also questions as to where
    parameters should be included.
Bloat in PGE
    The exponential growth in candidates
    the offspring of good partial solutions
    to dominate the selection process.
 
Memoization & Relationships
    Memoization only matched entire
    equations. Relationships were not
    incorporated or used. Opportunity
    for caching algebraic manipulations.





PGE limitations and opportunities


Addressed

- all models are completely trained
  [expensive with large data sets]
  (pass through multiple heaps and increased data)
- custom algebra lacks features \& has errors
  (use a mature system SYMPY, and provide as a service)

Unaddressed

- ordering is arbitrary
- when / where to put coefficients
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





<div id="reproducibility">
<a class="right" href="#top">top</a>
</div>
  
### Reproducibility





By design, as an algorithm

Importance of Open Sourcing

Python & Scikit-Learn code













<div id="relation">
<a class="right" href="#top">top</a>
</div>
  
### Relation to Genetic Programming

Prioritized Enumeration is 
heavily influenced by GP.
It uses the same parse tree representation
for candidate equations.
PGE, however, differs in how it
evaluates, selects, and generates
new candidates from old ones.
This section is meant to help
those familiar with GP
to understand where and what
the analogous processes are.


**Parameters**


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


PGE is nearly a parameter free
algorithm, requiring only that
the building blocks, generating functions,
the value of $p$, and termination criteria
be established prior to
beginning an equation search.
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



**Evaluations**

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




**Selection**

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

The more equations we *peel* (remove)
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



**Population and Breeding**

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











