---
layout: sr
title: Appendix C - Benchmark Problems
brief: The system classes and equations used for benchmarking
sections:
  - name: Explicit Equations
    tag: explicit
    brief: Benchmarks from the SR literature
  - name: NIST Regressions
    tag: nist
    brief: Regression problems from the NIST website
  - name: Differential Equations
    tag: diffeqs
    brief: Dynamical systems drawn from real-world systems
---


For all of these, add links to

1. images
1. data files
1. notebooks

make each an accordian and back reference
experimental setups for each data/notebook

Basically... 
here's a dataset,
here's its context,
this is what and how it's testing
this is why it's useful and relavent

Details of data sets and
this is about why we chose each problem.


<div id="explicit"></div>
<a class="right" href="#top">top</a>


#### Explicit Equations

**Explicit problems** are drawn from the SR literature.
  The main source is a paper from titled
  ["GP Needs Better Benchmarks."](https://cs.gmu.edu/~sean/papers/gecco12benchmarks3.pdf)
  We select a subset of these problems,
  those that have been used more often in published work.


##### **Single Variable**


{% for item in site.data.sr.benchmarks.explicit_1var %}
<div class="row">
	<div class="col m4 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m2 s3"><span><a href="/sr/img/benchmarks/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.json">JSON</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/notebooks/benchmarks/explicit_problems_1d.ipynb">Notebook</a></span></div>
</div>
<div class="row">
	<div class="col offset-s1 s6">
		<span>$$ {{item.latex}} $$ </span>
	</div>
	<div class="col s5"></div>
</div>
{% endfor %}




##### **Two variable**

{% for item in site.data.sr.benchmarks.explicit_2var %}
<div class="row">
	<div class="col m4 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m2 s3"><span><a href="/sr/img/benchmarks/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.json">JSON</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/notebooks/benchmarks/explicit_problems_2d.ipynb">Notebook</a></span></div>
</div>
<div class="row">
	<div class="col offset-s1 s6">
		<span class="left-align">$$ {{item.latex}} $$ </span>
	</div>
	<div class="col s5"></div>
</div>
{% endfor %}




##### **Five variable**

{% for item in site.data.sr.benchmarks.explicit_5var %}
<div class="row">
	<div class="col m4 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m2 s3"><span><a href="/sr/img/benchmarks/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.json">JSON</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/notebooks/benchmarks/explicit_problems_5d.ipynb">Notebook</a></span></div>
</div>
<div class="row">
	<div class="col offset-s1 s6">
		<span>$$ {{item.latex}} $$ </span>
	</div>
	<div class="col s5"></div>
</div>
{% endfor %}






<div id="nist"></div>
<a class="right" href="#top">top</a>

#### NIST Regressions

**NIST problems** are taken from the NIST website.
  These benchmarks are used to test linear and non-linear
  regression techniques. 
  Here we apply PGE to these same problems.

[NIST website](http://www.itl.nist.gov/div898/strd/general/dataarchive.html)


##### Linear Problems

{% for item in site.data.sr.benchmarks.nist-linear %}
<div class="row">
	<div class="col m4 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m2 s3"><span><a href="/sr/img/benchmarks/{{item.tag}}.png">Chart</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.json">JSON</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m2 s3"><span><a href="{{item.link}}">NIST</a></span></div>
</div>
<div class="row">
	<div class="col offset-s1 s6">
		<span>$$ {{item.latex}} $$ </span>
	</div>
	<div class="col s5">{{item.source}}</div>
</div>
{% endfor %}


##### Noninear Problems

{% for item in site.data.sr.benchmarks.nist-nonlinear %}
<div class="row">
	<div class="col m4 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m2 s3"><span><a href="/sr/img/benchmarks/{{item.tag}}.png">Chart</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.json">JSON</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m2 s3"><span><a href="{{item.link}}">NIST</a></span></div>
</div>
<div class="row">
	<div class="col offset-s1 s6">
		<span>$$ {{item.latex}} $$ </span>
	</div>
	<div class="col s5">{{item.source}}</div>
</div>
{% endfor %}


<div id="diffeqs"></div>
<a class="right" href="#top">top</a>


#### Differential Equations

For each of these, additionally add

1. description, external link
2. parameters / constants


{% for item in site.data.sr.benchmarks.diffeqs %}
<div class="row">
	<div class="col m4 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m2 s3"><span><a href="/sr/img/benchmarks/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.json">JSON</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/data/benchmarks/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m2 s3"><span><a href="/sr/notebooks/benchmarks/diffeq.ipynb">Notebook</a></span></div>
</div>
<div class="row">
	{% for eqn in item.latex %}
	<div class="col offset-s1 s6">
		<span>$$ {{eqn}} $$ </span>
	</div>
	<div class="col s5"></div>
	{% endfor %}
</div>
{% endfor %}







<div id="additional"></div>
<a class="right" href="#top">top</a>


#### Additional Datasets

##### Yeast

##### Real World

For each of these, additionally add

1. description, external link
2. will not have equations upfront


**SymbolicRegression.com benchmarks**
**Lake Data**


