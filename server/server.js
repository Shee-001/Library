const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Serve static files from public directory
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/': '/public/index.html'
}));

server.use(middlewares);
server.use(router);

// Custom middleware for CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});