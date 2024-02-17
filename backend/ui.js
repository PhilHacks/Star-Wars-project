import promptSync from "prompt-sync";
const prompt = promptSync();

export const welcomeMessage = () => 
console.log("🌌 Welcome to the Star Wars World of Characters! Unleash the Force! 🚀");


export const promptAddCharacter = () => 
prompt("Enter Star Wars character name or several characters separated by commas:");


export const promptRemoveCharacterByIndex = () => {
  const count = parseInt(prompt("Enter the number of characters to remove: "));
  const indexArray = [];
  for (let i = 0; i < count; i++) {
    const index = parseInt(prompt(`Enter the index of character ${i + 1}: `));
    indexArray.push(index);
  }
  return indexArray;
}
  
export const promptMoveCharacter = () => {
  const oldIndex = promptCharacterName();
  const toNewIndex = promptNewIndex();
  return [oldIndex, toNewIndex];
};

const promptCharacterName = () => 
prompt("Enter the index of the character to move: ");

const promptNewIndex = () => 
prompt("Enter the new index for the character: ");


export const printCharacters = (characters) => {
  characters.forEach((character) => {
    console.log(`Index: ${character.index} Name: ${character.name} `);
  });
};

export const printMessage = (message) => console.log(message);
