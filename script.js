let myLibrary = 	[]
var container = document.getElementById('container');
var dispForm  = document.getElementById('dispForm');
var form  = document.getElementById('form');
var addBook  = document.getElementById('addBook');


function Book(author, title , number_of_pages, reading_status) {
	this.author = author,
	this.title = title,
	this.number_of_pages = number_of_pages,
	this.reading_status = reading_status	
}

// Book.prototype.toggleReadStatus = function() {
// 	this.reading_status = !this.reading_status;
// }
function toggleReadStatus(obj) {
	obj.reading_status = !obj.reading_status;
}

function addBookToLibrary(newBook) {
	myLibrary.push(newBook);
}

function render() {
	container.innerHTML = '';
	myLibrary.forEach((book, index) => {

		let bookCard = document.createElement('div');
		let bookCardBody = document.createElement('div');
		let h4     = document.createElement('h4');
		let h1     = document.createElement('h1');
		let br     = document.createElement('br');
		let page   = document.createElement('p');
		let status = document.createElement('p'); 
		let btnDiv = document.createElement('div'); 
		let del    = document.createElement('button');
		let authorSpan   = document.createElement('strong');

		let status_toggler = document.createElement('button');
		bookCard.classList.add('card');
		bookCardBody.classList.add('card-body');

		authorSpan.textContent = book.author
		h4.textContent = `Written By `
		h1.textContent = book.title
		page.textContent = `Number of pages: ${book.number_of_pages}`
		status.textContent  = book.reading_status ? "Reading is Done!" : "Reading Not Completed!";
		del.textContent = "Delete"
		status_toggler.textContent = book.reading_status ? "Didn\'t read" : "Reading Done";

		btnDiv.classList.add("divBtns");

		del.setAttribute('data-key',index);
		del.classList.add('btn');
		del.classList.add('deleteBook');
		del.classList.add('btn-danger');

		status_toggler.setAttribute('data-key',index);
		status_toggler.classList.add('btn');
		status_toggler.classList.add('statusToggle');
		status_toggler.classList.add('btn-primary');

		page.classList.add("pages");
		status.classList.add('read')

		bookCardBody.appendChild(h1);
		h4.appendChild(authorSpan)
 		bookCardBody.appendChild(h4);
 		bookCardBody.appendChild(br);
 		bookCardBody.appendChild(status);		
		bookCardBody.appendChild(page);
		
		btnDiv.appendChild(status_toggler);
		btnDiv.appendChild(del);
		bookCardBody.appendChild(btnDiv)
		bookCard.appendChild(bookCardBody);
		container.appendChild(bookCard);
	})

	var delBook = document.querySelectorAll('.deleteBook');
	delBook.forEach((book) => {
		book.addEventListener('click', (e) => {
			myLibrary.splice(e.target.dataset.key,1);
			updateLocalStorage();
			render();
		})
	})

	var toggleRead = document.querySelectorAll('.statusToggle');
	toggleRead.forEach((book) => {
		book.addEventListener('click', (e) => {
			toggleReadStatus(myLibrary[e.target.dataset.key]);
			updateLocalStorage();
			render();
		})
	})
}

function updateLocalStorage() {
	localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getLocalStorage() {
	if(localStorage.getItem('library')){
	    myLibrary = JSON.parse(localStorage.getItem("library"));
	    render();
	} else {
		var b1 = new Book("SR Arthur Conan Doyle", "The Sign of four", 93, true);
		myLibrary.push(b1);
		render();
		updateLocalStorage();
	}
}

function clearLocalStorage(){
	localStorage.clear();
}

function clearFields() {
	document.getElementById('title').value = "";
	document.getElementById('author').value = "";
	document.getElementById('page').value = "";
	document.getElementById('read').checked =  false;
}

addBook.addEventListener('click', (e) => {
	var title = document.getElementById('title').value;
	var author= document.getElementById('author').value;
	var no_of_pages = document.getElementById('page').value;
	var reading_status = document.getElementById('read').checked ? true : false;
	addBookToLibrary(new Book(title, author, no_of_pages, reading_status));
	clearFields();
	updateLocalStorage();
	render();
})

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

var clearStorage  = document.getElementById('clearStorage');
clearStorage.addEventListener('click', (e) => {
	clearLocalStorage();
})

getLocalStorage();

