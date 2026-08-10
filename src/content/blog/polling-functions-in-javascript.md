---
postNumber: 4
title: '2 useful Polling functions in JavaScript'
date: 2020-10-10 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '/images/blog/polling-functions-in-javascript/polling-functions-in-javascript.jpg'
description: "JavaScript polling functions help us to write code which will not be executed unless a certain condition meets"
tags:
- JavaScript
---

Sometimes we need to wait for something to be happened in a webpage or web application before we execute a code or call a function or do something else.

By something I mean:

- rendering of a HTML element
- a JavaScript event
- response from API

and many other things.

Let's see how to write a couple of functions to tackle these scenarios:

## Poling function 1: _wait for HTML element_

```javascript
var waitForElement = function(elem) {
  if (typeof  elem  ==  'string') {
    return  new Promise(function (resolve) {
      var  wfelem  =  function () {
        if (null  !=  document.querySelector(elem)) {
          resolve(document.querySelector(elem));
        } else {
          window.requestAnimationFrame(wfelem);
        }
      };
      wfelem();
    });
  }
};
```

We can use the above poling function when we need to wait for a certain HTML element.

### Example:

```javascript
waitForElement('button#addToCart').then(function(button) {
  button.textContent = 'Buy Now';
});
```

## Poling function 2: _wait until a function returns true_

```javascript
var waitUntil = function(callback) {
  if (typeof callback === 'function') {
    return new Promise(function(resolve, reject) {
      var tick = setInterval(function() {
        if (callback() === true) {
          clearInterval(tick);
          return resolve();
        }
      });
    });
  } else {
    console.error(callback + ' should be a function');
  }
};
```

We can use the above function to wait until one or more conditions meet the criteria before further execution of the code.

### Example:

```javascript
  window.waitUntil(function () {
    return "complete" == document.readyState;
    }).then(function () {
      console.log("Page loading complete!");
  });
```
