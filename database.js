const prompt = require("prompt-sync")();
const axios = require("axios");

let characters = [];
console.log(characters);

async function addFirstCharacter() {
  const first = prompt("Add Star Wars character to list! ");
  await axios
    .get(`https://swapi.dev/api/people/?search=${first}`)
    .then((response) => {
      if (response.data.count === 0) {
        console.log(`No Star Wars characters found matching ${first}`);
        addFirstCharacter();
      } else {
        response.data.results[0].name;
        characters.push(first);
        console.log(characters);
      }
    })
    .catch((error) => {
      console.log("Error1: Something went wrong, try again ");
      addFirstCharacter();
    });
}
addFirstCharacter();
