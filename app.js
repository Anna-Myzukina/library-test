

class Book {
    constructor(idi, title, author, year){
        this.idi = idi,
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

class UI {
    static displayBooks(){
        const books = Store.getBooks();
 /*       const StoredBooks = [
            {
                idi: '1',
                title: 'Alice/`s Adventures in Wonderland ',
                author: 'Lewis Carroll',
                year: '1865'
            },
            {
                idi: '2',
                title: 'Antoine de Saint-Exupéry ',
                author: 'The Little Prince',
                year: '1943'
            },
            {
                idi: '3',
                title: 'The Master and Margarita ',
                author: 'Mikhail Bulgakov',
                year: '1928'
            }
        ];

        const books = StoredBooks;
*/
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.idi}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td><a href="#" class="btn btn-danger btn-sm 
        delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

// Make in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#idi').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#year').value = '';
    }
}

// Store Class: Handle Storage
    class Store{
     static getBooks(){
            let books;
            if(localStorage.getItem('books') === nul ){
                books = [];
            }else{
                books = JSON.parse(localStorage.getItem('books'));
            }

            return books;
        }

     static addBook(book){
        const books = Store.getBooks();

        book.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

     static removeBook(idi){
         const books = Store.getBooks();

         books.forEach((book, index) => {
             if(books.idi === idi) {
                 books.splice(index, 1);
             }
         });

         localStorage.setItem('books', JSON.stringify(books));
     }
    }
// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
// Prevent actual submit
e.preventDefault();


// Get form values
    const idi = document.querySelector('#idi').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;


// Validate 

    if(idi === '' || title === '' || author === '' || year === '' ){
        UI.showAlert('Please fill in all fields', 'danger');
    } else{

// Instatiate book

    const book = new Book(idi, title, author, year);
// Add book to UI
    UI.addBookToList(book);

// Add book to store 
    Store.addBook(book);
// Show success message
    UI.showAlert('Book Added', 'success');

// Clear fields
    UI.clearFields();
    }
});

// Event Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)

// Show success message after remove the book
    UI.showAlert('Book Removed', 'success');
})