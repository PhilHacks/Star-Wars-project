import promptSync from "prompt-sync";

const prompt = promptSync();

export function promptAddCharacter() {
  return prompt("Add Star Wars character to list: ");
}

export function promptRemoveCharacter() {
  return prompt("Enter the name of the character to delete: ");
}

export function promptMoveCharacter() {
  const name = prompt("Enter the name of the character to move: ");
  const toNewIndex = prompt("Enter the new index for the character: ");
  return [name, toNewIndex];
}

export function promptAddMultipleCharacters(count) {
  const namesArray = [];
  for (let i = 0; i < count; i++) {
    const name = prompt(`Enter the name of character ${i + 1}: `);
    namesArray.push(name);
  }
  return namesArray;
}

export function promptRemoveMultipleCharacters(count) {
  const namesArray = [];
  for (let i = 0; i < count; i++) {
    const name = prompt(`Enter the name of character ${i + 1} to remove: `);
    namesArray.push(name);
  }
  return namesArray;
}

export function printCharacters(characters) {
  characters.forEach((character) => {
    console.log(`Index: ${character.index} Name: ${character.name} `);
  });
}

export function printMessage(message) {
  console.log(message);
}
