const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Serve static files from 'public' directory
// Change this line:
server.use(express.static(path.join(__dirname, '../public')));

// To this (since public is now inside server):
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api', router); // For API endpoints
server.use(express.static('public')); // For HTML/CSS/JS

// Redirect root to frontend
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});