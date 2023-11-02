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
  moveCharacterToNewIndex,
  updateCharacterIndexes,
  sortCharacterIndexes,
} from "./mongodb.js";

export const addStarWarsCharacter = async () => {
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
};

export const removeStarWarsCharacter = async () => {
  try {
    const nameToRemove = promptRemoveCharacter();
    const removeResult = await removeCharacter(nameToRemove);
    printMessage(
      removeResult
        ? `Character "${nameToRemove}" has been removed.`
        : `Character "${nameToRemove}" was not found.`
    );
    await updateCharacterIndexes();
  } catch (error) {
    console.error("Error removing Star Wars character:", error);
  }
};

export const moveStarWarsCharacter = async () => {
  try {
    const [nameToMove, toNewIndex] = promptMoveCharacter(); // get name from user
    await handleCharacterMovement(nameToMove, toNewIndex);
  } catch (error) {
    console.error("Error moving Star Wars character:", error);
  }
};

export const handleCharacterMovement = async (nameToMove, toNewIndex) => {
  try {
    const characterToMove = await getCharacterToMove(nameToMove);
    if (characterToMove) {
      await moveCharacterToNewIndex(characterToMove, toNewIndex);
    } else {
      printMessage(`Character "${nameToMove}" was not found`);
    }
  } catch (error) {
    console.error("Error handle character movement:", error);
  }
};

export const getCharacterToMove = async (name) => {
  try {
    const characterToMove = await findCharacterByName(name);
    return characterToMove;
  } catch (error) {
    console.error("Error getting character to move:", error);
  }
};

export const addMultipleCharacters = async (count) => {
  try {
    const characterNames = promptAddMultipleCharacters(count);
    const charactersData = await fetchMultipleCharacters(characterNames);
    for (const characterData of charactersData) {
      await saveCharacter(characterData.name);
    }
    const nameList = charactersData
      .map((character) => character.name)
      .join(", ");
    printMessage(`Characters "${nameList}" have been added.`);
    await updateCharacterIndexes();
  } catch (error) {
    console.error("Error adding multiple characters:", error);
  }
};

export const removeMultipleCharacters = async (count) => {
  try {
    const characterNames = promptRemoveMultipleCharacters(count);
    for (const name of characterNames) {
      await removeCharacter(name);
    }
    await updateCharacterIndexes();
  } catch (error) {
    console.error("Error removing multiple characters:", error);
  }
};

export const listStarWarsCharacters = async () => {
  try {
    const sortedCharacters = await sortCharacterIndexes();
    printCharacters(sortedCharacters);
  } catch (error) {
    console.error("Error listing Star Wars characters:", error);
  }
};
