let myLibrary = [];

function Book(author, title , number_of_pages, reading_status) {
	this.author = author,
	this.title = title,
	this.number_of_pages = number_of_pages,
	this.reading_status = reading_status	
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}