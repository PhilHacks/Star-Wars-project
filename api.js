const axios = require("axios");

async function getCharacters() {
  axios
    .get("https://swapi.dev/api/people/")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

getCharacters();
module.exports = { getCharacters };
