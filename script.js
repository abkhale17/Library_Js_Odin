let myLibrary = [];
var container = document.getElementById('container');
var dispForm  = document.getElementById('dispForm');
var form  = document.getElementById('form');

function Book(author, title , number_of_pages, reading_status) {
	this.author = author,
	this.title = title,
	this.number_of_pages = number_of_pages,
	this.reading_status = reading_status	
}

Book.prototype.toggleReadStatus = function() {
	this.reading_status = !this.reading_status;
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

var b1 = new Book('Sir Arthur Conan Doyle','The Sign of Four', 292, true);
var b2 = new Book('Paulo Koylo','The Akchemist', 132, false);

addBookToLibrary(b1);
addBookToLibrary(b2);

function render() {
	container.innerHTML = '';
	myLibrary.forEach((book, index) => {

		let bookCard = document.createElement('div');
		let h3     = document.createElement('h3');
		let h1     = document.createElement('h1');
		let page   = document.createElement('p');
		let status = document.createElement('p');  
		let del    = document.createElement('button');
		let status_toggler = document.createElement('button');
		let hr     = document.createElement('hr');

		h3.textContent = book.author
		h1.textContent = book.title
		page.textContent = book.number_of_pages
		status.textContent  = book.reading_status
		del.textContent = "Delete"
		status_toggler.textContent = book.reading_status ? "Didn\'t read" : "Reading Done";

		del.setAttribute('data-key',index);
		del.classList.add('deleteBook');

		status_toggler.setAttribute('data-key',index);
		status_toggler.classList.add('statusToggle');

		bookCard.appendChild(h1);
 		bookCard.appendChild(h3);		
		bookCard.appendChild(page);
		bookCard.appendChild(status);
		bookCard.appendChild(del);
		bookCard.appendChild(status_toggler);
		bookCard.appendChild(hr);
		container.appendChild(bookCard);	
	})

	var delBook = document.querySelectorAll('.deleteBook');
	delBook.forEach((book) => {
		book.addEventListener('click', (e) => {
			myLibrary.splice(e.target.dataset.key,1);
			render();
		})
	})

	var toggleRead = document.querySelectorAll('.statusToggle');
	toggleRead.forEach((book) => {
		book.addEventListener('click', (e) => {
			myLibrary[e.target.dataset.key].toggleReadStatus();
			render();
		})
	})
}

dispForm.addEventListener('click', (e) => {
	var disp = form.style.display;
	if(disp == 'block'){
		form.style.display = 'none';
		dispForm.textContent = "Add Book";
	} else {
		form.style.display = 'block';
		dispForm.textContent = "Hide Form";
	}
})

render();