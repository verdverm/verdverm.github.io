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


This chapter describes our enhancements
to the original PGE algorithm.
After acheiving a proof-of-concept
the limitations of the original implementation
began to materialize.
As with many iterative processes,
each enhancement brought to light
a new limitation.
The enhancements described here
follow the sequence in which
they were implemented.
in order to relate
how solutions addressed one limitation
and the limitations that then came to light.







<br>

<div id="evaluation">
<a class="right" href="#top">top</a>
</div>

### Waterfall Evaluation

One of the issues in PGE is that 
a significant amount of effort
is spent evaluating models
which end up with poor fit.
A useful idea is to evaluate models
on a subset of the data. This method has
been shown to provide good estimates
with as few as just 8 data points
[ [hod:08:coevo_fp]() ].

We use this idea of subsampling and
introduce an extra stage of processing,
which we call *peeked evaluation*.
Peeked evaluation is used to provide
a quick estimate of fitness from
a small number of training points.
The training data is uniformly sampled
to the reduced data set.

With peeked evaluation, 
each equation must pass
through an additional priority queue.
The idea is to get a quick estimate
of accuracy, and then prioritize
full evaluation from these estimates.
The main reason for incorporating
peeked evaluation is to avoid
fully evaluating models which
will be poor candidates.
Only models which are fully fit
can be entered into the priority
queue for expansion candidacy.
In this way, there is an extra
barrier to poor models producing
more poor models.

Figure "peeked" below shows the
psuedo code with the additional
phases for evaluation and prioritization.


<div class="center-align"><b>Figure #</b>: PGE Peeked Flow</div>
{% highlight Python linenos %}

for each iteration:
    to_eval = FitQueue.Pop()
    fullfitEvaluate(to_eval)
    ExpandQueue.Push(to_eval)

    to_expand = ExpandQueue.Pop()
    expanded = expand(to_expand)
    unique = memoize(expanded)
    peekEvaluate(unique)
    FitQueue.Push(unique)
{% endhighlight %}



The loop is now composed of
two pop-process-push sequences.
At the begining of the iteration
all equations have already
been estimate under peeked evaluation.
The `FitQueue` then has several
models popped for full evaluation
and subsequent pushing into
the `ExpandQueue`.

Next the `ExpandQueue` is popped
to select models to serve
as the next expansion points.
The new models are checked for
uniqueness, estimated, and
pushed into the `FitQueue`.
Under this scheme, a single model can pass
through all phases
in a single iteration.









<br>

<div id="decoupling">
<a class="right" href="#top">top</a>
</div>

### Decoupling into Services

Evaluation is the most time consuming process
in any SR implementation, 
generally exceeding 90% of the total time.

The main reasons for this are:

1. Floating point calculations take longer
1. Implementations generate many candidate models
1. Volume of data for training is increasing
1. The other phases tend not to require much time

One of the nice properties of SR, and evaluation,
is that it has both data and functional parallelism.
As a result, research into 
parallel and distributed GP has been 
extensive and fruitful (see Chapter 3).

We follow suit with PGE by splitting the algorithm
into a set of services and deploying them to
cloud infrastucture. 
We decoupled the PGE algorithm
into three services:

1. Main Search Loop
1. Evaluation (for parallel benefits)
1. Algebra (for a mature CAS)

We elected for the additional algebra service 
so that a mature Computer Algebra System (CAS)
could be used. We chose SymPy because
it had the desired functionality
and was simple to integrate.
We believe it also possible
to decouple the expansion and
memoization functionality into
their own services.
This is however, beyound the scope of this work.
This enhancement was also made in conjunction
with the last enhancement, waterfall evaluation.


<div class="center-align">
<span><b>Figure #</b> - Decoupled PGE</span>
<img class="responsive-img" src="/sr/img/cPGE-diagram.png" />
</div>

#### The Three Services


**Algebra Service**

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

Initially we used the string representation
of an equation when sending messages between services.
To alleviate some of the overhead
we converted to using the same
integer serialization as is used in the
memoization process.



