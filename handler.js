import {
  promptAddCharacter,
  promptRemoveCharacter,
  promptMoveCharacter,
  promptAddMultipleCharacters,
  promptRemoveMultipleCharacters,
  printCharacters,
  printMessage,
} from "./ui.js";

import { fetchAndCreateCharacter, fetchMultipleCharacters } from "./swapi.js";

import {
  saveCharacter,
  removeCharacter,
  findCharacterByName,
  updateMultipleCharacterIndexes,
  updateCharacterIndexes,
  sortCharacterIndexes,
} from "./mongodb.js";

export async function addStarWarsCharacter() {
  try {
    const characterName = promptAddCharacter();
    const characterData = await fetchAndCreateCharacter(characterName);
    if (characterData) {
      await saveCharacter(characterData.name);
      printMessage(
        `Character "${characterData.name}" has been added to the database!`
      );
    } else {
      printMessage(`Character "${characterName}" was not found.`);
    }
    await updateCharacterIndexes();
  } catch (error) {
    console.error("Error adding Star Wars character:", error);
  }
}

// Function to handle removing a character
export async function removeStarWarsCharacter() {
  const nameToRemove = promptRemoveCharacter();
  const removeResult = await removeCharacter(nameToRemove);
  printMessage(
    removeResult
      ? `Character "${nameToRemove}" has been removed.`
      : `Character "${nameToRemove}" was not found.`
  );
  await updateCharacterIndexes();
}

export const moveStarWarsCharacter = async () => {
  const [nameToMove, toNewIndex] = promptMoveCharacter(); // get name from user
  const characterToMove = await getCharacterToMove(nameToMove);
  if (characterToMove) {
    await moveCharacterToNewIndex(characterToMove, toNewIndex);
  } else {
    printMessage(`Character "${nameToMove}" was not found`);
  }
};

export const getCharacterToMove = async (name) => {
  const characterToMove = await findCharacterByName(name);
  return characterToMove;
};

export const moveCharacterToNewIndex = async (characterToMove, newIndexInt) => {
  const query = {
    index: {
      $gte: Math.min(characterToMove.index, newIndexInt),
      $lte: Math.max(characterToMove.index, newIndexInt),
    },
  };
  const update = {
    $inc: { index: characterToMove.index < newIndexInt ? -1 : 1 },
  };
  await updateMultipleCharacterIndexes(query, update);
  characterToMove.index = newIndexInt;
  await characterToMove.save();
  await updateCharacterIndexes();
  printMessage(
    `Character "${characterToMove.name}" moved successfully to index ${newIndexInt}`
  );
};

export const addMultipleCharacters = async (count) => {
  const namesArray = promptAddMultipleCharacters(count);
  const charactersData = await fetchMultipleCharacters(namesArray);

  for (const characterData of charactersData) {
    await saveCharacter(characterData.name);
  }
  const characterNames = charactersData
    .map((character) => character.name)
    .join(", ");
  printMessage(`Characters "${characterNames}" have been added.`);

  await updateCharacterIndexes();
};

export const removeMultipleCharacters = async (count) => {
  const namesArray = promptRemoveMultipleCharacters(count);
  for (const name of namesArray) {
    await removeCharacter(name);
  }
  await updateCharacterIndexes();
};

export async function listStarWarsCharacters() {
  const sortedCharacters = await sortCharacterIndexes();
  printCharacters(sortedCharacters);
}
