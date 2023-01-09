/////////////////////////////////////////////////////////////////////////////////////////////////////
// Program: javascript.js
// Description: JavaScript file for the library application
// Source Assignment: https://www.theodinproject.com/lessons/node-path-javascript-library#assignment
// Assignment: 
//
//
//
// Notes:
// -> Create a display section to display the book objects. First method to display the content (1)
// const displayBook = document.createElement('div');
// for(let prop in myBook){
//     const displayBookChildren = document.createElement('div');
//     displayBookChildren.textContent = myBook[prop];
//     displayBook.appendChild(displayBookChildren);
// }
// libraryDisplay.appendChild(displayBook);
////////////////////////////////////////////////////////////////////////////////////////////////////

// Reference node for the 'new button'.
const newButton = document.querySelector('#new-button');

// Reference node for the 'clear button'.
const clearButton = document.querySelector('#clear-button');

// Reference node for the 'book form section'.
const bookForm = document.querySelector('#book-info-section > form');
bookForm.classList.add('hide-book-form'); // Hide the book form by default when the browser opens.

// Reference node for the book form 'submit button'.
const bookFormSubmitButton = document.querySelector('#book-info-section > form div:nth-child(5) button');

// Reference node for the 'library display section'.
const libraryDisplay = document.querySelector('#library-display-section');

// Reference node for the 'form controls'.
const bookTitle = document.querySelector('#book-info-section > form div:nth-child(1) input');
const bookAuthor = document.querySelector('#book-info-section > form div:nth-child(2) input');
const bookPages = document.querySelector('#book-info-section > form div:nth-child(3) input'); 
const bookRead = document.querySelector('#book-info-section > form div:nth-child(4) select');

/*************************************************************************************************************************************************/
// Testing
console.log(bookTitle);
console.log(bookAuthor); 
console.log(bookPages); 
console.log(bookRead);
console.log(bookFormSubmitButton); 
console.log(bookForm);
console.log(newButton); 
console.log(clearButton);
console.log(libraryDisplay);
/*************************************************************************************************************************************************/

// Array[] - myLibrary[]
let myLibrary = []
console.log(myLibrary); // Testing
console.log("\n");

// Object Constructor - Book()
function Book(){
    this.Title = bookTitle.value;
    this.Author = bookAuthor.value;
    this.Pages = bookPages.value;
    this.Read = bookRead.value;
}

// Add new content to the library.
function addBookToLibrary(e){
    e.preventDefault(); // prevent the form from redirecting.

    bookForm.classList.add('hide-book-form');
    let myBook = new Book();
    myLibrary.push(myBook);
    displayBooks();
}

// Display the books in the display section.
function displayBooks(){
    // Remove all the previous books from the library display section.
    var child = libraryDisplay.lastElementChild;
    while(child){
        libraryDisplay.removeChild(child);
        child = libraryDisplay.lastElementChild;
    }

    let index = 0;
    // Will loop over each book object in the array. 
    myLibrary.forEach(bookObjs => {
        console.log(`my current library of book objects: ${myLibrary}`); // Testing 

        // Create display items for the library display section.
        const libraryDisplayItems = document.createElement('div');

        // Create a remove button to remove each book from the library display section.
        const removeButton = document.createElement('button');
        removeButton.classList.add('display-buttons');
        removeButton.textContent = "Remove";

        // Link the data attribute 'linkedArray' to our DOM Element 'removeButton' and set the attribute property to 'index'.
        // This is being linked through the DOM (Documentation Object Model)
        removeButton.dataset.linkedArray = index;
        console.log(`The dataset link back to the array: ${removeButton.dataset.linkedArray}`); // Testing

        // Will remove a book object if the user chooses so. 
        removeButton.addEventListener('click', () => {
            let retrieveBookToRemove = removeButton.dataset.linkedArray;
            myLibrary.splice(parseInt(retrieveBookToRemove), 1); // remove the object that corresponds to the HTMLElements data-attribute index. 
            libraryDisplayItems.remove(); // Remove the entires card from the library display section. 
            displayBooks();
        });

        // Create a read toggle button for the user to click if they have the read the book or not.
        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add('display-buttons');

        // Link the data attribute 'linkedArray' to our DOM Element 'toggleReadButton' and set the attribute property to 'index'.
        toggleReadButton.dataset.linkedArray = index;
        console.log("The toggle data-attribute value: ", toggleReadButton.dataset.linkedArray); // Testing

        // Will change the text on the button if the user has read the book or not.
        if (bookObjs.Read === 'Yes')
        {
            toggleReadButton.textContent = 'Read';
        }
        else if (bookObjs.Read === 'No')
        {
            toggleReadButton.textContent = 'Not Read';
        }

        // Will toggle a book object that thes use has read or hasn't read. 
        toggleReadButton.addEventListener('click', () => {
            let retrieveBookToToggle = toggleReadButton.dataset.linkedArray;
            const newBook = new Book();
            console.log("The initial value of the toggle Button: ", myLibrary[parseInt(retrieveBookToToggle)].Read); // Testing

            if(myLibrary[parseInt(retrieveBookToToggle)].Read === 'No')
            {
                newBook.Read = 'Yes';
                myLibrary[parseInt(retrieveBookToToggle)].Read = newBook.Read;
            }
            else if (myLibrary[parseInt(retrieveBookToToggle)].Read === 'Yes')
            {
                newBook.Read = 'No';
                myLibrary[parseInt(retrieveBookToToggle)].Read = newBook.Read;
            }
            displayBooks();
        });

        // Will loop over each property key in the selected book object.
        for (let key in bookObjs){
            console.log(`${key}: ${bookObjs[key]}`); // Testing
            const para = document.createElement('p');
            para.textContent = `${key}: ${bookObjs[key]}`;
            libraryDisplayItems.appendChild(para);
        }
        console.log("\n");
        
        // libraryDisplayItems.appendChild(toggleReadButton); 
        libraryDisplayItems.appendChild(toggleReadButton);
        libraryDisplayItems.appendChild(removeButton);
        libraryDisplay.appendChild(libraryDisplayItems);
        index++;
    });
}

// New Button - Will display a new set of form controls when the user clicks the button after each library display.
newButton.addEventListener('click', () => {
    bookForm.classList.remove('hide-book-form');
    bookForm.reset(); // Reset the form controls 
});

// Submit Button - Submits the form to display the book library. 
bookFormSubmitButton.addEventListener('click', addBookToLibrary);

// Clear Button - Will clear the entire book library and reset the form controls.
clearButton.addEventListener('click', () => {
    console.log("Clicked Clear Button!"); // Testing
    // Remove all books from the library by removing all the nodes from the display section.
    var child = libraryDisplay.lastElementChild;
    while(child){
        libraryDisplay.removeChild(child);
        child = libraryDisplay.lastElementChild;
    }

    var index = 0;
    // Remove all the objects that are books from the library array.
    while(myLibrary.length != 0){
        myLibrary.splice(0, 1);
        index++;
    }

    // Reset the form controls just in case.
    bookForm.reset();

    // Back to the displayBooks function. 
    displayBooks();
});
