---
posttype: 'blog'
title: 'RxJS - ajax & fromFetch operators'
date: 2021-01-29 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/rxjs-ajax-fetchapi.jpg'
postdescription: "The ajax and fromFetch are two RxJS operators that can be used to get data from or send data to the servers."
tags:
- RxJS
- JavaScript
---

CRUD operations are fundamental features of any modern website or web application. Almost everyday we need to write code in the Front-End to communicate with the servers through the HTTP protocol (mostly consume data from REST Apis).

To communicate with the servers we mostly use <strong>Fetch</strong> api or <strong>Axios</strong>.

<br>
<h5 class="post-subheading">Fetch API</h5>

<strong>Fetch</strong> is a built-in api of modern browsers and the problem with the <strong>Fetch</strong> api is that the HTTP request made through <strong>Fetch</strong> api isn't cancelable. There is a workaround though - we can use <code>AbortController</code> to cancel a request. But <code>AbortController</code> isn't still widely supported.

Moreover, <strong>Fetch</strong> api doesn't have protection against <strong>XSRF</strong> attack.

```javascript
fetch('url') 
  .then((response) => { 
  
    // Code for handling the response 
  }) 
  .catch((error) => { 
  
    // Code for handling the error 
  });
```

<br>
<h5 class="post-subheading">Axios</h5>

<strong>Axios</strong> is a Javascript library used to make HTTP requests and it supports the ES6 <strong>Promise</strong> API. It also has client-side protection against <strong>XSRF</strong>. And we can cancel the HTTP requests using <strong>Axios</strong>.

```javascript
axios.get('url') 
  .then((response) => { 
  
    // Code for handling the response 
  }) 
  .catch((error) => { 
  
    // Code for handling the error 
  }) 
```

<br>

<strong>RxJS</strong> has a couple of operators that we can use to make HTTP requests. And the benefits of using RxJS operators are:

<ul class="check-list">
  <li><strong>RxJS</strong> operators return a stream of observables instead of a single promise</li>
  <li><strong>RxJS</strong> operators are lazy. So, no HTTP request will be made until we subscribe to the observable</li>
  <li>The request is cancelable</li>
  <li>Safe against XSRF</li>
  <li>Tons of other powerful RxJS operators to customize the HTTP request or manipulate the data returned from the request</li>
</ul>

<br>

<h5 class="post-subheading">RxJS/ajax</h5>

<strong>RxJS/ajax</strong> creates an observable for an <strong>Ajax</strong> request with either a request object with url, headers, etc or a string for a URL.

```javascript
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const observable$ = ajax('url').pipe(
  map(response => console.log(response)),
  catchError(error => {
    return throwError(error);
  })
);

// Subscribing to observable
const subscription = observable$.subscribe({
  next: (data) => console.log(data),
  error: (err) => console.error(err),
  complete: () => console.log('Request is complete')
});

// Unsubscribing from the observable
subscription.unsubscribe();
```

<br>

<h5 class="post-subheading">RxJS/fromFetch</h5>
<strong>fromFetch</strong> uses the <strong>Fetch</strong> api to make an HTTP request.

```javascript
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
 
const data$ = fromFetch('url').pipe(
 switchMap(response => {
   if (response.ok) {
     // OK return data
     return response.json();
   } else {
     // Server is returning a status requiring the client to try something else.
     return of({ error: true, message: `Error ${response.status}` });
   }
 }),
 catchError(err => {
   // Network or other error, handle appropriately
   console.error(err);
   return of({ error: true, message: err.message })
 })
);
 
data$.subscribe({
 next: result => console.log(result),
 complete: () => console.log('done')
});
```

<div class="alert alert-warning">
<strong>WARNING:</strong> Parts of the <strong>Fetch</strong> API are still experimental. <strong>AbortController</strong> is required for this implementation to work and use cancellation appropriately.
</div>

<div class="alert alert-info">
<strong>fromFetch</strong> will automatically set up an internal <strong>AbortController</strong> in order to teardown the internal fetch when the subscription tears down.
</div>