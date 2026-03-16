const jsonServer = require('json-server');
const server = jsonServer.create();
const db = require('../db.json');
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom routes if needed
// Note: Vercel routes /api/ to this function via vercel.json rewrites
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;
