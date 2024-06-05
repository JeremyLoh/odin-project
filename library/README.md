# Project: Library (JavaScript Course)

https://www.theodinproject.com/lessons/node-path-javascript-library

Book objects should have the book's `title`, `author`, the number of `pages`, and whether or not you have `read` the book

```js
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
console.log(theHobbit.info())
```

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