---
postNumber: 1
title: "Use Regex in JavaScript to Improve Search Results"
date: 2019-09-02 10:00:00
author: "Shafiqul Islam Shuvo"
image: "/images/blog/javascript-search-regex/javascript-regex.jpg"
description: "How to implement search functionality using array.filter, string.include and regex in JavaScript"
tags:
  - JavaScript
  - Regex
---

Being able to accurately and efficiently filter search results based on a user’s input is vital for ensuring a positive and effective user experience. In this post, we will create a search bar using JavaScript, HTML and CSS. Given a list of names, we should be able to filter out names based on the user’s input.

A common way to achieve this is simply to use JavaScript’s `.filter()` function and check if any of the elements `.includes()` the user’s input.

```javascript
filterFunction = (userInput) =>{
  var filteredNames = names.filter((x)=>{ 
    return x.includes(userInput)
  }   
  return filteredNames
}
```

This function checks if the user’s input matches any part of any of the names in the array. If our array of names contains ‘Tom’, ‘Jerry’, ‘Larry’, ‘Barry’, and the user types in **‘T’**, the filtered list will only contain one name, because **‘Tom’** is the only name in the list that contains the letter **‘T’**.

This method is pretty effective, but it’s a bit restrictive because the user has to type the exact order of letters, otherwise no results will be returned. Say the user wants to find **Larry** from our list of names, but accidentally types **‘Lrary’**. Despite the fact that the letters are correct and the order is only off by one letter, the search results would turn up empty.

So in this post, we’re going to use **regex** in addition to `.includes()` in order to return more convenient results without compromising the search accuracy. First, let’s get our HTML and CSS ready.

We are using Bootstrap to setup the layout of the page. See below for the HTML:

```markdown
<div class="container">
  <h1 class="text-center title">All Star Wars Characters</h1>

  <div class="search-box">
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text"><i class="fa fa-search"></i></div>
      </div>
      <input type="text" class="form-control" placeholder="Search Heroes..." onkeyup="searchHeroes()">
    </div>
  </div>
  <div class="heroesContainer"></div>
</div>
```

And CSS:

```css
.title {
  font-size: 5vw;
  font-weight: 300;
  color: #989898;
  padding: 5rem 0 3rem;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.search-box {
  max-width: 500px;
  margin: 0 auto 2rem;
}

.heroesContainer {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
}

.heroesContainer > p {
  padding: 0.25rem 1rem;
  margin: 0.5rem;
  border: 1px solid #b6c5d2;
  border-radius: 2em;
  white-space: nowrap;
  background: #fff;
}

.heroesContainer > h6 {
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 100;
  color: red;
}
```

Now, onto the JavaScript.

The array we are going to use contains the list of names of all **432** characters from one of the greatest Movie Series, **Star Wars**.

