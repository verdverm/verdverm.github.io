Outline for Online Dissertation
-------------------------------


1. ### *Introduction*
    1. **Motivation**
    1. **Contributions**
    1. **Results**

1. ### Symbolic Regression
    1. The Problem
        1. Overview
        1. The Search Space
    1. The Components
        1. Representation
            1. Linguistic Foundations
            1. Binary Tree
            1. Algebra Trie
            1. Linear Forms
            1. Graph Representations
            1. Restrictions and Simplifications
        1. Evaluation
            1. Point Evaluation
            1. Accuracy Metrics
            1. Fitness Values
        1. Optimization
            1. Exploration Operators
            1. Selection Mechanisms
            1. Pareto Selection
        1. Memoization
    1. Implementations
        1. Genetic Programming
        1. Fast Function eXtraction
        1. Prioritized Grammar Enumeration
    1. Applications
        1. Explicit Equations
        1. Differential Equations
        1. Invariants and PDEs
    1. Further Considerations
        1. Separating Task and Implementation
        1. Benchmark Problems
        1. Metrics for Success
            1. Accuracy of Best Solution
            1. Rate of Convergence
            1. Is the Solution There?
        1. Metrics for Effort
            1. Iterations
            1. Wall-clock Time
            1. Number of Evaluations
            1. Number of Models
        1. Reproducibility and Determinism

1. ### Related Work
    1. Genetic Programming 
        1. Algorithm 
            1. Overview
            1. Representation
            1. Evaluation
            1. Optimization
            1. Init & Termination
        1. Limitations
    1. Enhancements in GP
        1. Selection Improvements
        1. Variations on Crossover
        1. The Island Model
        1. Co-evolutionary GP
        1. Hybrid Algorithms
    1. Fast Function Extraction
        1. Algorithm
        1. Limitations
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

1. ### Prioritized Grammar Enumeration
    1. Theory
        1. Removing Non-determinism
        1. Search Space Organization
        1. Evaluating Forms Once
            1. Dynamic Programming
            1. Non-linear Regression
            1. Memoization
    1. Components
        1. Representation
            1. N-ary trie
            1. Prefix notation
            1. Abstract Parameters
        1. Evaluation
            1. Non-linear parameter fitting
            1. Modeling Metrics
            1. Fitness Values
        1. Optimization
            1. Exploration Operators
            1. Prioritization Strategies
            1. Selection Mechanisms
        1. Memoization
            1. Detecting Overlapping Subproblems
            1. Integer Prefix Tree
    1. The Search Loop
        1. Diagram
        1. Code listing
        1. Explanation
    1. Limitations
        1. Exponential to {Features}
        1. Algebra Policies
        1. Equation Bloat
        1. Selection Similarity
        1. Parameter Optimization
    1. Relation to GP

1. ### PGE Enhancements
    1. Decoupling into Services 
        1. Evaluation generally > 90% of time
        1. Data and Function parallelism
        1. Three Services
            1. Main Search
            1. Evaluation (for parallel benefit)
            1. Algebra (for a mature CAS)
    1. Progressive Evaluation
        1. Multiple tiers of increased refinement
        1. Alleviates excessive evaluation on poor models
        1. Coefficient inheritance 
    1. Metrics and Selection
        1. Density based Pareto methods
        1. Normalize fitness components
        1. More accuracy metrics
        1. More parsimony metrics
        1. Use two together
    1. Expansion Improvements
        1. Configurable complexity levels
        1. Context-aware
        1. New Extension Operator
        1. New Shrinkage Operator
        1. Progressive expansion
    1. PGE Enhanced Description
        1. Summarize the f.l.o.w.

1. ### *PGE Experiments*
    1. **Proof of Concept**
        1. **Original Algorithm**
        1. **Explicit Bencmarks**
    1. **Data Related Issues**
        1. **Diffeq Benchmarks**
        1. **Progressive Refinement**
    1. **Data Related Issues**
    1. **PGE Enhancements**
        1. **Fitness Metrics**
        1. **Expansion Policies**
        1. **Progressive Expansion**

1. ### *Conclusions*
    1. **Linguistic Perspective**
    1. **Effectiveness of PGE**
    1. **Remaining Limitations**
    1. **Reproducibility**
    1. **PGE as a tool for SR**

1. ### *Appendices*
    1. **PyPGE - Open-source PGE**
    1. **Other SR implementations**
    1. **Benchmark Problems**
    1. **Future Work & Research Ideas**
        1. **Adapting Metrics**
        1. **Prim-like Graph Search**
    1. **Abreviations**
