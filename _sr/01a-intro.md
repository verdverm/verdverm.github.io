---
layout: sr
title: Introduction
brief: Symbolic Regression for mathematical discovery
sections:
  - name: Motivation
    tag: motivation
  - name: Contributions
    tag: contributions
  - name: Results
    tag: results
  - name: Reproducibility
    tag: reproducibility
---



##### A Brief Computational History

For more than 4000 years,
humans have been using
mathematical formulae
to understand and study the world.
Mathematics is our bridge
between the world and science.
It is through this language
that we communicate our discoveries
with each other.
With the invention of calculus
and the start of the Industrial Revolution,
equations became centric to progress.
By discovering a formulaic description
of a problem, scientists and engineers
gained insights and created solutions.

During World War II, in became apparent
that humans were reaching the limit of 
their calculation abilities.
The military was employing hundreds
of women, known as "computers," to perform
calculations for artillery aiming tables.
Completing the table for a single artillery gun 
would take several months and was error prone.
It was during these dark times
that the first electronic computers were used
to replace the human calculators.
The EINAC was programmed to simulate the
differential equations for an 
artillery shell fired under different conditions.
EINAC could simulate thousands of artillery shells
and produce the same firing tables in less than a day.
With the end of the war EINAC and
other early computers were put
to use calculating weather models,
making financial predictions,
and simulating complex systems.

As computers have permeated our society,
we have experienced waves of automation
and analytics in every domain.
The thousands of engineering and scientific
breakthroughs that define the world we live in today
were only possible with the progress of computers.
While data science and machine learning
have made great contributions and are
acheiving incredible feats,
it has remained humans'
responsibility for discovering
the models and mathematics 
which we put into computers.

Enter Symbolic Regression (SR), 
a machine learning algorithm
for discovering the mathematics, 
the equations and formula,
that define the behavior
described in the data.
The Symbolic Regression method
is much like Newton writing down his
Law of Universal Gravitation
by analyzing the movement of the planets.
Scientists observe the world around them
and write down mathematical formula
which accurately and concisely
explain behavior to other humans.
Symbolic Regression automates this process,
from observation to mathematical formula.




<div id="motivation"></div>
<a class="right" href="#top">top</a>


##### A Motivating Example

Let's begin with an example.
Below, you will see a plot
which compares test scores
to hours studied.

<img class="responsive-img" src="/sr/img/intro/linreg-no.png">



This looks like a strong linear relationship,
as we would expect scores to go up with
hours spent studying.

<img class="responsive-img" src="/sr/img/intro/linreg-p1.png">


But we know that you can only study so much
before the law of diminishing returns sets in.
So what does a 2nd-order polynomial look like?

<img class="responsive-img" src="/sr/img/intro/linreg-p2.png">


This model looks more accurate and the R2 value has improved as well.
How about a 3rd-order polynomial?

<img class="responsive-img" src="/sr/img/intro/linreg-p3.png">


Even better, though only a marginal improvement.

So which is it? Which model should we choose as 
our final model? Typically a model selection
technique is used in conjunction with 
proper data handling techniques.
_[more detail here]_
In the end, it is up to a domain expert
to make the final determination.

Here is a complex example from a real life system
involving seven interacting variables. 
Do you have some ideas for what the models should look like?




<img class="responsive-img" src="/sr/img/yeast.png">


It took humans years of study and analysis
to formulate the differential equations for
yeast metabolism.
Later, we will see how to solve this problem
in minutes with the PGE algorithm.












<div id="contributions"></div>
<a class="right" href="#top">top</a>

##### Contributions

The main contribution of this work is 
*Prioritized Grammar Enumeration*
a method 
which can derive mathematical formula
in an **efficient and reproducible** way.

...

a generalization of linear and non-linear regression,
when the model is unknown.


We then enhance the PGE algorithm
in several ways.

- we extend PGE to discover equations in a spectrum of domains.


- we enhance the algorithm with
deeper equation abstractions,
richer relationships,
and a persistent formula library.


- to deal with data and problem complexities...
 - feature selection
 - waterfall evaluation and prioritization
 - combine multiple experiments to provide greater view of problem space



- we enable the PGE algorithm to scale by
decoupling the subroutines
into a set of services which are 
distributed to the cloud environment.

- we create an interactive visualization interface
which enables users to effectively interpret the results.














The first major theme of this work is 
creating a Symbolic Regression technology.
This involves \# parts.

1. Redefining the problem
2. Creating a deterministic and reproducible algorithm
3. Redesigning the algorithm as a scalable platform
4. Creating an interactive visualization for domain experts
   to gain insights and understand how the models were derived.

The overall goal of SR is to produce
equations which find a balance in the
trade-off between accuracy and complexity.
The method of getting there does not need 
to be fixed.
We step back from mainstream SR and GP thinking,
to fundamentally change the way we
approach regressing symbolic expressions.
By reconsidering how to tackle the SR problem,
we believe that PGE is an evolution in thought
about the way to create such a technology.

The difference is in how grammar is interacted with.
GP uses a grammar to define building blocks
and ensure valid expressions are constructed.
PGE uses a grammar to order search space,
growing expressions through the production rules.
This idea alters the direction of search,
from narrowing in on solutions
to reaching out in an attempt to encounter 
the solution. PGE works well because
it traverses the best paths towards 
the most promising areas of the search space.
It does this by treating grammar enumeration,
and subsequently Symbolic Regression,
as a dynamic programming problem.

PGE pushes (or pops?) SR into the realm of language theory.
Programming languages are searched 
by programs written in the same or a different language.
Finite automatons can regress 
and recognize finite automatons.
Parse trees in one grammar
derive parse trees in another.
They can all do unto others
as they can do unto themselves.
These ideas are quite reminiscent of themes
woven throughout Godel, Escher, Bach \cite{hofstadter:2000:geb}. 





<div id="results"></div>
<a class="right" href="#top">top</a>

##### Results




<div id="reproducibility"></div>
<a class="right" href="#top">top</a>


##### Reproducibility

The second major theme to this work is Reproducibility.

There have been many controversies recently...

Estimates of irreproducibility...

[citations]()


Each chapter will conclude with a section on reproducibility.
Their purpose is to discuss the many facets of reproducibility

- its importance
- the complexities, the causes
- where things have gone wrong
- how it can be achieved algorithmically
- experimentation and comparisons
- sharing of code and data and logs
- distributing in a reproducible way














