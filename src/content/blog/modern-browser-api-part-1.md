---
postNumber: 3
title: 'Modern Browser APIs - Part 1'
date: 2020-10-03 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '/images/blog/modern-browser-api/modern-browser-api.jpg'
description: "The modern browsers have created a handful of APIs which can help the developers to build applications that can perform better, work offline, and provide a better user experience."
tags:
- JavaScript
- Browser API
---

The modern browsers have created a handful of APIs which can help the developers to build applications that can perform better, work offline, and provide a better user experience.

Today we are going to explore 5 APIs of Modern Browsers that we can use for web applications development and save ourselves from a lot works and troubles:

1. Window.requestAnimationFrame
2. Resource Prefetch
3. Resource Preload
4. Navigator.sendBeacon
5. Intersection Observer

## Window.requestAnimationFrame

`Window.requestAnimationFrame()` api can be used to call a function every time display frame changes/updates which is approximately 60 per second or more. Using this method we can create a smooth animation or make a polling function.

`requestAnimationFrame` has the following benefits:

1. Browser has the ability to optimize the performance
2. Execution will be stopped for the inactive browser tabs
3. More accurate than setTimeout/setInterval

### Demo:

```javascript
function animate() {

// your code goes here

//the will be called repeatedly by requestAnimationFrame
  requestAnimationFrame(animate);
}
// Intial call to the function
animate();
```

We also can stop animation using the `window.cancelAnimationFrame` method:

```javascript
  window.cancelAnimationFrame(animate);
```

### A polling function to wait for an HTML element using `requestAnimationFrame` :

```javascript
const waitForElement = function (elem) {
  if (typeof elem === 'string') {
      return new Promise(function (resolve) {
          var wfelem = function () {
              if (null != document.querySelector(elem)) {
                  resolve(document.querySelector(elem));
              } else {
                  window.requestAnimationFrame(wfelem);
              }
          };
          wfelem();
      });
  }
};

// You can use the function in following way:

waitForElement('body').then(function(body){
  body.style.background = 'red';
});
```

## Resource Prefetch

**Resource prefetching** is a technique that we can use to tell the browser to download a page or resource even before the users are going to access them. This technique can be used for the pages that the users are most likely going to visit.

The browser will download and cache the resource in the background with a low priority, so it won't interfere with more important resources.

```markdown
  <link rel="prefetch" href="/your-resource-link" />
```

## Resource Preload

**Resource preloading** is similar to **Resource prefetching** but the difference is that **Prefetching** is a way to tell the browser what resource to download that likely to be accessed on the next navigation and **Preloading** is to load a resource that will be needed for the current page.

The syntax is similar but we also need to provide the resource type in `as` attribute.

```markdown
  <link rel="preload" href="/images/background.jpg" as="image" />
```

## Navigator.sendBeacon

Sometimes we may need to send data to server when a visitor leaves a page. When a user leaves a page, JavaScript fires an event called `unload` and it is not an easy task to send an **Ajax** request during this event.

We can use `XMLHttpRequest` in an `unload` handler. But it will prevent the browser to load the next page until the request is completed.

```javascript
window.addEventListener("unload", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/log", false); // third parameter of `false` means synchronous
  xhr.send(data);
});
```

But `Navigator.sendBeacon()` is here to solve that problem. This method is useful when you need to send a data through **Ajax** but don't expect a response. And the request is executed **asynchronously** when the browser gets a chance to send the data during the idle processing time.

`Navigator.sendBeacon()` takes **two** parameters: first one is the **url** and second one is the **data**. The function will return a `true` response when the data is successfully sent to server or `false` if the request isn't successful.

```javascript
window.addEventListener("unload", function() {
  if (navigator.sendBeacon) {
    // Send the beacon
    var status = navigator.sendBeacon(url, data);
    // Log the result
    console.log(status);
  }
};
```

## Intersection Observer

It is hard to find a Developer who didn't write/use a code to check if **_an element is visible in the viewport_**.

We usually create a function and attach it to the `scroll` event and check if the target element pops up in the screen. Check the following snippet in **jQuery**:

```javascript
$(window).scroll(function() {
  var top_of_element = $("#element").offset().top;
  var bottom_of_element = $("#element").offset().top + $("#element").outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();

  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
      // the element is visible, do something
  } else {
      // the element is not visible, do something else
  }
});
```

**_Whew!_** Lots of calculations is going on there which I have never been able to remember.

But, we now have `IntersectionObserver()` method which can save us from all of these troubles.

```javascript
const observer = new IntersectionObserver(function(elements) {
  console.log(elements);
});

observer.observe(document.querySelectorAll('p'));
```

The first argument of **IntersectionObserver** is a `function` that can take an array of HTML elements. There is a second optional argument that takes an object of options:

```javascript
const observer = new IntersectionObserver(function(elements) {
  elements.forEach(function(element) {
      if (element.intersectionRatio >= 0.5 && element.intersectionRatio < 1) {
          element.style.opacity = "0.5";
      } else if (element.intersectionRatio >= 1) {
          element.style.opacity = "1";
      }
  });
}, {
  // You can use a single value
  threshold: 0.5 // The observer's callback will be once the target element is 50% visible
  // Or you can use an array of value
  threshold: [0.5, 1.0] // The callback will run when target element is 50% and 100% visible
});

observer.observe(document.querySelectorAll('p'));
```
