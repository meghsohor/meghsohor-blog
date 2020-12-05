---
posttype: 'blog'
title: 'CSS BEM Methodology'
date: 2020-11-11 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/css-bem-methodology.png'
postdescription: "BEM Methodology is a popular naming convention for classes in HTML and CSS"
tags:
- CSS
- BEM
---

The **BEM** methodology (Block, Element, Modifier) is a popular naming convention for classes in HTML and CSS.



It is less confusing comparing to the other methods (i.e. **SMACSS**) but still provides a good architecture with a recognizable terminology.

<br>

<h5 class="post-subheading">3 principle elements of BEM</h5>

<ul class="point-list mb-1">
  <li><strong>Block</strong>: Container, Wrapper, Layout elements</li>
</ul>

**Example:** `.form`, `.menu`

<ul class="point-list mb-1">
  <li><strong>Element</strong>: Child of a Block element</li>
</ul>

**Example:** `.form__input`, `.menu__item`

<ul class="point-list mb-1">
  <li><strong>Modifier</strong>: can change the appearance of a Block or Element</li>
</ul>

**Example:** `.form__input--disabled`, `.menu__item--active`

<br>

<h5 class="post-subheading">Rules of BEM</h5>

<ul class="point-list">
  <li>HTML <strong>tag</strong> or <strong>ID</strong> selector shouldn't be used</li>
  <li><strong>Elements</strong> are namespaced using the <strong>Block</strong> names and separated by <code>__</code> (double underscores)</li>
  <li><strong>Modifiers</strong> are separated by <code>—-</code> (double hyphens)</li>
</ul>

<br>

<h5 class="post-subheading">Benefits of using BEM</h5>

<ul class="check-list">
  <li><strong>BEM</strong> is hugely adopted and one of the most popular methodology for writing CSS</li>
  <li><strong>BEM</strong> helps to build a solid structure that remains simple and easy to understand.</li>
  <li>Because of strict naming conventions, there is less possibility to run into conflicts with CSS names</li>
  <li>Everything is a <strong>class</strong> and nothing is nested, so won't have to face <strong>specificity</strong> related issues.</li>
  <li>The Prolonged naming convention can reduce the readability of the code but it helps to understand the role of each element.</li>
</ul>