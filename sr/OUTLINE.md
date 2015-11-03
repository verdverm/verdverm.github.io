Outline for Online Dissertation
-------------------------------


1. ### *Introduction*
    1. ** Motivation **
    1. ** Contributions **
    1. ** Results **
    1. ** Reproducibility **

1. ### *Symbolic Regression*
    1. **The Problem**
        1. Overview
        1. **The Search Space**
    1. ** The Components **
        1. ** Representation **
            1. Linguistic Foundations
            1.   *Binary Tree*
            1. ** Algebra Trie **
            1. ** Linear Forms **
                1. **Summation of Basis Terms**
                1. **Linear GP...**
            1. ** Other Representations **
                1. **Graph**
            1. **Restrictions and Simplifications**
        1. ** Evaluation **
            1. ** Point Evaluation **
            1. ** Accuracy Metrics **
            1. ** Fitness Values **
        1. ** Optimization **
            1. ** Exploration Operators **
            1. ** Selection Mechanisms **
            1. ** Pareto Fronts **
        1. ** Memoization **
    1. ** Implementations **
        1. ** Genetic Programming **
        1. ** Prioritized Grammar Enumeration **
        1. ** Other Implementations **
    1. Applications
        1. Explicit Equations
        1. Differential Equations
        1. Invariants and PDEs
    1. ** Further Considerations **
        1. Separating Task and Implementation
        1. ** Benchmark Problems **
        1. ** Metrics for Success **
            1. **Accuracy of Best Solution**
            1. **Rate of Convergence**
            1. **Is the Solution There?**
        1. ** Metrics for Effort **
            1. **Iterations**
            1. **Wall-clock Time**
            1. **Number of Evaluations**
            1. **Number of Models**
        1. ** Reproducibility and Determinism **

1. ### *Related Work*
    1. ** Genetic Programming **
        1. ** Algorithm **
        1. ** Limitations **
        1. ** Enhancements **
        1. ** Inherient Difficulties **
    1. ** Fast Function Extraction **
        1. ** Algorithm **
        1. ** Limitations **
    1. ** Multi-Objective Optimization **
        1. ** Pareto Non-dominated sorting **
        1. ** More general stuff? **
    1. Regression Techniques
        1. Linear Regression
        1. Nonlinear Regression
        1. Support Vector Regression
        1. Ridge, Lasso, Elastic Net
    1. Graph Algorithms
        1. Minimum Spanning Tree
            1. Prim
            1. Kruskal
        1. Single-source Shortest-path
            1. Dijkstra
            1. A\* search

1. ### *Prioritized Grammar Enumeration*
    1. ** Overview **
    1. ** Theory **
        1. ** Removing Non-determinism **
            1. ** Motivating Desire **
            1. ** Benefits of maintaining **
        1. ** Search Space Organization **
            1. ** Representation Combinatorics **
                1. ** Leaf Permutations **
                1. ** Form Permutations **
                1. ** Create Canonical Forms **
            1. ** Search Space Combinatorics **
                1. ** Multiple Derivations **
                1. ** Algebraic Manipulations **
        1. ** Evaluating Forms Once **
            1. ** Dynamic Programming & Memoization **
            1. ** Non-linear Regression **
    1. ** Components **
        1. ** Representation **
            1. ** N-ary trie **
            1. ** Prefix notation **
            1. ** Abstract Parameters **
        1. ** Evaluation **
            1. ** Non-linear parameter fitting **
            1. ** Modelling Metrics **
            1. ** Fitness Values **
        1. ** Optimization **
            1. ** Exploration Operators **
            1. ** Prioritization Strategies **
            1. ** Selection Mechanisms **
        1. ** Memoization **
            1. ** Detecting Overlapping Subproblems **
            1. ** Integer Prefix Tree **
    1. ** The Search Loop **
        1. ** Diagram **
        1. ** Code listing **
        1. ** Explination **
    1. ** Limitations **
        1. ** Exponential to {Features} **
            1. ** Compounds with next issue **
        1. ** Exploration operators **
            1. ** Determine reachable parts of space **
            1. ** Recursive nature part of Exponential problem **
        1. ** Equation Bloat **
            1. ** From recursive production rules **
        1. ** Parameter Optimization **
            1. ** Difficult as eqns get bigger **
            1. ** Becomes time-consuming **
            1. ** Nonlinear regression issues **
    1. ** Reproducibility **
    1. ** Relation to GP ??? **

1. ### *PGE Enhancements*
    1. ** Decoupling into Services **
        1. ** Evaluation generally > 90% of time **
        1. ** Deploy to cloud **
        1. ** Three Services **
            1. ** Main Search **
            1. ** Evaluation (for parallel benefit) **
            1. ** Algebra (for mature CAS) **
    1. ** Metrics & Selection **
        1. ** Increased model accuracy metrics **
        1. ** Density based Pareto methods **
        1. ** Use two together **
    1. ** Expansion Policies **
        1. ** Multiple, independent complexity levels **
        1. ** Context Aware **
    1. ** Waterfall Evaluation **
        1. ** Multiple tiers of increased refinement **
        1. ** Allievates excessive evaluation on poor models **
    1. ** Waterfall Expansion **
        1. ** Multiple tiers of increased expansion **

1. ### *PGE Experiments*
    1. ** Overview **
    1. ** Experimental Settings **
    1. ** Proof of Concept **
        1. ** Original Algorithm **
        1. ** Explicit Bencmarks **
        1. ** Diffeq Benchmarks **
    1. ** Data Related Issues **
    1. ** PGE Enhancements **

1. ### *Conclusions*
    1. ** Linguistic Perspective **
    1. ** Effectiveness of PGE **
    1. ** Remaining Limitations **
    1. ** Reproducibility **
    1. ** PGE as a tool for SR **

1. ### *Appendices*
    1. ** PyPGE - Open-source PGE **
    1. ** Other SR implementations **
    1. ** Benchmark Problems **
    1. ** Future Work & Research Ideas **
        1. ** Adapting Metrics **
        1. ** Prim-like Graph Search **
    1. ** Abreviations **