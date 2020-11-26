---
posttype: 'blog'
title: '2 useful Polling functions in JavaScript'
date: 2020-10-10 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/polling-functions-in-javascript.jpg'
postdescription: "JavaScript polling functions help us to write code which will not be executed unless a certain condition meets"
tags:
- JavaScript
---

Sometimes we need to wait for something to be happened in a webpage or web application before we execute a code or call a function or do something else.

<p>By something I mean:</p>
<ul class="point-list">
  <li>rendering of a HTML element</li>
  <li>a JavaScript event</li>
  <li>response from API</li>
</ul>

<p>and many other things.</p>
<p>Let's see how to write a couple of functions to tackle these scenarios:</p>

<h5>Poling function 1: <em>wait for HTML element</em></h5>

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

<p>We can use the above poling function when we need to wait for a certain HTML element.</p>

<h6>Example:</h6>

```javascript
waitForElement('button#addToCart').then(function(button) {
  button.textContent = 'Buy Now';
});
```

<h5>Poling function 2: <em>wait until a function returns true</em></h5>

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

<p>We can use the above function to wait until one or more conditions meet the criteria before further execution of the code.</p>

<h6>Example:</h6>

```javascript
  window.waitUntil(function () {
    return "complete" == document.readyState;
    }).then(function () {
      console.log("Page loading complete!");
  });
```