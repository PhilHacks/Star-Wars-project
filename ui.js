import promptSync from "prompt-sync";
const prompt = promptSync();

export const promptAddCharacter = () =>
  prompt("Add Star Wars character to list: ");

export const promptRemoveCharacter = () =>
  prompt("Enter the name of the character to delete: ");


const promptCharacterName = () => prompt("Enter the name of the character to move: ");
const promptNewIndex = () => prompt("Enter the new index for the character: ");

export const promptMoveCharacter = () => {
  const name = promptCharacterName();
  const toNewIndex = promptNewIndex();
  return [name, toNewIndex];
};

export const promptAddMultipleCharacters = (count) => {
  const namesArray = [];
  for (let i = 0; i < count; i++) {
    const name = prompt(`Enter the name of character ${i + 1}: `);
    namesArray.push(name);
  }
  return namesArray;
};

export const promptRemoveMultipleCharacters = (count) => {
  const namesArray = [];
  for (let i = 0; i < count; i++) {
    const name = prompt(`Enter the name of character ${i + 1} to remove: `);
    namesArray.push(name);
  }
  return namesArray;
};

export const printCharacters = (characters) => {
  characters.forEach((character) => {
    console.log(`Index: ${character.index} Name: ${character.name} `);
  });
};

export const printMessage = (message) => console.log(message);
