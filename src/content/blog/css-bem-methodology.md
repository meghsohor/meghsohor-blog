---
postNumber: 8
title: 'CSS BEM Methodology'
date: 2020-11-11 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '/images/blog/css-bem-methodology/css-bem-methodology.png'
description: "BEM Methodology is a popular naming convention for classes in HTML and CSS"
tags:
- CSS
- BEM
---

The **BEM** methodology (Block, Element, Modifier) is a popular naming convention for classes in HTML and CSS.

It is less confusing comparing to the other methods (i.e. **SMACSS**) but still provides a good architecture with a recognizable terminology.

## 3 principle elements of BEM

- **Block**: Container, Wrapper, Layout elements

**Example:** `.form`, `.menu`

- **Element**: Child of a Block element

**Example:** `.form__input`, `.menu__item`

- **Modifier**: can change the appearance of a Block or Element

**Example:** `.form__input--disabled`, `.menu__item--active`

## Rules of BEM

- HTML **tag** or **ID** selector shouldn't be used
- **Elements** are namespaced using the **Block** names and separated by `__` (double underscores)
- **Modifiers** are separated by `—-` (double hyphens)

## Benefits of using BEM

- **BEM** is hugely adopted and one of the most popular methodology for writing CSS
- **BEM** helps to build a solid structure that remains simple and easy to understand.
- Because of strict naming conventions, there is less possibility to run into conflicts with CSS names
- Everything is a **class** and nothing is nested, so won't have to face **specificity** related issues.
- The Prolonged naming convention can reduce the readability of the code but it helps to understand the role of each element.
