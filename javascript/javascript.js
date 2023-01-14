/////////////////////////////////////////////////////////////////////////////////////////////////////
// Program: javascript.js
// Description: JavaScript file for the library application
// Source Assignment: https://www.theodinproject.com/lessons/node-path-javascript-library#assignment
// Assignment: Create a book library app. Each book will be a object that stores the book title,
// author, pages, and if the user has read the book or not. The user can add a new book to the
// library and remove a book from the library.  
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

// Array[] - myLibrary[]
let myLibrary = []

// class Book - For abstract coding
class Book{
    constructor(){
        this.Title = bookTitle.value;
        this.Author = bookAuthor.value;
        this.Pages = bookPages.value;
        this.Read = bookRead.value;
    }
};

// Add new content to the library.
function addBookToLibrary(e){
    e.preventDefault(); // prevent the form from redirecting.

    // hide the book form.
    bookForm.classList.add('hide-book-form');

    // declare and initialize a new object of type Book.
    let myBook = new Book();

    // Each form control will have a non-applicable value if the user chooses not to enter any values into the form.
    if (myBook.Title === "")
    {
        myBook.Title = "N/A";
    }

    if (myBook.Author === "")
    {
        myBook.Author = "N/A";
    }

    if (myBook.Pages === "")
    {
        myBook.Pages = "N/A";
    }

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
        // Create display items for the library display section.
        const libraryDisplayItems = document.createElement('div');

        // Create a remove button to remove each book from the library display section.
        const removeButton = document.createElement('button');
        removeButton.classList.add('display-buttons');
        removeButton.textContent = "Remove";

        // Link the data attribute 'linkedArray' to our DOM Element 'removeButton' and set the attribute property to 'index'.
        // This is being linked through the DOM (Documentation Object Model)
        removeButton.dataset.linkedArray = index;

        // Will remove a book object if the user chooses so. 
        removeButton.addEventListener('click', () => {
            let retrieveBookToRemove = removeButton.dataset.linkedArray;
            myLibrary.splice(parseInt(retrieveBookToRemove), 1); // remove the object that corresponds to the HTMLElements data-attribute index. 
            libraryDisplayItems.remove(); // Remove the entire card from the library display section. 
            displayBooks();
        });

        // Create a read toggle button for the user to click if they have the read the book or not.
        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add('display-buttons');

        // Link the data attribute 'linkedArray' to our DOM Element 'toggleReadButton' and set the attribute property to 'index'.
        toggleReadButton.dataset.linkedArray = index;

        // Will change the text on the button if the user has read the book or not.
        if (bookObjs.Read === 'Yes')
        {
            toggleReadButton.textContent = 'Read';
        }
        else if (bookObjs.Read === 'No')
        {
            toggleReadButton.textContent = 'Not Read';
        }

        // Will toggle a book object that the user has read or hasn't read. 
        toggleReadButton.addEventListener('click', () => {
            let retrieveBookToToggle = toggleReadButton.dataset.linkedArray;
            const newBook = new Book();

            // Implement toggle data.
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
    bookForm.classList.remove('hide-book-form'); // Display the form controls.
    bookForm.reset(); // Reset the form controls 
});

// Submit Button - Submits the form to display the book library. 
bookFormSubmitButton.addEventListener('click', addBookToLibrary);

// Clear Button - Will clear the entire book library and reset the form controls.
clearButton.addEventListener('click', () => {
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
