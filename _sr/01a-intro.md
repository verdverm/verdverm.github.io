---
layout: sr
title: Introduction
brief: Symbolic Regression for mathematical discovery
sections:
  - name: Motivation
    tag: motivation
  - name: Contributions
    tag: contributions
  - name: As a Technology
    tag: technology
  - name: On Reproducibility
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

The main contribution of this work
is a method called
*Prioritized Grammar Enumeration*
which can derive mathematical formula
in an **efficient and reproducible** way.

...

a generalization of linear and non-linear regression,
when the model is unknown.



<div id="motivation"></div>
<a class="right" href="#top">top</a>


#### A Motivating Example

Let's start with some data
which compares hours studied
to test scores.

<google-chart
	type='scatter'
	options='{
	    "title": "Effort vs Score",
	    "legend": "none",
	    "crosshair": { "trigger": "both", "orientation": "both" }
    }'
	data='/sr/data/linreg.json'>
</google-chart>



This looks like a strong linear relationship,
as we would expect scores to go up with
hours spent studying.


<google-chart
	type='scatter'
	options='{
	    "title": "Effort vs Score, linear?  (R2 = 0.872)",
	    "crosshair": { "trigger": "both", "orientation": "both" },
	    "hAxis": {"title": "Study Hours"},
	    "vAxis": {"title": "Test Score"},
	    "trendlines": { 
	    	"0": {
		     	"color": "green",
		        "lineWidth": 4,
		        "opacity": 0.4,
		        "visibleInLegend": true,
		        "showR2": true
	    	}
	    }
    }'
	data='/sr/data/linreg.json'>
</google-chart>


But we know that you can only study so much
before the law of diminishing returns sets in.
So what does a 2nd-order polynomial look like?


<google-chart
    type='scatter'
    options='{
	    "title": "Effort vs Score, polynomial degree-2?  (R2 = 0.945)",
	    "crosshair": { "trigger": "both", "orientation": "both" },
	    "hAxis": {"title": "Study Hours"},
	    "vAxis": {"title": "Test Score"},
	    "trendlines": { 
	    	"0": {
		     	"type": "polynomial",
		     	"degree": "2",
		        "color": "green",
		        "lineWidth": 4,
		        "opacity": 0.4,
		        "visibleInLegend": true,
		        "showR2": true
	    	}
	    }
    }'
    data='/sr/data/linreg.json'>
</google-chart>

This model looks more accurate and the R2 value has improved as well.
How about a 3rd-order polynomial?

<google-chart
    type='scatter'
    options='{
	    "title": "Effort vs Score, polynomial degree-3?  (R2 = 0.950)",
	    "crosshair": { "trigger": "both", "orientation": "both" },
	    "hAxis": {"title": "Study Hours"},
	    "vAxis": {"title": "Test Score"},
	    "trendlines": { 
	    	"0": {
		     	"type": "polynomial",
		     	"degree": "3",
		        "color": "green",
		        "lineWidth": 4,
		        "opacity": 0.4,
		        "visibleInLegend": true,
		        "showR2": true
	    	}
	    }
    }'
    data='/sr/data/linreg.json'>
</google-chart>

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


<google-chart
    type='scatter'
    options='{
	    "title": "What is this one all about?",
	    "crosshair": { "trigger": "both", "orientation": "both" },
	    "hAxis": {"title": "time"},
	    "height": 333,
        "pointSize": 0.1
    }'
    data='/sr/data/yeast.json'>
</google-chart>

It took humans years of study and analysis
to formulate the differential equations for
yeast metabolism.
Later, we will see how to solve this problem
in minutes with the PGE algorithm.












<div id="contributions"></div>
<a class="right" href="#top">top</a>

#### Contributions

The primary setting for this paper is Symbolic Regression (SR),
the task of deriving mathematical formula
from observational data without any fore-knowledge
of the domain or problem.
In essence, this is the scientific process
performed by a computer.
Hypotheses are formulated,
tested against the observations,
and compared for explanatory value.
The overall goal of SR is to produce
expressions which find a balance in the
trade-off between accuracy and complexity.
The best models will therefore be
both simple and explanatory,
elucidating the dynamics of the system under study.
In this way, an expert is freed
to think about the larger and more complex
aspects of that system,
gaining insights from the results of SR.

We propose
Prioritized Grammar Enumeration (PGE)
as a deterministic machine learning
algorithm for solving Symbolic Regression.
Working with a grammar’s production rules, PGE prioritizes
the enumeration of expressions in that language.
By making large reductions to the search space
and introducing mechanisms for memoization,
PGE can exploring the space of all equations efficiently.
Most notably, PGE provides
reproducibility of results,
a key aspect to any system
used by scientists at large.

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













<div id="technology"></div>
<a class="right" href="#top">top</a>

#### Technology

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









<div id="reproducibility"></div>
<a class="right" href="#top">top</a>


#### On Reproducibility

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














\newpage
\noindent
We include two quotes from recent publications
in the hope that it will frame this work in the 
larger context of producing a usable SR tool.
Much of the research in SR aims at improving
the GP implementation, with only limited results and inconsistent comparisons.
By reconsidering the definition of the SR problem,
we believe that PGE is an evolution in perspective and approach.
Through determinism 
about the way to create such a technology. \\[2ex]

	\begin{quotation}
	``Genetic programming (GP) is not a field noted for the rigor
	of its benchmarking. Some of its benchmark problems are
	popular purely through historical contingency, and they can
	be criticized as too easy or as providing misleading information 
	concerning real-world performance, but they persist
	largely because of inertia and the lack of good alternatives.
	Even where the problems themselves are impeccable, comparisons 
	between studies are made more difficult by the lack
	of standardization. We argue that the definition of standard
	benchmarks is an essential step in the maturation of the
	field. We make several contributions towards this goal. We
	motivate the development of a benchmark suite and define
	its goals; we survey existing practice; we enumerate many
	candidate benchmarks; we report progress on reference 
	implementations; and we set out a concrete plan for gathering
	feedback from the GP community that would, if adopted,
	lead to a standard set of benchmarks.''
	\end{quotation}
	\hfill \cite{McDermott:2012:benchmarks}

\newpage

\begin{quotation}

	Outside the GP literature, SR is rare; there are only scattered references such
	as (Langley et al., 1987). In contrast, the GP literature has dozens of papers on
	SR every year; even the previous GPTP had seven papers involving SR (Riolo
	et al., 2010). In a sense, the home field of SR is GP. This means, of course,
	that when authors aim at SR, they start with GP, and look to modify GP to
	improve speed, scalability, reliability, interpretability, etc. The improvements
	are typically 2x to 10x, but fall short of performance that would makes SR a
	“technology” the way LS or linear programming is.
	We are aiming for SR as a technology. What if we did not constrain ourselves
	to using GP? To GP researchers, this may seem heretical at first glance. But if
	the aim is truly to improve SR, then this should pose no issue. And in fact, we
	argue that the GP literature is still an appropriate home for such work, because
	(a) GP authors doing SR deeply care about SR problems, and (b) as already
	mentioned, GP is where all the SR publications are. Of course, we can draw
	inspiration from GP literature, but also many other potentially-useful fields.
	\end{quotation}
	\hfill \cite{McConaghy:2011:FFX}

