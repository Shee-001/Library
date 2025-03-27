const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const path = require('path'); // Add this line
const port = process.env.PORT || 8080;

// Serve static files from public directory
server.use(express.static(path.join(__dirname, '../public'))); // Updated path

// API routes
server.use('/api', router); // All API endpoints now prefixed with /api

// Redirect root to index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});