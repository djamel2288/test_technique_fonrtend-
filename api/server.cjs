const jsonServer = require('json-server');
const server = jsonServer.create();
const db = require('../db.json');
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom rewriter to handle /api prefix
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;