**Evaluation Service**

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



**Search Service**

The search loop exists
as its own service and is the main
control-flow structure.
It remains basically the same
as the original search loop.
The main difference is 
that function calls to the 
algebra and evalutation service
now require network activity.
During each iteration, PGE delegates
to the appropriate services
at the neccessary times.


**Service Interactions**

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

Our preliminary experiences in decoupling allowed us
to reduce the original count of algebra service instances after converting messages to use
the serialization of a model, as opposed to
the human readable versions of the model.
This was most likely the result of removing
the string processing necessary in tokenization and parsing into the syntax tree. 


























<br>

<div id="selection">
<a class="right" href="#top">top</a>
</div>

### Metrics, Fitness, and Selection

The original PGE algorithm used
tree size and an error metric
to calculate model fitness.
It then used a simple
Pareto sorting mechanism
to sort the population.
This section describes
enhancements we make 
to the metrics, 
fitness, and selection processes.


#### More metrics for models

Our experience showed that
modelling error was often 
insufficient for effectively
separating good models from the rest.
We add several additional metrics
for models which account for
quality while penalizing complexity.
This is separate from the
complexity and accuracy
tradeoff which happens
at the global level.
They do however have
a benefical influence
on the global selection and prioritization process.


**Penalized complexity** is a tree size 
calculation which adds a penalty to specific
types of nodes. In our experiments,
we applied it to function nodes
from the triganomic and logarithmic families.
The penalty accounts for
increased relative computational complexity
which we set at +2. The value, while effective,
deserves further investigation than we provide.


**R-squared** measures the goodness of fit
for a model and attempts to account for
the amount of variance explained.
Values range from zero to one
and can be interpreted as the percentage
of variance the model explains.
One issue with this metric
is that extra variables can be 
included to increase its value.
The adjusted R-squared addresses 
this by adding a penalty which 
increases with each extra variable
[[Taylor:1997:error](An_Introduction_To_Error_Analysis_The_Study_Of_Uncertainties_In_Physical_Measurements_Taylor_John)].


