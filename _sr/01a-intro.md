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

For many thousands of years,
humans have been using mathematics
to understand and study the world.
Mathematics is our bridge
between the world, the science, and each other.
It is through communications in this language,
the writing of formulaic descriptions,
that we share our discoveries and understandings
with each other.
Without a doubt, 
mathematics has been an integral
part of human growth and progress.

With the invention of calculus,
and the start of the Industrial Revolution,
equations became synonymous with progress.
Machines and math brought order to chaos.
During World War II
it was becoming apparent
that humans were reaching the limit of 
their calculation abilities.
The US military was employing hundreds
of women, known as "computers," to perform
calculations for artillery aiming tables.
Completing the table for a single artillery gun 
would take several months and was prone to errors.
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
achieving incredible feats,
it has remained humans'
responsibility for discovering
the models and mathematics 
which we put into our computers.

Enter Symbolic Regression (SR), 
a machine learning problem
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


##### A First Example

Let's begin with a simple example
to motivate the need for 
Symbolic Regression tools.
We'll then follow with a
real and complex example 
that will follow us throughout.


Below, you will see a plot
which compares test scores
to hours studied.
As one would expect,
this looks like a strong linear relationship,
scores to go up with
hours spent studying.

<img class="responsive-img" src="/sr/img/intro/linreg-p1.png">


We know that you can only study so much
before the law of diminishing returns 
and burnout sets in.
So how does a 2nd-order polynomial
fit with the data?

<img class="responsive-img" src="/sr/img/intro/linreg-p2.png">


This model looks much better and the $$R^2$$ value has improved as well.
How about a 3rd-order polynomial?

<img class="responsive-img" src="/sr/img/intro/linreg-p3.png">


Even better, though only a marginal improvement.
If we continue down this path,
we will likely start overfitting.

So which is it? 
Which model should we choose as our final model?
The automated answer lies within model selection,
a deep and complex problem. 
The breadth of model selection
is largely beyond the scope of this work,
however,
PGE and SR implementations
have an internal model selection
scheme which is integral to their success.
In the end, it is up to a domain expert
to make the final determination.

##### A Motivating Example

Now for our complex example from a real life system.
The following chart shows the time-series for
seven variables related to yeast processing sugar.
Mmmmmm beer! 

(or more generally, 
[The Art of Fermentation](http://www.amazon.com/The-Art-Fermentation-Exploration-Essential-ebook/dp/B0083JQCF2))



<img class="responsive-img" src="/sr/img/intro/yeast.png">


It took humans years of study and analysis
to formulate the differential equations for
yeast metabolism 
[[Wolf:2000:BiochemJ](http://www.ncbi.nlm.nih.gov/pubmed/10702114)].
The set of equations 
help scientists to understand the
interactions and complex cellular behaviors.
They also
allow for increased accuracy in simulation
under a greater diversity of situations.
These capabilities
enables researchers to rapidly
prototype before moving to 
laboratory tests.

In 2011, machines recovered the equations
for the first time 
[[Schmidt:2011:PhysBiol](http://www.ncbi.nlm.nih.gov/pubmed/21832805)]. 
With Symbolic Regression technology,
we can help scientists find useful models
that shed light on the problems they study.
The Genetic Programming methods first employed
on this problem required computational time
on the order of hours.
This is an incredible feat.
Later we will see how 
Prioritized Grammar Enumeration
can solve this same task
on the order of minutes.












<div id="contributions"></div>
<a class="right" href="#top">top</a>

##### Contributions

The main contribution of this work is 
Prioritized Grammar Enumeration (PGE),
a method which can derive
mathematical formula from data
in an efficient and reproducible way.
We step back from mainstream 
Genetic Programming (GP) thinking,
to fundamentally change the way we
approach the Symbolic Regression (SR) problem.
The overall goal of SR is to produce
equations which find a balance in the
trade-off between accuracy and complexity,
the method of getting there need 
not be fixed.
By reconsidering the fundamental approach to SR problem,
we believe that PGE is an evolution in thought,
leading the way to a reliable SR technology.


PGE brief

PGE basic

1. Redefining the problem
1. Creating a deterministic and reproducible algorithm


We then enhance the PGE algorithm
in several ways.

1. More application domains through differential equations.
1. Deeper abstractions and richer relationships.
1. Scaling the algorithm by decoupling into services
1. Combine multiple experiments to return more symbolic expressions







<div id="results"></div>
<a class="right" href="#top">top</a>

##### Results

Will fill this in later after the chapter(s) are written.


<div id="reproducibility"></div>
<a class="right" href="#top">top</a>


##### Reproducibility

A running theme to this work is Reproducibility.

There have been many controversies recently...


Estimates of irreproducibility...

[Oncology: 11%](http://www.nature.com/nature/journal/v483/n7391/full/483531a.html)

[Computer Science: 25%](http://reproducibility.cs.arizona.edu/tr.pdf)

[Psychology: 39%](http://www.sciencemag.org/content/349/6251/aac4716)





We champion reproducibility by

1. Deterministic algorithm which will reproduce itself
1. Open source Python project (PyPGE)
1. Accurate portrayal of results


Each chapter will end with a section on reproducibility
and the ideas relevant to that chapter.







