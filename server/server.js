const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Serve static files from 'public' directory
server.use(express.static(path.join(__dirname, '../public')));

// JSON Server middleware
server.use('/api', middlewares);
server.use('/api', router);

// Redirect root to frontend
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});