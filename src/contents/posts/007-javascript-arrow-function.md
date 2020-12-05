---
posttype: 'blog'
title: 'JavaScript Arrow Functions'
date: 2020-11-01 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/javascript-arrow-function.jpg'
postdescription: "Arrow Functions in JavaScript"
tags:
- JavaScript
- ES6
---

**Arrow** function was introduced with **ES6** as a new syntax for writing JavaScript functions. There are a few differences between **arrow** functions and **regular** functions

<h5 class="post-subheading">Arrow Function <em>vs</em> Regular Function</h5>

<table class="table table-bordered">
  <thead class="thead-light">
    <tr>
      <th class="text-center">Arrow Function</th>
      <th class="text-center">Regular Function</th>
    </tr>
  </thead>
  <tr>
    <td width="50%">The value of <code>this</code> will always be inherited from the outer function. If there is no outer function, <code>this</code> will refer to the global object. In other words, the arrow function resolves <code>this</code> lexically.</td>
    <td>The value of <code>this</code> depends how the function is invoked or who owns the function:
      <ul class="point-list">
      <li>1. Simple invocation - <code>this</code> refers to the global object</li>
      <li>2. Method invocation – <code>this</code> refers to the parent object</li>
      <li>3. Constructor invocation – <code>this</code> refers to the newly created instance</li>
      </ul>
  </td>
  </tr>
  <tr>
    <td>Doesn’t have <code>arguments</code> object but we can access the arguments using a rest parameter <code>…args</code></td>
    <td>Has a special <code>arguments</code> object containing the list of arguments</td>
  </tr>
  <tr>
    <td>Supports implicit <code>return</code> expression statement.</td>
    <td><code>return</code> expression statement needs to be explicitly declared.</td>
  </tr>
  <tr>
    <td>A <strong>class method</strong> defined as arrow function will always bind <code>this</code> to the class instance.</td>
    <td>If a <strong>class method</strong> defined as a regular function and used as a <strong>callback</strong>, we have to bind <code>this</code> to the method.</td>
  </tr>
</table>

<br>
<h5 class="post-subheading">Arrow Functions should be used when</h5>

<ul class="point-list">
  <li>The value of <code>this</code> needs to be consistent and returns the same value always</li>
  <li>The function has only one line of statement and which may be a simple <code>return expression</code></li>
  <li>The function doesn't need to access its <code>arguments</code> object</li>
  <li><strong>Callback</strong> functions with static context</li>
</ul>

<h5 class="post-subheading">Arrow Functions shouldn't be used when</h5>

<ul class="point-list">
  <li>As an object property or object prototype (<code>this</code> inside the arrow function will refer to "window" object instead of the parent object/function)</li>
  <li><strong>Callback</strong> functions with dynamic context</li>
  <li>The function will be used as a <code>constructor</code></li>
  <li>The <code>return expression</code> statement needs to be explicit</li>
  <li>Need to access the <code>arguments</code> object of the function</li>
</ul>

