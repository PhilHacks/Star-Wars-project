// ui.js
const prompt = require("prompt-sync")();
const { db, Character } = require("./mongodb");

// Funktion för att prompta användaren att lägga till en Star Wars-tecken i listan
// function promptAddCharacter() {
//   return prompt("Add Star Wars character to list! ");
// }

function promptAddCharacter() {
  const characterName = prompt("Add Star Wars character to list! ");
  db.characters
    .find({ name: characterName })
    .toArray(function (err, characters) {
      if (err) {
        console.error(err);
        return;
      }

      characters.forEach(function (character) {
        console.log(character.name);
      });
    });
}

promptAddCharacter();

// Funktion för att prompta användaren att lägga till ytterligare en tecken i listan
function promptAddAnotherCharacter() {
  return prompt("Add another character to list! ");
}

// Funktion för att prompta användaren att ange index för att ta bort ett tecken
function promptRemoveCharacter() {
  return prompt("Enter index of character to remove it (0, 1 etc.):");
}

// Funktion för att prompta användaren att ange flera tecken att lägga till
function promptAddSeveralCharacters() {
  const add = prompt("Enter name to add character:");
  const addAnother = prompt("Enter another one:");
  return [add, addAnother];
}

// Funktion för att prompta användaren att ange index för att flytta ett tecken
function promptMoveCharacter() {
  const move = prompt("Enter index of the character you wanna move:");
  const newIndex = prompt("Enter the index where you wanna move it to:");
  return [move, newIndex];
}

// Funktion för att prompta användaren att ange index för att ta bort flera tecken
function promptRemoveSeveralCharacters() {
  const remove1 = prompt("Enter an index to remove:");
  const remove2 = prompt("Enter another index to remove:");
  return [remove1, remove2];
}

// Funktion för att skriva ut tecken i konsolen
function printCharacters(characters) {
  console.log(characters);
}

// Exportera alla funktioner för att kunna använda dem i andra filer
module.exports = {
  promptAddCharacter,
  promptAddAnotherCharacter,
  promptRemoveCharacter,
  promptAddSeveralCharacters,
  promptMoveCharacter,
  promptRemoveSeveralCharacters,
  printCharacters,
};

// Ui.js Förklaring av kod:
// Koden i ui.js definierar och exporterar olika funktioner för att interagera med användaren och manipulera listan med karaktärer:
// -promptAddCharacter: Ber användaren att lägga till en Star Wars-karaktär i listan.
// -promptAddAnotherCharacter: Ber användaren att lägga till ytterligare en karaktär i listan.
// -promptRemoveCharacter: Ber användaren att ange indexet för att ta bort en karaktär från listan.
// -promptAddSeveralCharacters: Ber användaren att ange namnen på flera karaktärer att lägga till.
// -promptMoveCharacter: Ber användaren att ange indexet för en karaktär att flytta och indexet för den nya positionen.
// -promptRemoveSeveralCharacters: Ber användaren att ange indexen för flera karaktärer att ta bort.
// -printCharacters: Skriver ut karaktärerna i konsolen.