```javascript
const heroes = ["2-1B","4-LOM","8D8","99","0-0-0","A'Koba","Admiral Gial Ackbar","Sim Aloo","Almec",
"Mas Amedda","Amee","Padmé Amidala","Cassian Andor","Fodesinbeed Annodue","Raymus Antilles","Wedge Antilles",
"AP-5","Queen Apailana","Doctor Chelli Lona Aphra","Faro Argyus","Aiolin and Morit Astarte","Ello Asty",
"Attichitcuk","AZI-3","Ponda Baba","Kitster Banai","Cad Bane","Darth Bane","Barada","Jom Barell",
"Moradmin Bast","BB-8","(puppeteers)","(consultants)","BB-9E","Tobias Beckett","Val Beckett","The Bendu",
"Shara Bey","Sio Bibble","Depa Billaba","Jar Jar Binks","Temiri Blagg","Commander Bly","Bobbajo",
"Dud Bolt","Mister Bones","Lux Bonteri","Mina Bonteri","Borvo the Hutt","Bossk","Ezra Bridger","BT-1",
"Sora Bulq","C1-10P","C-3PO","Lando Calrissian","Moden Canady","Ransolm Casterfo","Chewbacca","Chief Chirpa",
"Rush Clovis","Commander Cody","Lieutenant Kaydel Ko Connix","Jeremoch Colton","Cordé","Salacious B. Crumb",
"(puppeteer)","Arvel Crynyd","Dr. Cylo","Larma D'Acy","Figrin D'an","Kes Dameron","Poe Dameron","Vober Dand",
"Joclad Danva","Dapp","Biggs Darklighter","Oro Dassyne","Gizor Dellso","Dengar","Bren Derlin","Ima-Gun Di",
"Rinnrivin Di","Tan Divo","DJ","Lott Dod","Jan Dodonna","Daultay Dofine","Dogma","Dormé","Cin Drallig",
"Garven Dreis","Droidbait","Rio Durant","Lok Durd","Eirtaé","Dineé Ellberger","Ellé","Caluan Ematt","Embo",
"Emperor's Royal Guard","Jas Emari","Ebe E. Endocott","Galen Erso","Jyn Erso","Lyra Erso","EV-9D9","Moralo Eval",
"Cornelius Evazan","Onaconda Farr","Boba Fett","Jango Fett","Feral","Commander Fil","Finn","Kit Fisto",
"Fives","FN-1824","FN-2003","FN-2199","Bib Fortuna","Commander Fox","FX-7","GA-97","Adi Gallia","Gardulla the Hutt",
"Yarna d'al' Gargan","Garindan","Gasgano","Saw Gerrera","Gonk droid","Commander Gree","Greedo","Janus Greejatus",
"Captain Gregor","General Grievous","Grummgar","Gungi","Nute Gunray","Mars Guo","Rune Haako","Hardcase",
"Rako Hardeen","Gideon Hask","Hevy","San Hill","Clegg Holdfast","Vice Admiral Amilyn Holdo","Tey How","Huyang",
"Armitage Hux","Brendol Hux","IG-88","Chirrut Îmwe","Inquisitors","Grand Inquisitor","Fifth Brother","Sixth Brother",
"Seventh Sister","Eighth Brother","Sidon Ithano","Jabba the Hutt","(puppeteers)","Queen Jamillia","Wes Janson",
"Kanan Jarrus","Jaxxon","Greeata Jendowanian","Tiaan Jerjerrod","Commander Jet","Dexter Jettster","Qui-Gon Jinn",
"Jira","Jubnuk","K-2SO","Tee Watt Kaa","General Kalani","Agent Kallus","Harter Kalonia","Maz Kanata","Colonel Kaplan",
"Karbin","Karina the Great","Alton Kastle","King Katuunko","Coleman Kcaj","Obi-Wan Kenobi","Ki-Adi-Mundi","Klaatu",
"Klik-Klak","Derek 'Hobbie' Klivian","Agen Kolar","Plo Koon","Eeth Koth","Sergeant Kreel","Pong Krell",
"Black Krrsantan","Bo-Katan Kryze","Satine Kryze","Conder Kyl","Thane Kyrell","L3-37","L'ulo L'ampar",
"Beru Whitesun Lars","Cliegg Lars","Owen Lars","Cut Lawquane","Tasu Leech","Xamuel Lennox","Tallissan 'Tallie' Lintra",
"Slowen Lo","Lobot","Logray","Lumat","Crix Madine","Shu Mai","Malakili","Baze Malbus","Mama the Hutt","Ody Mandrell",
"Darth Maul","Saelt-Marae ('Yak Face')","Mawhonic","Droopy McCool","Pharl McQuarrie","ME-8D9","Lyn Me","Tion Medon",
"Del Meeko","Aks Moe","Sly Moore","Morley","Delian Mors","Mon Mothma","Conan Antonio Motti","Jobal Naberrie",
"Pooja Naberrie","Ruwee Naberrie","Ryoo Naberrie","Sola Naberrie","Momaw Nadon","(puppeteers)","Boss Rugor Nass",
"Lorth Needa","Queen Neeyutnee","Enfys Nest","Bazine Netal","Niima the Hutt","Jocasta Nu","Po Nudo","Nien Nunb",
"(puppeteer)","Has Obbit","Barriss Offee","Hondo Ohnaka","Ric Olié","Omi","Ketsu Onyo","Oola","OOM-9","Savage Opress",
"Bail Organa","Breha Organa","Leia Organa","Garazeb 'Zeb' Orrelios","Orrimaarko ('Prune Face')","Admiral Kendal Ozzel",
"Odd Ball","Pablo-Jill","Teemto Pagalies","Jessika 'Jess' Testor Pava","Captain Quarsh Panaka","Casca Panzoro",
"Reeve Panzoro","Baron Papanoida","Che Amanwe Papanoida","Chi Eekway Papanoida","Paploo","Captain Phasma","Even Piell",
"Admiral Firmus Piett","Darth Plagueis","Sarco Plank","Unkar Plutt","Poggle the Lesser","Yarael Poof","Jek Tono Porkins",
"Nahdonnis Praji","PZ-4CO","Ben Quadinaros","Qi'ra","Quarrie","Quiggold","R2-D2","R2-KT","R3-S6","R4-P17",
"R5-D4","RA-7 ('Death Star droid')","Rabé","Admiral Raddus","Dak Ralter","Oppo Rancisis","Admiral Dodd Rancit",
"Rappertunie","Sinjir Rath Velus","Gallius Rax","Eneb Ray","Max Rebo","Ciena Ree","Ree-Yees","Kylo Ren","Captain Rex",
"Rey","Carlist Rieekan","Riley","Rogue Squadron","Romba","Bodhi Rook","Pagetti Rook ('Weequay')","Rotta the Hutt",
"Rukh","Sabé","Saché","Admiral U.O. Statura","Joph Seastriker","Miraj Scintel","Admiral Terrinald Screed","Sebulba",
"Aayla Secura","Korr Sella","Zev Senesca","Echuu Shen-Jon","Sifo-Dyas","Aurra Sing","Luke Skywalker","Shmi Skywalker",
"The Smuggler","Snaggletooth","Supreme Leader Snoke","Sy Snootles","(puppeteer)","Osi Sobeck","Han Solo","Greer Sonnel",
"Sana Starros","Lama Su","Shriv Suurgav","Mercurial Swift","Gavyn Sykes","Cham Syndulla","Hera Syndulla","Jacen Syndulla",
"Orn Free Taa","Cassio Tagge","Mother Talzin","Wat Tambor","Riff Tamson","Ahsoka Tano","Tarfful","Jova Tarkin",
"Grand Moff Wilhuff Tarkin","Roos Tarpals","TC-14","Berch Teller","Teebo","Teedo","Mod Terrik","Tessek","Lor San Tekka",
"Petty Officer Thanisson","Inspector Thanoth","Lieutenant Thire","Grand Admiral Thrawn","C'ai Threnalli",
"Shaak Ti","Paige Tico","Rose Tico","Saesee Tiin","Bala-Tik","Meena Tills","Quay Tolsite","Bargwill Tomder",
"Wag Too","Coleman Trebor","Admiral Trench","Strono Tuggs","Tup","Letta Turmond","Longo Two-Guns","Gregar Typho",
"Ratts Tyerell","U9-C4","Luminara Unduli","Finis Valorum","Eli Vanto","Nahdar Vebb","Maximilian Veers","Asajj Ventress",
"Evaan Verlaine","Garrick Versio","Iden Versio","Lanever Villecham","Nuvo Vindi","Tulon Voidgazer","Dryden Vos","Quinlan Vos",
"WAC-47","Wald","Warok","Wicket W. Warrick","Watto","Taun We","Zam Wesell","Norra Wexley","Temmin 'Snap' Wexley",
"Vanden Willard","Mace Windu","Commander Wolffe","Wollivan","Sabine Wren","Wuher","Kazuda Xiono","Yaddle","Yoda","(puppeteer)",
"Joh Yowza","Wullf Yularen","Ziro the Hutt","Zuckuss","Constable Zuvio"];
```

