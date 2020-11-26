---
posttype: 'blog'
title: 'Swipe function for touch-devices in Vanilla JS'
date: 2020-10-20 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/touch-swipe-function-javascript.jpg'
postdescription: "Swipe function for touch-devices in Vanilla JS"
tags:
- JavaScript
---

When we need to implement **Swipe** functionality for touch devices, we usually use *_plugins_*. But we can write **touch-swipe** functionality in **Vanilla JS** which supports all the browsers without using any plugin.

<p>First We will see the whole function and then we will break the function into small pieces and will talk about the pieces:</p>


```javascript
var  Swipe  = (function () {
  function  Swipe(element) {
    this.xDown  =  null;
    this.yDown  =  null;
    this.element  =  typeof (element) ===  'string'  ?  document.querySelector(element) :  element;
    this.element.addEventListener('touchstart', function (evt) {
      this.xDown  =  evt.touches[0].clientX;
      this.yDown  =  evt.touches[0].clientY;
    }.bind(this), false);
  }

  Swipe.prototype.onLeft  =  function (callback) {
    this.onLeft  =  callback;
    return this;
  };
  Swipe.prototype.onRight  =  function (callback) {
    this.onRight  =  callback;
    return this;
  };
  Swipe.prototype.onUp  =  function (callback) {
    this.onUp  =  callback;
    return this;
  };
  Swipe.prototype.onDown  =  function (callback) {
    this.onDown  =  callback;
    return this;
  };

  Swipe.prototype.handleTouchMove  =  function (evt) {
    if (!this.xDown  ||  !this.yDown) {
      return;
    }
    var  xUp  =  evt.touches[0].clientX;
    var  yUp  =  evt.touches[0].clientY; 
    this.xDiff  = this.xDown  -  xUp;
    this.yDiff  = this.yDown  -  yUp;

    if (Math.abs(this.xDiff) !==  0) {
      if (this.xDiff  >  2) {
        typeof (this.onLeft) ===  "function"  && this.onLeft();
      } else  if (this.xDiff  <  -2) {
        typeof (this.onRight) ===  "function"  && this.onRight();
      }
    }

    if (Math.abs(this.yDiff) !==  0) {
      if (this.yDiff  >  2) {
        typeof (this.onUp) ===  "function"  && this.onUp();
      } else  if (this.yDiff  <  -2) {
        typeof (this.onDown) ===  "function"  && this.onDown();
      }
    }
    // Reset values.
    this.xDown  =  null;
    this.yDown  =  null;
  };

  Swipe.prototype.run  =  function () {
    this.element.addEventListener('touchmove', function (evt) {
      this.handleTouchMove(evt);
    }.bind(this), false);
  };

  return  Swipe;
}());
```


<p>Lets first discuss about the inner <code>Swipe</code> function</p>

```javascript
function  Swipe(element) {
  this.xDown  =  null;
  this.yDown  =  null;
  this.element  =  typeof (element) ===  'string'  ?  document.querySelector(element) :  element;
  this.element.addEventListener('touchstart', function (evt) {
    this.xDown  =  evt.touches[0].clientX;
    this.yDown  =  evt.touches[0].clientY;
  }.bind(this), false);
}
```

This function has the same name as the Root **Swipe** function. Because of that, when we will call the root function, the inner **Swipe** function will be initiated. In this function we are setting up the `touchstart` event for the `target` element. And we are capturing the `clientX` and `clientY` values from the `touchstart` event and assigning those values to `xDown` and `yDown` properties.

Now we will add the functions for each **_swipe direction_**:

```javascript
Swipe.prototype.onLeft  =  function (callback) {
  this.onLeft  =  callback;
  return this;
};
Swipe.prototype.onRight  =  function (callback) {
  this.onRight  =  callback;
  return this;
};
Swipe.prototype.onUp  =  function (callback) {
  this.onUp  =  callback;
  return this;
};
Swipe.prototype.onDown  =  function (callback) {
  this.onDown  =  callback;
  return this;
};
```

Then we will add the function to detect the **_swipe direction_**

```javascript
Swipe.prototype.handleTouchMove = function (evt) {
  if (!this.xDown || !this.yDown) { return; } 
  var xUp = evt.touches[0].clientX; 
  var yUp = evt.touches[0].clientY; 
  this.xDiff = this.xDown - xUp; 
  this.yDiff = this.yDown - yUp; 

  //Swipe Left or Right 
  if (Math.abs(this.xDiff) !== 0) {
    if (this.xDiff > 2) {
      typeof (this.onLeft) === "function" && this.onLeft(); 
    } else if (this.xDiff < -2) {
      typeof (this.onRight) === "function" && this.onRight(); 
    } 
  }
  if (Math.abs(this.yDiff) !== 0) {
    if (this.yDiff > 2) {
      typeof (this.onUp) === "function" && this.onUp(); 
    } else if (this.yDiff < -2) {
      typeof (this.onDown) === "function" && this.onDown(); 
    } 
  }
  this.xDown = null;
  this.yDown = null; 
};
```

<p>In this function, we are tracking the <strong>swipe distance</strong> and the <strong>swipe direction</strong>. Based on the swipe <strong>direction</strong>, we are calling the respective <strong>swipe-direction</strong> function: <code>onLeft</code>, <code>onRight</code>, <code>onUp</code> and <code>onDown</code>.</p>

> **Note:** In the `if` conditions, we are checking if the **distance** is `> 2` or `< -2`, because it might happen that when the user _swipes_ on a **horizontal** direction, there might also be a slight **vertical** movement. And for this movement, the **vertical swipe** functions will be triggered. That is why, we are checking if the swipe distance is `> 2` or `< -2` for an extra bit of safety.

The **`run`** function:


```javascript
Swipe.prototype.run  =  function () {
  this.element.addEventListener('touchmove', function (evt) {
    this.handleTouchMove(evt);
  }.bind(this), false);
};
```

Here, we are adding an **event-listener** for `touchmove` event for the target element. The `handleTouchMove` function will be called once the `touchmove` event fires.

<h5 class="post-subheading">How to use</h5>

First, we will create a new **object** of the function and provide the **target element** as the `parameter`

```javascript
var swiper = new Swipe('your-target-element');
```

Then we will call any of the **swipe directional** functions (`onLeft`, `onRight`, `onUp` and `onDown`) as per our need and inside the `callback` function we will write our code:

```javascript
swiper.onLeft(function() {
  //Your code goes here
});
```

<h6>Finally run the function:</h6>

```javascript
swiper.run();
```

> **Note:** this function will work only in the touch devices. You can use browser's **Developer Tools** to switch device that supports touch events and can check the function in there