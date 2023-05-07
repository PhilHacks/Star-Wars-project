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
        addSecondCharacter();
      }
    })
    .catch((error) => {
      console.log("Error1: Something went wrong, try again ");
      addFirstCharacter();
    });
}
addFirstCharacter();

async function addSecondCharacter() {
  const second = prompt("Add another character to list! ");
  await axios
    .get(`https://swapi.dev/api/people/?search=${second}`)
    .then((response) => {
      if (response.data.count === 0) {
        console.log(`No Star Wars characters found matching ${second}`);
        addSecondCharacter();
      } else {
        response.data.results[0].name;
        characters.push(second);
      }
      console.log(characters);
      removeStarWarsCharacter();
      addSeveral();
      moveCharacters();
      removeSeveral();
    })
    .catch((error) => {
      console.log("Error2: Something went wrong, try again ");
      addSecondCharacter();
    });
}

function removeStarWarsCharacter() {
  const remove = prompt("Enter index of character to remove it (0, 1 etc.):");
  characters.splice(remove, 1); //Tar input från prompt och tar bort 1 element.
  console.log(characters);
}

function addSeveral() {
  const add = prompt("Enter name to add character:");
  characters.push(add);
  console.log(characters);
  const addAnother = prompt("Enter another one:");
  characters.push(addAnother);
  console.log(characters);
}

function moveCharacters() {
  const move = prompt("Enter index of the character you wanna move:");
  const newIndex = prompt("Enter the index where you wanna move it to:");

  const characterToMove = characters.splice(move, 1)[0];
  characters.splice(newIndex, 0, characterToMove);
  console.log(characters);
}

function removeSeveral() {
  const removeSeveral = prompt("Enter an index to remove:");
  characters.splice(removeSeveral, 1);
  console.log(characters);
  const removeSeveral2 = prompt("Enter another index to remove:");
  characters.splice(removeSeveral2, 1);
  console.log(characters);
}

//TO-Do 7/5:
//1. Koppla ihop alla funktioner och kolla att programmet fungerar

//EXTRA.
//Input validation på samtliga functioner.
//-Separera funktionerna i olika filer.
//Enhetstester för varje funktion i separata testfiler.
