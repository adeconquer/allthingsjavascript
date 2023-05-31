class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {
        var list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        //populate
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`

        list.appendChild(row);
    }
    showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        //Get parent
        const container = document.querySelector(".container");
        //Get Form
        const form = document.querySelector("#book-form");
        //insert alert
        container.insertBefore(div, form);

        //alert disapper after 3 secs
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            // console.log(e);
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        // Get form values
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books
    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui = new UI();

            //Add book to list
            ui.addBookToList(book);
        })

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(isbn) {
        console.log(isbn)
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Event Listener on DOM Load
document.addEventListener('DOMContentLoaded', Store.displayBooks());
// Event Listeners for Add Book
document.addEventListener('submit', function(e) {
    // console.log('test');

    // Get form values
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    // Instantiating a book
    const book = new Book(title, author, isbn)
        // console.log(book)


    // Instatiate a UI
    const ui = new UI();
    //Validate
    if (title === '' || author === '' || isbn === '') {
        //Error
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to localstorage
        Store.addBook(book)

        // Clear fields
        ui.clearFields();

        //Show Alert
        ui.showAlert("Book Added!", "success")
    }


    e.preventDefault();
})

//Event Listener for Delete
document.querySelector("#book-list").addEventListener('click', function(e) {

    // Instatiate a UI
    const ui = new UI();


    ui.deleteBook(e.target);

    //Remove from localstorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    //Show Alert
    ui.showAlert("Book Removed!", 'success')

    //


    e.preventDefault();
});