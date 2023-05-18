const axios = require("axios");

async function searchCharacter(name) {
  const response = await axios.get(
    `https://swapi.dev/api/people/?search=${name}`
  );
  if (response.data.count === 0) {
    throw new Error(`No Star Wars characters found matching ${name}`);
  }
  return response.data.results[0];
}

module.exports = { searchCharacter };
