const http = require('http');
const url = require('url');

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

    if (request.method === 'HEAD') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: 'This is a head request' }));
        response.end();
        return;
    }

    switch (parsedUrl.pathname) {
        case '/':
            htmlHandler.getIndex(request, response);
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
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);