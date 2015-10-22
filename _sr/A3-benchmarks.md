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

Details of data sets and
this is about why we chose each problem.


<div id="explicit"></div>
<a class="right" href="#top">top</a>


#### Explicit Equations

**Explicit equations** are drawn from the SR literature.
  The main source is a paper titled
  ["GP Needs Better Benchmarks."](https://cs.gmu.edu/~sean/papers/gecco12benchma3ks4.pdf)
  We select a subset of these problems,
  those that have been used more often in published work.
  In several cases we added parameters to the equations for two reasons.
  The first is to bring the scale of the data into a reasonable range. 
  We did this so that we could add percentage noise based on the variance of the data.
  The second reason was to make the equation more complex,
  thus making the regression tasks more difficult.


##### **Single Variable**


{% for item in site.data.sr.benchmarks.explicit_1var %}
<div class="row">
	<div class="col m3 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m3 s4"><span><a href="/sr/img/benchmarks/explicit/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/data/benchmarks/explicit/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/notebooks/benchmarks/explicit_problems_1d.ipynb">Notebook</a></span></div>
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
	<div class="col m3 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m3 s4"><span><a href="/sr/img/benchmarks/explicit/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/data/benchmarks/explicit/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/notebooks/benchmarks/explicit_problems_2d.ipynb">Notebook</a></span></div>
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
	<div class="col m3 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m3 s4"><span><a href="/sr/img/benchmarks/explicit/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/data/benchmarks/explicit/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/notebooks/benchmarks/explicit_problems_5d.ipynb">Notebook</a></span></div>
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
	<div class="col m3 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m3 s4"><span><a href="/sr/img/benchmarks/nist-linear/{{item.tag}}.png">Chart</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/data/benchmarks/nist-linear/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m3 s4"><span><a href="{{item.link}}">NIST</a></span></div>
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
	<div class="col m3 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m3 s4"><span><a href="/sr/img/benchmarks/nist-nonlinear/{{item.tag}}.png">Chart</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/data/benchmarks/nist-nonlinear/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m3 s4"><span><a href="{{item.link}}">NIST</a></span></div>
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
	<div class="col m3 s12"><span><b>{{item.name}}</b></span></div>
	<div class="col m3 s4"><span><a href="/sr/img/benchmarks/diffeq/{{item.tag}}_noisy.png">Chart</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/data/benchmarks/diffeq/{{item.tag}}.csv">CSV</a></span></div>
	<div class="col m3 s4"><span><a href="/sr/notebooks/benchmarks/diffeq.ipynb">Notebook</a></span></div>
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


