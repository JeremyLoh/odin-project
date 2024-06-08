# Project: Library (JavaScript Course)

https://www.theodinproject.com/lessons/node-path-javascript-library

Book objects should have the book's `title`, `author`, the number of `pages`, and whether or not you have `read` the book

```js
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
console.log(theHobbit.info())
```

# Assignment

1) Setup your project with skeleton HTML/CSS and JS files
2) All of your book objects are going to be stored in an array, so add a function to the script (not the constructor) that can take user's input and store the new book objects into an array. Your code should look something like this:
```js
const myLibrary = [];
function Book() {
  // the constructor...
}
function addBookToLibrary() {
  // do stuff here
}
```
3) Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own "card". It might help for now to manually add a few books to your array so you can see the display
4) Add a "NEW BOOK" button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it's been read and anything else you might want. How you decide to display this form is up to you. For example, you may wish to have a form show in a sidebar or you may wish to explore [dialogs and modals](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) using the `<dialog>` tag. However you do this, you will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the `submit` input tries to send the data to a server by default. This is where `event.preventDefault()`; will come in handy. Check out the [documentation for event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) and see how you can solve this issue!
5) Add a button on each book’s display to remove the book from the library. 
  - You will need to  associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
6) Add a button on each book’s display to change its read status. 
  - To facilitate this you will want to create the function that toggles a book’s `read` status on your `Book` prototype instance.

# References

Form Submit Execute JavaScript Best Practice? - https://stackoverflow.com/questions/8082846/form-submit-execute-javascript-best-practice

Transform submitted form into form data object - https://stackoverflow.com/a/64194536
- Form elements must have a *name* attribute set, or else FormData ignores them when you pass the form instance to the constructor
- You can pass the form itself to the FormData constructor
```js
let form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  
  console.log(formData.get('username'));
  console.log(formData.get('useracc'));

});
```

```html
<form id="myForm" name="myForm">
  <div>
    <label for="username">Enter name:</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="useracc">Enter account number:</label>
    <input type="text" id="useracc" name="useracc">
  </div>

  <input type="submit" value="Submit!">
</form>
```