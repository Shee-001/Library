// Change your API_BASE_URL to:
const API_BASE_URL = window.location.origin + '/api';

// Update your fetch functions to:
async function fetchBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error:', error);
        booksContainer.innerHTML = `<p class="error">Error loading books: ${error.message}</p>`;
    }
}