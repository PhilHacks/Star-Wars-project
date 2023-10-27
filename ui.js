import promptSync from "prompt-sync";

const prompt = promptSync();

export function promptAddCharacter() {
  return prompt("Add Star Wars character to list: ");
}

export function promptAddAnotherCharacter() {
  return prompt("Add another character to list: ");
}

export function promptRemoveCharacter() {
  return prompt("Enter index of character to remove it (0, 1 etc.):");
}

export function promptAddSeveralCharacters() {
  const add = prompt("Enter name to add character:");
  const addAnother = prompt("Enter another one:");
  return [add, addAnother];
}

export function promptMoveCharacter() {
  const move = prompt("Enter index of the character you wanna move:");
  const newIndex = prompt("Enter the index where you wanna move it to:");
  return [move, newIndex];
}

export function promptRemoveSeveralCharacters() {
  const remove1 = prompt("Enter an index to remove:");
  const remove2 = prompt("Enter another index to remove:");
  return [remove1, remove2];
}

export function printCharacters(characters) {
  console.log(characters);
}

// Ui.js Förklaring av kod:
// Koden i ui.js definierar och exporterar olika funktioner för att interagera med användaren och manipulera listan med karaktärer:
// -promptAddCharacter: Ber användaren att lägga till en Star Wars-karaktär i listan.
// -promptAddAnotherCharacter: Ber användaren att lägga till ytterligare en karaktär i listan.
// -promptRemoveCharacter: Ber användaren att ange indexet för att ta bort en karaktär från listan.
// -promptAddSeveralCharacters: Ber användaren att ange namnen på flera karaktärer att lägga till.
// -promptMoveCharacter: Ber användaren att ange indexet för en karaktär att flytta och indexet för den nya positionen.
// -promptRemoveSeveralCharacters: Ber användaren att ange indexen för flera karaktärer att ta bort.
// -printCharacters: Skriver ut karaktärerna i konsolen.