Let’s take a look at the function that is going to render all of the results in the container, `showHeroes`.

```javascript
showHeroes = (filteredHeroes) => {
  const container = document.querySelector('.heroesContainer');
  if (filteredHeroes.length > 0 ) {
    container.innerText = ""
    filteredHeroes.map((name) => {
      const p = document.createElement("P")
      p.innerText = name
      container.appendChild(p)
    })
  } else {
    const h6 = document.createElement("h6")
    h6.innerText = "No Results"
    container.innerHTML = "";
    container.appendChild(h6);
  }
}
```

The function is passed an array as an argument. We iterate through the array and use JavaScript’s `createElement` function to create a `p` tag for each item in the array. Then we add the name at that iteration to the `innerText` of that `p` tag, which will represent the search results.

Once we’ve created the `p` tag and added the `innerText`, we can use JavaScript’s `appendChild` function to append the created `p` tag and its content to **heroesContainer**.

If there is no **hero** found which means the length of the `filteredHeroes` is **0**, then we are going to show the **“No Results”** text in `h6` tag.

We also need to call this function with the **heroes** array in `document.onDOMContentLoaded` when the page loads for first time to initialize our results and show all the characters.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  showHeroes(heroes)
});
```

Now, onto our filter function `searchHeroes()`.

```javascript
searchHeroes = () => {
  const searchText = event.target.value.toLowerCase();

  const filteredResult = heroes.filter(hero => {
    return hero.toLowerCase().includes(searchText);
  });

  showHeroes(filteredResult)
}
```

This function filters the **heroes** array based on whether or not any of the character names contains the user’s input. We also use `toLowerCase()` to improve input validation. Remember, **‘Pam’** is not equal to **‘pam’**, so without changing both the character name in the array and the user input to all lowercase, a user who types **‘pam’** will yield no search results.

Even after converting the names and input to lowercase letters, this functionality falls short. If a user types **‘apm’** they will yield no search results. It’s the same case if a user types in **‘mcihael’**. Both of those inputs were more than likely meant to have been **‘pam’** and **‘michael’**. So how can we account for minor spelling mistakes like that and correct our search results accordingly?

## Introducing, Regex!

Regex, short for ‘regular expression’, is a special text string for describing a search pattern. We are going to implement a search pattern using regex that takes the first three letters of a character’s name and compares it to the first three letters of the input.

Check the `checkName()` function below:

```javascript
checkName = (name, str) => {
  const pattern = str.split("").map(letter => {
    return `(?=.*${letter})`
  }).join("");
  const regex = new RegExp(`${pattern}`, "g");
  return name.match(regex);
}
```

### Let’s break this down:

- `?=` is a positive lookahead.
- `.` matches any character except line break.
- `*` matches zero or more instances of a character.
- `()` is a capturing group, which is used to group characters together in a regular expression so that we can apply other operators `(?=.*)`.
- `g` is the global modifier which performs a global search of the string looking for matches. You could also add `i` to `g` to make it an insensitive (not case sensitive) search as well, but in this case I have already converted the input and character name to lowercase letters, so the `g` modifier is sufficient.

This function splits our user input, iterates over the characters and uses string interpolation to add each letter to the `(?=.*)` regex after the asterisk(`*`). Once we have an array of regex patterns, we join all items in the array to create a larger regex pattern that encompasses all letters. From that we can use `new RegExp` to create a regular expression from the joined patterns.

The individual patterns we’ve created for each letter will match any strings that contain that letter. Combining them will apply all of the individual capturing groups to overall pattern, making them all matchable patterns for the string. This is will compensate for where `.includes(str)` falls short.

If the user is trying to find **‘Kelly’**, but types in **‘e’** as the first letter by mistake. `x.toLowerCase().includes(str)` will work, but then if the user continues typing and types **‘k’** next, the previous check won’t work.

If we pass **‘ek’** to `checkName()`, we can create the regex `(?=.*e)(?=.*k)` which will match a string containing **‘e’** and **‘k’** regardless of order. We apply that regex to the first three letters of **‘kelly’**, which is also passed to the function as `name`. Then `.match()` will return true if the regex is met. Otherwise it will return false.

Now that we know what we are trying to accomplish and how to do it, let’s look at our revised `searchHeroes()` function:

```javascript
searchHeroes = () => {
  const searchText = event.target.value.toLowerCase().substring(0, 3);
  const filteredResult = heroes.filter(hero => {
    const heroSub = hero.substring(0, 3).toLowerCase();
    return hero.toLowerCase().includes(searchText) || checkName(heroSub, searchText);
  });
  showHeroes(filteredResult)
}
```

We use `substring()` to take the first three letters of the input and the character’s name. Then we check if `hero.toLowerCase().includes(str)` is true. If it is, we skip the regex validation because `.includes()` is a more accurate match since its literally part of the character name, order and character wise.

If `hero.toLowerCase().includes(str)` is false, we use `checkName()` to apply our regex validation. This will improve the user’s search results without being too strict and without compromising the accuracy of the overall search.

Thank you for reading the post. Hope it will help you someday! Check below for live demo and git repo for this tutorial.

---

## Git Repo

<p class="text-center"><a href="https://github.com/meghsohor/javascript-regex-search" target="_blank" rel="noopener noreferrer">github/javascript-regex-search</a></p>

## Live Demo

<p class="text-center"><a href="https://meghsohor.github.io/javascript-regex-search/" target="_blank" rel="noopener noreferrer">meghsohor.github.io/javascript-regex-search/</a></p>
