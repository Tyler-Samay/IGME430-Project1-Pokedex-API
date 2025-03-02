const fs = require('fs');

const pokedex = JSON.parse(fs.readFileSync(`${__dirname}/../dataset/pokedex.json`));

const respond = (response, status, data) => {
    const responseData = JSON.stringify(data);
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(responseData, 'utf8'),
    });
    response.write(responseData);
    response.end();
};

// Get all Pokemon
const getAllPokemon = (request, response) => {
    respond(response, 200, pokedex);
}

// Get name
const getName = (request, response) => {
    // Get the name from the query parameters
    const name = request.query.name;

    // If there is no pokemon name
    if (!name) {
        respond(response, 400, { error: 'Name parameter required' });
        return;
    }

    // Find the pokemon with the name
    const pokemon = pokedex.find((pokedex) => pokedex.name.toLowerCase() == name.toLowerCase());
    if (pokemon) {
        respond(response, 200, pokemon);
        return;
    }

    // If the pokemon is not found, return an error
    else {
        respond(response, 404, { error: 'Pokemon not found' });
        return;
    }
};

// Get all pokemon of a specific type
const getType = (request, response) => {

    // Get the type from the query parameters
    const type = request.query.type;

    // If no type is selected
    if (!type) {
        respond(response, 400, { error: 'Type parameter required' });
        return;
    }

    const pokemon = pokedex.filter((pokedex) => pokedex.type.some((t) => t.toLowerCase() == type.toLowerCase()));

    // If there are no pokemon of that type
    if (pokemon.length == 0) {
        respond(response, 404, { error: 'No pokemon of that type found' });
        return;
    }

    // If pokemon of that type are found
    respond(response, 200, pokemon);
};

// Get final stage evolution
const getFinalStageEvolution = (request, response) => {
    const finalStagePokemon = pokedex.filter((pokedex) => !pokedex.next_evolution);
    respond(response, 200, finalStagePokemon);
};

// Get random pokemon
const getRandomPokemon = (request, response) => {

    // How many random pokemon to find
    const numPokemon = request.query.numPokemon;

    // If no number of pokemon is selected
    if (!numPokemon || numPokemon < 1 || numPokemon > pokedex.length) {
        respond(response, 400, { error: 'Number of Pokemon parameter required and must be between 1 and 151' });
        return;
    } 

    // List of random pokemon being displayed
    const randomPokemonList = [];

    // For the number of random pokemon
    for (let i = 0; i < numPokemon; i++) {
        // Get a random pokemon from the list
        const randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
        randomPokemonList.push(randomPokemon);
    }

    respond(response, 200, randomPokemonList);
};

const notFound = (request, response) => {
    respond(response, 404, { error: 'Resource not found' });
};

module.exports = { getAllPokemon, getName, getType, getFinalStageEvolution, getRandomPokemon, notFound };