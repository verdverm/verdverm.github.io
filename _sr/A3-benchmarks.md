---
layout: post
title: Appendix C - Benchmark Problems
brief: The system classes and equations used for benchmarking
---


% \section*{Explicit Benchmarks}
\begin{table}[h!]
% \small
\centering
\caption[Benchmark Equation List]{Benchmark Equation List}
\label{tab:eqn-benchs}
\begin{tabular}{|l|l|}
\hline
Problem & Equation\\
\hline
\hline
Single Variable & $y=f(x)$ \\
\hline
Koza-1	    &	 $  x + x^{2} + x^{3} + x^{4} $ \\
Koza-2  	&	 $  x + x^{5} -2*x^{3} $ \\
Koza-3  	&	 $  x^{2} + x^{6} -2*x^{4} $ \\
Nguyen-01  	&	 $  x + x^{2} + x^{3}  $ \\
Nguyen-02   &	 $  x + x^{2} + x^{3} + x^{4}  $ \\
Nguyen-03  	&	 $  x + x^{2} + x^{3} + x^{4} + x^{5}  $ \\
Nguyen-04  	&	 $  x + x^{2} + x^{3} + x^{4} + x^{5} + x^{6}  $ \\
Nguyen-05  	&	 $  \sin(x^{2})*\cos(x) - 1 $ \\
Nguyen-06  	&	 $  \sin(x) + \sin( x + x^{2} )  $ \\
Nguyen-07  	&	 $  \log( 1 + x ) + \log( 1 + x^{2} ) $ \\
Nguyen-08  	&	 $ \sqrt{x} $ \\
\hline 
\hline 
Double Variable & $y=f(x,y)$\\
\hline
Nguyen-09  	&	 $ \sin(x) + \sin(y^{2}) $ \\
Nguyen-10  	&	 $ 2 \sin(x) \cos(y) $ \\
Nguyen-11  	&	 $ x^{y} $ \\
Nguyen-12  	&	 $ x^{4} - x^{3} + \frac{1}{2}y^{2} - y$ \\[1ex]
\hline
\hline
Five Variable & $y=f(x,y,z,v,w)$\\
\hline
Korns-01  	&	 $  1.57 + 24.30v $ \\
Korns-02  	&	 $  0.23 + \frac{ y + v }{w} $ \\
Korns-03  	&	 $  -5.41 + \frac{ v + -x + \frac{y}{w} }{w} $ \\
Korns-04  	&	 $  -2.30 + 0.13 \sin(z) $ \\
% Korns-05  	&	 $  3.00 + 2.13 \log(w) $ \\
% Korns-06  	&	 $  1.30 + 0.13 \sqrt{x} $ \\
% Korns-07  	&	 $ 213.81 ( 1 - e^x ) $ \\
% Korns-08  	&	 $ 6.87 + 11\sqrt{7.23xvw} $ \\
% Korns-09  	&	 $ \frac{e^z \sqrt{x}}{\log(y) v^{2}} $ \\
Korns-10  	&	 $ 0.81 + \frac{24.3 ( 2y + 3z^{2} )}{ 4v^{3} + 5w^{4} } $ \\
Korns-11  	&	 $ 6.87 + 11 \cos(7.23x^{3}) $ \\
Korns-12  	&	 $ 2.00 -2.1 \sin(1.30w)\cos(9.80x) $ \\
Korns-13  	&	 $ 32.00 - \frac{3\tan(x)\tan(z)}{\tan(y)\tan(v)} $ \\[1ex]
% Korns-15  	&	 $ 12.00 - \frac{6\tan(x)( \log(z) -(\tan(v))}{e^y} $ \\[1ex]
\hline
\end{tabular}
\end{table}



% \section*{NIST Explicit Equations}

% insert linear and non-linear problems from 
% http://www.itl.nist.gov/div898/strd/general/dataarchive.html





% \begin{table}[h]
% \centering
% \begin{tabular}{|l|l|}
% \hline
% Problem & Equation\\
% \hline
% Psaw1 & $y = x^5 - 2x^3 + x$\\
% Psaw2 & $y = x^6 = 2x^4 + x^2$\\
% Cos2X & $y = 1 - 2\sin^2(x)$*\\
% Poly2 & $y = x + x^2$\\
% Poly3 & $y = x + x^2 + x^3$\\
% Poly4 & $y = x + x^2 + x^3 + x^4$\\
% Poly5 & $y = x + x^2 + x^3 + x^4 + x^5$\\
% HodF1 & $y = 1.5x^2 - x^3$\\
% HodF2 & $y = e^{|x|}\sin(x)$\\
% HodF3 & $y = x^2e^{\sin(x)} + x + \sin(\frac{\pi}{4}-x^3)$\\
% \hline
% \end{tabular}
% \caption{This table shows the equations for the Explicit Equations}
% \label{tab:eqn-explicit}
% \end{table}


% \newpage
% \section*{Dynamical Systems}
% \begin{table}[h]
% \centering
% \caption[Differential Equation List]{}
% \label{tab:eqns-diffeq}
% \begin{tabular}{|l|l|}
% \hline
% Problem & Equations \\
% \hline
% \hline
% \multirow{2}{*}{BacResp} & $\dot{x} = 20 - x - \frac{xy}{1+0.5x^2}$\\
% & $\dot{y} = 10 - \frac{xy}{1+0.5x^2}$\\
% \hline

% \multirow{2}{*}{BarMags} & $\dot{\theta_1} = 0.5\sin(\theta_1-\theta_2)-\sin(\theta_1)$\\
% & $\dot{\theta_2} = 0.5\sin(\theta_2-\theta_1)-\sin(\theta_2)$\\
% \hline

% \multirow{2}{*}{Glider} & $\dot{v} = -0.05v^2 - \sin(\theta)$\\
% & $\dot{\theta} = v - \frac{\cos(\theta)}{v}$\\
% \hline

% \multirow{3}{*}{Ecoli Lac Op} & $\dot{G} = \frac{L^2}{1+L^2}-0.01G+0.001$\\
% & $\dot{A} = G \left( \frac{L}{1+L} - \frac{A}{1+L}  \right)  $\\
% & $\dot{L} = \frac{-GL}{1+L}  $\\
% \hline

% \multirow{3}{*}{Lorenz} & $\dot{x} = 10(y-x)$\\
% & $\dot{y} = x(C-z)-y$\\
% & $\dot{z} = xy - \frac{8}{9}z$\\
% \hline

% \multirow{2}{*}{Shear Flow} & $\dot{\theta} = \cot(\phi)\cos(\theta) = \frac{\cos\phi}{\sin\phi}\cos\theta$\\
% & $\dot{\phi} = (\cos^2\phi - 0.1\sin^2\phi)\sin(\theta)$\\
% \hline

% \multirow{2}{*}{Van Der Pol} & $\dot{x} = 10 \left( y-\left(\frac{1}{3}x^3 - x \right)\right) $\\
% & $\dot{y} = -0.1x$\\
% \hline

% \multirow{2}{*}{Pred-Prey 1} & $\dot{x} = x \left( 4-x-\frac{y}{1+x} \right)$\\
% & $\dot{y} = y \left( \frac{x}{1+x} -0.075y \right)$\\
% \hline

% \multirow{2}{*}{Pred-Prey 2} & $\dot{x} = (-0.2+0.001y)x$ \\
% & $\dot{y} = (0.1 - 0.001x)y$\\
% \hline

% \multirow{2}{*}{Lotka-Volterra} & $\dot{x} = 3x - 2xy - x^2$\\
% & $\dot{y} = 2y - xy - y^2$\\
% \hline

% \multirow{2}{*}{Pendulum} & $\dot{\theta} = v$\\
% & $\dot{v} = \frac{-g}{L}\sin \theta$\\
% \hline

% \multirow{2}{*}{Single Spring} & $\dot{x} = v$\\
% & $\dot{v} = - \frac{k}{m}x - \frac{b}{m}v $\\
% \hline

% \multirow{2}{*}{Double Spring} & $\dot{v_1} = -\frac{k_1}{m_1}(x_1-R_1) + \frac{k_2}{m_1}(x_2-x_1-w_1-R_2)  $\\
% & $\dot{v_2} = -\frac{x_2}{m_2}(x_2-x_1-w_1-R_2)   $\\
% \hline

% \end{tabular}
% \end{table}



