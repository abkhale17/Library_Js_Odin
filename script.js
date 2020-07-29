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

function addBookToLibrary(book) {
	myLibrary.push(book);
}

var b1 = new Book('Sir Arthur Conan Doyle','The Sign of Four', 292, true);
var b2 = new Book('Paulo Koylo','The Akchemist', 132, false);

addBookToLibrary(b1);
addBookToLibrary(b2);

function render() {
	myLibrary.forEach((book) => {

		let div   = document.createElement('div');
		let h3    = document.createElement('h3');
		let h1    = document.createElement('h1');
		let page  = document.createElement('p');
		let status = document.createElement('p');  

		h3.textContent = book.author,
		h1.textContent = book.title,
		page.textContent = book.number_of_pages,
		status.textContent  = book.reading_status

		div.appendChild(h1);
 		div.appendChild(h3);		
		div.appendChild(page);
		div.appendChild(status);
		container.appendChild(div);	
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