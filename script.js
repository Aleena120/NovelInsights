const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const bookContainer = document.getElementById('bookContainer');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value;
  searchBooks(searchTerm);
});

function searchBooks(searchTerm) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      bookContainer.innerHTML = '';
      data.items.forEach(book => {
        const bookCard = createBookCard(book);
        bookContainer.appendChild(bookCard);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');

  const title = document.createElement('h3');
  title.textContent = book.volumeInfo.title;

  const authors = document.createElement('p');
  authors.textContent = `Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}`;

  const description = document.createElement('p');
  description.textContent = book.volumeInfo.description || 'No description available.';

  bookCard.appendChild(title);
  bookCard.appendChild(authors);
  bookCard.appendChild(description);

  return bookCard;
}
