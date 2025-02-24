const fs = require('fs');

const pokedex = JSON.parse(fs.readFileSync(`${__dirname}/../dataset/pokedex.json`));



// Get name
const getName = (request, response) => {
    // Get the name from the query parameters
    const name = request.query.name;

    // Find the pokemon with the name
    const pokemon = pokedex.find((pokedex) => pokedex.name.toLowerCase() == name.toLowerCase());
    if (pokemon) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(pokemon));
    }

    // If the pokemon is not found, return an error
    else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ error: 'Pokemon not found' }));
    }
};

// Get all pokemon of a specific type
const getType = (request, response) => {

    // Get the type from the query parameters
    const type = request.query.type;

    // Find all pokemon with the type
    const pokemon = pokedex.filter((pokedex) => pokedex.type.includes(type));
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(pokemon));
    response.end();
};

// Get final stage evolution
const getFinalStageEvolution = (request, response) => {
    const finalStagePokemon = pokedex.filter((pokedex) => !pokedex.next_evolution);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ finalStagePokemon }));
};

// Get random pokemon
const getRandomPokemon = (request, response) => {

    // Get a random pokemon from the list
    const randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(randomPokemon));
    response.end();
};

module.exports = { getName, getType, getFinalStageEvolution, getRandomPokemon };