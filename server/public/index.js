// API Service (TM-style)
function getAPI() {
    const API_URL = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000' 
      : window.location.origin + '/api';
  
    return {
      getBooks() {
        return fetch(`${API_URL}/books`)
          .then(r => {
            if (!r.ok) throw new Error('Failed to load books');
            return r.json();
          })
          .then(books => {
            console.log('Books loaded:', books);
            return books;
          })
          .catch(error => {
            console.error('Book load error:', error);
            throw error;
          });
      },
  
      getUsers() {
        return fetch(`${API_URL}/users`)
          .then(r => {
            if (!r.ok) throw new Error('Failed to load users');
            return r.json();
          })
          .then(users => {
            console.log('Users loaded:', users);
            return users;
          })
          .catch(error => {
            console.error('User load error:', error);
            throw error;
          });
      }
    };
  }
  
  // Usage Example:
  const api = getAPI();
  
  // 1. Get books and display them
  api.getBooks()
    .then(books => {
      document.getElementById('books-list').innerHTML = books
        .map(book => `<li>${book.title}</li>`)
        .join('');
    })
    .catch(error => {
      document.getElementById('books-list').innerHTML = 
        `<li class="error">Error: ${error.message}</li>`;
    });
  
  // 2. Get users
  api.getUsers()
    .then(users => console.log('Loaded users:', users))
    .catch(error => console.error('Failed:', error));