**reduced Chi-squared** also
measures the goodness of fit
for a model. It includes the
variance in the data and degrees of freedom.
This effectively normalizes the value
to the number of data points and model complexity
[ [Taylor:1997:error](An_Introduction_To_Error_Analysis_The_Study_Of_Uncertainties_In_Physical_Measurements_Taylor_John),
[Pearson:1900:chi](http://www.economics.soton.ac.uk/staff/aldrich/1900.pdf) ].


**AIC/BIC** measure the relative
quality of fit for models.
Akaike information criterion (AIC) and
Bayesian information criterion (BIC)
do not say anything about the absolute
quality of the model. Rather
they measure the relative quality
of models against eachother.
Both add a penalty term
based on the number of model parameters.
BIC penalizes complexity more and
is thus the more conservative metric
[ [Akaike:1974:aic](http://www.unt.edu/rss/class/Jon/MiscDocs/Akaike_1974.pdf),
[Schwarz:1978:bic](http://projecteuclid.org/euclid.aos/1176344136) ].



#### Improvement over parent
    
Improvement over the parent refers to
how much an accuracy or goodness of fit metric
changes in an offspring, relative to the parent.
We use a simple difference between the values,
making sure to account for whether the metric
is a minimizing or maximising one.

One interesting situation happens when
we find a new path to an existing model.
In this case, we can look to Dijkstra's algorithm
and *relax* to find a new relative improvement value.


#### Model Fitness

Model fitness is used to make relative comparisons
during the selection process. The fitness for an
individual model is usually a combination of 
complexity and accuracy in an attempt to regularize.

The original PGE algorithm used tree size
and model accuracy, as determined by an error metric,
as the components to the fitness metric.
It then used a the basic Pareto non-dominated sort
to prioritize the next models to be expanded.

In our enhancements, we made several changes
in how we used the metrics in fitness.
In addition to being able to use any
of the new metrics, we added the ability
to use multiple metrics at once, allowing
the number of components to grow beyond 
just one for size and one for accuracy.
We then added the ability to weight each 
component separately. This proved beneficial
as we discovered the best policy was to
weight the complexity measure so that it 
was equal to multiple accuracy metrics.
We also found that competing certain metrics
was beneficial, such as minimizing BIC
while maximizing the improvement of BIC.

One of the more significant changes we made
was to normalize each of the values
across the set of models.
For each metric being used,
we normalized across the models,
and then used the new value
as the component to the fitness for the model.
This removed the effect of scale
of values on the relative comparisons
made during selection.
With out normalization,
one of the components can easily dominate 
the solution. Additionally,
the dominating component often
changed as the search progressed.
In example, as error tends towards zero
the size becomes the dominate factor,
and distinguishing between models on
error gets more difficult for the algorithm.


#### Density based Pareto methods

The orginial PGE algorithm used
a simlistic Pareto sorting algorithm.
Research in GP has shown that 
accounting for denisity along
the frontier, better choices can be made.
We settled on the NSGA-II algorithm
for its good balance between
effectiveness and computational complexity.

In our experiments, the addition of
NSGA-II did not, by itself, improve
the prioritization process.
It was its combined usage 
when the fitness values
contained more than two components.
NSGA-II was able to distribute
selection by accounting for
density across all dimension,
making the use of more dimensions
beneficial.














<br>

<div id="policies">
<a class="right" href="#top">top</a>
</div>

### Expansion Policies

1. ** Multiple, independent complexity levels **
1. ** Context Aware **
    


|  method  |  level  |  result set |
| -------- | ------- | ------------|
| init     | low     |  $$ \sum \Big( \Big\{ \big\{ \vec{x}C_2 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \} \Big \} C_{[1:2]} \Big) + C $$ |
| init     | med     |  $$ \sum \Big( \Big\{ \big\{ \vec{x}C_3 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \} \Big \} C_{[1:2]} \Big) + C $$ |
| init     | high    |  $$ \sum \Big( \Big\{ \big\{ \vec{x}C_4 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \} \Big \} C_{[1:3]} \Big) + C $$ |


|  method  |  level  |  result set |
| -------- | ------- | ------------|
| Var sub  | low     |  $$ \big \{ \vec{x}C_1 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \}$$ |
| Var sub  | med     |  $$ \big \{ \vec{x}C_2 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \}$$ |
| Var sub  | high    |  $$ \big \{Add Med \big \} \bigcup \Big \{ \big \{ \vec{x}C_1 \big \} \times \big \{ F(\vec{x}C_1) \big \} \Big \} +b $$ |


|  method  |  level  |  result set |
| -------- | ------- | ------------|
| Mul grow | low     |  $$ \big \{ \vec{x}C_1 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \}$$ |
| Mul grow | med     |  $$ \big \{ \vec{x}C_2 \big \} \bigcup \big \{ F(\vec{x}C_1) \big \}$$ |
| Mul grow | high    |  $$ \big \{Mul Med \big \} \bigcup \Big \{ \big \{ \vec{x}C_1 \big \} \times \big \{ F(\vec{x}C_1) \big \} \Big \}$$ |


|  method  |  level  |  result set |
| -------- | ------- | ------------|
| Add grow | low     |  $$ \big \{ a * \vec{x}C_1 +b \big \} \bigcup \big \{ a * F(\vec{x}C_1) +b \big \}$$ |
| Add grow | med     |  $$ \big \{ a * \vec{x}C_2 +b \big \} \bigcup \big \{ a * F(\vec{x}C_1) +b \big \}$$ |
| Add grow | high    |  $$ \big \{Add Med \big \} \bigcup a* \Big \{ \big \{ \vec{x}C_1 \big \} \times \big \{ F(\vec{x}C_1) \big \} \Big \} +b $$ |































<br>

<div id="expansion">
<a class="right" href="#top">top</a>
</div>

### Waterfall Expansion

1. ** Multiple tiers of increased expansion **
1. ** Removes parameters and choices with policies **








































