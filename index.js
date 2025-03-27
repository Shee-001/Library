// API Configuration
const API_BASE_URL = window.location.origin; // Will work for both local and deployed versions

// DOM Elements
const booksContainer = document.getElementById('books-container');
const usersContainer = document.getElementById('users-container');

// Fetch all books
async function fetchBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        booksContainer.innerHTML = '<p>Error loading books. Please try again later.</p>';
    }
}

// Display books
function displayBooks(books) {
    booksContainer.innerHTML = books.map(book => `
        <div class="card">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.publishedYear}</p>
            <p>Status: ${book.available ? 'Available' : 'Borrowed'}</p>
        </div>
    `).join('');
}

// Fetch all users
async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        usersContainer.innerHTML = '<p>Error loading users. Please try again later.</p>';
    }
}

// Display users
function displayUsers(users) {
    usersContainer.innerHTML = users.map(user => `
        <div class="card">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Member since: ${user.joinedDate}</p>
        </div>
    `).join('');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    fetchUsers();
});