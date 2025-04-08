document.addEventListener("DOMContentLoaded", () => {
  const booksList = document.getElementById("books-list");
  const usersList = document.getElementById("users-list");
  const bookForm = document.getElementById("add-book-form");

  const BASE_URL = "http://localhost:5000";

  // Fetch and display books
  function fetchBooks() {
    fetch(`${BASE_URL}/books`)
      .then((res) => res.json())
      .then((books) => {
        booksList.innerHTML = "";
        books.forEach(renderBook);
      });
  }

  // Fetch and display users
  function fetchUsers() {
    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((users) => {
        usersList.innerHTML = "<ul>" + users.map(user => `<li>${user.name} (${user.membershipId})</li>`).join("") + "</ul>";
      });
  }

  // Render individual book card
  function renderBook(book) {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <h4>${book.title}</h4>
      <p>by ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Published:</strong> ${book.publishedYear}</p>
      <p><strong>Status:</strong> ${book.available ? "Available" : `Borrowed by User ID: ${book.borrower}`}</p>
    `;
    booksList.appendChild(bookCard);
  }

  // Add new book
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const newBook = {
      title: formData.get("title"),
      author: formData.get("author"),
      publishedYear: parseInt(formData.get("publishedYear")),
      genre: formData.get("genre"),
      available: true,
      borrower: null,
      dueDate: null
    };

    fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook)
    })
      .then((res) => res.json())
      .then((book) => {
        renderBook(book);
        bookForm.reset();
      });
  });

  fetchBooks();
  fetchUsers();
});
