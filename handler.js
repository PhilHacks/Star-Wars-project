import {
  promptAddCharacter,
  promptRemoveCharacter,
  promptMoveCharacter,
  promptAddMultipleCharacters,
  promptRemoveMultipleCharacters,
  printCharacters,
  printMessage,
} from "./ui.js";

import {
  fetchCharacterNameProperty,
  fetchMultipleCharacters,
} from "./swapi.js";

import {
  saveCharacter,
  removeCharacter,
  findCharacterByName,
  moveCharacterToNewIndex,
  updateCharacterIndexes,
  sortCharacterIndexes,
} from "./mongodb.js";

export const listStarWarsCharacters = async () => {
  try {
    const sortedCharacters = await sortCharacterIndexes();
    console.log("Characters in Database:");
    printCharacters(sortedCharacters);
  } catch (error) {
    console.error("Error listing Star Wars characters:", error);
  }
};

export const updateAndListCharacters = async () => {
  try {
    await updateCharacterIndexes();
    await listStarWarsCharacters();
  } catch (error) {
    console.error("Error updating and listing characters:", error);
  }
};

export const saveAndUpdateDatabase = async (characterName) => {
  try {
    await saveCharacter(characterName);
  } catch (error) {
    console.error("Error saving and updating Database", error);
  }
};

export const addStarWarsCharacter = async () => {
  try {
    const characterName = promptAddCharacter();
    const characterData = await fetchCharacterNameProperty(characterName);
    if (characterData) {
      await saveAndUpdateDatabase(characterData.name);
      printMessage(
        `Character "${characterData.name}" has been added to the database!`
      );
      await updateAndListCharacters();
    } else {
      printMessage(`Character "${characterName}" was not found.`);
    }
  } catch (error) {
    console.error("Error adding Star Wars character:", error);
  }
};

export const addMultipleCharacters = async (count) => {
  try {
    const characterNames = promptAddMultipleCharacters(count);
    const charactersData = await fetchMultipleCharacters(characterNames);
    for (const characterData of charactersData) {
      await saveAndUpdateDatabase(characterData.name);
    }
    const nameList = charactersData
      .map((character) => character.name)
      .join(", ");
    printMessage(`Characters "${nameList}" has been added to the database!`);
    await updateAndListCharacters();
  } catch (error) {
    console.error("Error adding multiple characters:", error);
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
    await updateAndListCharacters();
  } catch (error) {
    console.error("Error removing Star Wars character:", error);
  }
};

export const removeMultipleCharacters = async (count) => {
  try {
    const characterNames = promptRemoveMultipleCharacters(count);
    for (const name of characterNames) {
      await removeCharacter(name);
    }
    await updateAndListCharacters();
  } catch (error) {
    console.error("Error removing multiple characters:", error);
  }
};

export const moveStarWarsCharacter = async () => {
  try {
    const [nameToMove, toNewIndex] = promptMoveCharacter(); // get name from user
    await handleCharacterMovement(nameToMove, toNewIndex);
    await updateAndListCharacters();
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
