---
posttype: 'blog'
title: 'Modern Browser APIs - Part 1'
date: 2020-11-12 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/modern-browser-api.jpg'
postdescription: "The modern browsers have created a handful of APIs which can help the developers to build applications that can perform better, work offline, and provide a better user experience."
tags:
- JavaScript
- Browser API
---

The modern browsers have created a handful of APIs which can help the developers to build applications that can perform better, work offline, and provide a better user experience.

<p>Today we are going to explore 5 APIs of Modern Browsers that we can use for web applications development and save ourselves from a lot works and troubles:</p>

<ol>
  <li>Window.requestAnimationFrame</li>
  <li>Resource Prefetch</li>
  <li>Resource Preload</li>
  <li>Navigator.sendBeacon</li>
  <li>Intersection Observer</li>
</ol>

<h5 class="post-subheading">Window.requestAnimationFrame</h5>
<p><code>Window.requestAnimationFrame()</code> api can be used to call a function every time display frame
  changes/updates which is approximately 60 per second or more. Using this method we can create a smooth animation or
  make a polling function.</p>

<p><code>requestAnimationFrame</code> has the following benefits:</p>

<ol>
  <li>Browser has the ability to optimize the performance</li>
  <li>Execution will be stopped for the inactive browser tabs</li>
  <li>More accurate than setTimeout/setInterval</li>
</ol>

<h6>Demo:</h6>

<pre class="snippet">
function animate() {

// your code goes here

//the will be called repeatedly by requestAnimationFrame
  requestAnimationFrame(animate);
}
// Intial call to the function
animate();
</pre>

<p>We also can stop animation using the <code>window.cancelAnimationFrame</code> method:</p>

<pre class="snippet">
  window.cancelAnimationFrame(animate);
</pre>

<h6>A polling function to wait for an HTML element using <code>requestAnimationFrame</code> :</h6>

<pre class="snippet">
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
</pre>



<h5 class="post-subheading">Resource Prefetch</h5>
<p><strong>Resource prefetching</strong> is a technique that we can use to tell the browser to download a page or resource even before the users are going to access them. This technique can be used for the pages that the users are most likely going to visit.</p>

<p>The browser will download and cache the resource in the background with a low priority, so it won't interfere with more important resources.</p>

<pre class="snippet">
  &lt;link rel="prefetch" href="/your-resource-link" /&gt;
</pre>


<h5 class="post-subheading">Resource Preload</h5>

<p><strong>Resource preloading</strong> is similar to <strong>Resource prefetching</strong> but the difference is that <strong>Prefetching</strong> is a way to tell the browser what resource to download that likely to be accessed on the next navigation and <strong>Preloading</strong> is to load a resource that will be needed for the current page.</p>
<p>The syntax is similar but we also need to provide the resource type in <code>as</code> attribute.</p>

<pre class="snippet">
  &lt;link rel="preload" href="/images/background.jpg" as="image" /&gt;
</pre>


<h5 class="post-subheading">Navigator.sendBeacon</h5>

<p>Sometimes we may need to send data to server when a visitor leaves a page. When a user leaves a page, JavaScript fires an event called <code>unload</code> and it is not an easy task to send an <strong>Ajax</strong> request during this event.
<br>
We can use <code>XMLHttpRequest</code> in an <code>unload</code> handler. But it will prevent the browser to load the next page until the request is completed.</p>

<pre class="snippet">
window.addEventListener("unload", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/log", false); // third parameter of `false` means synchronous
  xhr.send(data);
});
</pre>

<p>But <code>Navigator.sendBeacon()</code> is here to solve that problem. This method is useful when you need to send a data through <strong>Ajax</strong> but don't expect a response. And the request is executed <strong>asynchronously</strong> when the browser gets a chance to send the data during the idle processing time.</p>

<p><code>Navigator.sendBeacon()</code> takes <strong>two</strong> parameters: first one is the <strong>url</strong> and second one is the <strong>data</strong>. The function will return a <code>true</code> response when the data is successfully sent to server or <code>false</code> if the request isn't successful.</p>

<pre class="snippet">
window.addEventListener("unload", function() {
  if (navigator.sendBeacon) {
    // Send the beacon
    var status = navigator.sendBeacon(url, data);
    // Log the result
    console.log(status);
  }
};
</pre>


<h5 class="post-subheading">Intersection Observer</h5>

<p>It is hard to find a Developer who didn't write/use a code to check if <strong><em>an element is visible in the viewport</em></strong>.</p>
<p>We usually create a function and attach it to the <code>scroll</code> event and check if the target element pops up in the screen. Check the following snippet in <strong>jQuery</strong>:</p>

<pre class="snippet">
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
</pre>

<p><strong><em>Whew!</em></strong> Lots of calculations is going on there which I have never been able to remember. 
<br>
But, we now have <code>IntersectionObserver()</code> method which can save us from all of these troubles.</p>

<pre class="snippet">
const observer = new IntersectionObserver(function(elements) {
  console.log(elements);
});

observer.observe(document.querySelectorAll('p'));
</pre>

<p>The first argument of <strong>IntersectionObserver</strong> is a <code>function</code> that can take an array of HTML elements. There is a second optional argument that takes an object of options:</p>

<pre class="snippet">
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
</pre>