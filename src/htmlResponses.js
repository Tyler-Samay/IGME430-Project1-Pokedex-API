const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);

// Get index page
const getIndex = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(index, 'utf8'),
  });
  response.write(index);
  response.end();
};

// Get CSS
const getCSS = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
    'Content-Length': Buffer.byteLength(css, 'utf8'),
  });
  response.write(css);
  response.end();
};

// Get documentation
const getDocumentation = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(documentation, 'utf8'),
  });
  response.write(documentation);
  response.end();
}

module.exports = { getIndex, getCSS, getDocumentation };
