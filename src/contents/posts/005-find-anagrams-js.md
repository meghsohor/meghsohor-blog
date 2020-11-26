---
posttype: 'blog'
title: 'JS Coding Challenge: Find Anagrams'
date: 2020-10-12 12:00:00
author: 'Shafiqul Islam Shuvo'
image: '../../images/find-anagrams-js-coding-challenge.jpg'
postdescription: "JavaScript polling functions help us to write code which will not be executed unless a certain condition meets"
tags:
- JavaScript
---

> An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once - from **Wikipedia**.


<h5 class="post-subheading">Challenge</h5>

<p>Given an array of words, we need to write a function which will take two parameters. First parameter is a word and the second parameter is the array of the words. The function will return an array consisting of the anagrams of the word passed as the first parameter from the array of words passed as the second parameter.</p>

<h6>Example:</h6>

```javascript
const words = ['mountain', 'anatomy', 'anemic', 'boldness', 'cinema',
  'iceman', 'machine', 'mechanic', 'elbow', 'below', 'state', 'taste',
  'dusty', 'night', 'study', 'thing', 'search', 'arches', 'chaser',
  'animal', 'manila', 'icewoman'];

const findAnagrams = (word, allWords) => {
  // Write the code here
};

console.log(findAnagrams('cinema', words));

/* 
  Expected output: ['anemic', 'iceman'];
*/
```

<h6>Notes:</h6>
<ol class="number-list">
  <li>All the words in the returned result should have the same length as the given word. Example: <strong>iceman</strong> and <strong>icewoman</strong> are not anagrams. Even though <strong>iceman</strong> has every letter as in <strong>icewoman</strong> but <strong>icewoman</strong> has extra letters in it which <strong>iceman</strong> doesn't have.</li>
  <li>The word passed as first parameter should not be included in the returned array. As in the code above you can see that <strong>cinema</strong> is not included in the expected output.</li>
</ol>


<h5 class="post-subheading">Algorithm</h5>

<ol class="number-list">
  <li>First, we need to find the total count of each letter in the word. Example: in <strong>cinema</strong> each letter has a total count of 1</li>
  <li>Then, we need to loop through each word in the array of words and follow the <strong>Step 1</strong> for each.</li>
  <li>Then, we need compare the count of each letter between the given word and the current word in the iteration.</li>
  <li>If the current word matches with the given word in terms of the letter and letter counts, we will push that word in the
  result array.</li>
  <li>Follow <strong>Step 2</strong> to <strong>Step 4</strong> until the end of the words array</li>
</ol>

<h5 class="post-subheading">Solution</h5>

<p>First, we will write a <code>helper</code> function which takes a word converted to an array of letters and will give back an <code>object</code> consisting of each letter in the word as the <code>keys</code> and the total counts of each letter as the <code>value</code>:</p>

```javascript
const numberOfEachLetter = (letters) => {
  return letters.reduce((acc, letter) => ({
    ...acc,
    [letter]: acc[letter] ? acc[letter] + 1 : 1,
  }), {});
};
```

<p>In the above function we are using <code>Array.reduce()</code> function to create an object of the letters and the count of each letter as the value. We are initiating the <code>.reduce()</code> function with an empty <code>object{}</code> which is provided as the second argument of the function. 
<br>
And, in each iteration we are using the ES6 <strong>spread</strong> operator to get the previous value from and set updated value to <code>accumulator</code>. And then, using a <code>ternary</code> operator, we are checking if the current letter is already in the <code>accumulator</code> or not. If it is, then we are incrementing the count, otherwise we are setting 1 as the count value.</p>

<p>We can call the function like this:</p>

```javascript
const word = 'cinema';
numberOfEachLetter(word.split(''));
// Output
{
  a: 1,
  c: 1,
  e: 1,
  i: 1,
  m: 1,
  n: 1
}
```

<p>Now, we will write another function which can compare between two words using the above <code>numberOfEachLetter</code> function:</p>

```javascript
const hasSameLetterCount = (word1, word2) => {
  const word1Count = numberOfEachLetter(word1.split(''));
  const word2Count = numberOfEachLetter(word2.split(''));

  return word1.length == word2.length && 
    Object.keys(word1Count)
      .every(letter => word1Count[letter] === word2Count[letter]);
};
```


<p>Firstly, here we are getting the objects of letter counts for both words using the <code>hasSameLetterCount</code> function. Then, we are comparing the length of the two words to make sure that they have exact number of letters. 
<br>
And finally, we are, using the <code>Object.keys()</code>, iterating through each letter of the first word and comparing to the letters of second word to check if the letters are same and have the same number of occurrence. 
<br>
Using the <code>Array.every()</code> function we are checking that every letter and the count of the letters matches. Otherwise, the function will return <code>false</code>.</p>

<p>Okay, enough with the helper functions. Let's checkout the final function now:</p>

```javascript
const findAnagrams = (word, allWords) => {
  const anagrams = allWords.filter(item => {
    return word !== item && hasSameLetterCount(word, item);
  });
  return anagrams;
};
```

<p>Here, using the <code>Array.filter()</code> function, we are iterating through each <strong>word</strong> in the <strong>words array</strong> and checking if the <strong>current word</strong> doesn't match with the given word and then sending the both words to the <code>hasSameLetterCount</code> function to check if they are matched to be <strong>anagrams</strong>. And finally returning the array of the <strong>filtered words</strong> that match with the criteria.</p>

<p>Does the final function look fat? Here is the slim version using the magic of <strong>ES6</strong>:</p>

```javascript
const findAnagrams = (word, allWords) => allWords
  .filter(item => word !== item &&
    hasSameLetterCount(word, item));
```
