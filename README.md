## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: getElementById, gets one element by its ID & getElementsByClassName, gets all the element by its class.Then querySelector, selects first element that matches a CSS selector like ID, class, or tag & querySelectorAll, selects all elements that match a CSS selector like main,body or section etc.

### 2. How do you create and insert a new element into the DOM?
Ans: At first we Use document.createElement() to make a new element. Then appendChild() to add it to the page.As an example:

//Creating a new paragraph
let newPara = document.createElement("p");
newPara.innerText = "I am a new paragraph!";

//Adding it to a already having container
let container = document.getElementById("container");
container.appendChild(newPara);

### 3. What is Event Bubbling? And how does it work?
Ans: When an event happens like when we click a button, it start's at the element that clicked and moves up to it's parents.

### 4. What is Event Delegation in JavaScript? Why is it useful?
Ans: Instead of adding a click listener to every child, we can add it to the parent using event delegation.

It is useful because it:
 -Saves memory.
 -Works for dynamic elements.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: preventDefault(), stops the default action of an element and stopPropagation(), Stops the event from moving up the DOM. Example: using preventDefault(),we can  stops a link from opening a page and when we use stopPropagation() and Click on a button inside a div, the div’s click won't work.


Live Site Link: https://ornob-083.github.io/PH-B13-A4-Job-Tracker/
