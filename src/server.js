const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  // Protocol is http or https
  const protocol = request.connection.encrypted ? 'https' : 'http';

  // Parse the URL into 3 parts: protocol, host, and query
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  // Add the query parameters to the request object (Ex: request.query.valid)
  request.query = Object.fromEntries(parsedUrl.searchParams);

  // HEAD requests
  if (request.method === 'HEAD') {
    switch (parsedUrl.pathname) {
      case '/':
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end();
        break;

      case '/documentation':
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end();
        break;

      case '/style.css':
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end();
        break;

      case '/allPokemon':
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end();
        break;

      case '/name':
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end();
        break;

      case '/type':
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end();
        break;

      case '/finalStageEvolution':
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end();
        break;

      case '/random':
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end();
        break;

      case '/notFound':
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end();
        break;

      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end();
        break;
    }
  }

  // GET requests
  if (request.method === 'GET') {
    switch (parsedUrl.pathname) {
      case '/':
        htmlHandler.getIndex(request, response);
        break;

      case '/documentation':
        htmlHandler.getDocumentation(request, response);
        break;

      case '/style.css':
        htmlHandler.getCSS(request, response);
        break;

      case '/allPokemon':
        jsonHandler.getAllPokemon(request, response);
        break;

      case '/name':
        jsonHandler.getName(request, response);
        break;

      case '/type':
        jsonHandler.getType(request, response);
        break;

      case '/finalStageEvolution':
        jsonHandler.getFinalStageEvolution(request, response);
        break;

      case '/random':
        jsonHandler.getRandomPokemon(request, response);
        break;

      case '/notFound':
        jsonHandler.notFound(request, response);
        break;

      default:
        jsonHandler.notFound(request, response);
        break;
    }
  }

  // POST requests
  if (request.method === 'POST') {
    switch (parsedUrl.pathname) {
      case '/addPokemon':
        jsonHandler.addPokemon(request, response);
        break;

      case '/editPokemon':
        jsonHandler.editPokemon(request, response);
        break;

      default:
        jsonHandler.notFound(request, response);
        break;
    }
  }
}


http.createServer(onRequest).listen(port);

// console.log(`Listening on port ${port}`);
