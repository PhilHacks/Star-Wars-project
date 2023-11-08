import {
  promptAddCharacter,
  promptRemoveCharacterByIndex,
  promptMoveCharacter,
  printCharacters,
  printMessage,
} from "./ui.js";

import {
  fetchCharacterNameProperty,
  fetchMultipleCharacters,
} from "./swapi.js";

import {
  saveCharacter,
  removeCharacterByIndex,
  findCharacterByIndex,
  moveCharacterToNewIndex,
  updateCharacterIndexes,
  sortCharacterIndexes,
} from "./mongoOperations.js";

export const listStarWarsCharacters = async () => {
  try {
    const sortedCharacters = await sortCharacterIndexes();
    console.log("🦸 Characters in Database:");
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
    const characterNamesInput = promptAddCharacter();
    // Split the input by commas and remove any extra whitespace around the names
    const characterNames = characterNamesInput.split(',').map(name => name.trim());

    for (const characterName of characterNames) {
      const characterData = await fetchCharacterNameProperty(characterName);
      if (characterData) {
        await saveAndUpdateDatabase(characterData.name);
        printMessage(`Character "${characterData.name}" has been added to the database!`);
      } else {
        printMessage(`Character "${characterName}" was not found.`);
      }
    }
    await updateAndListCharacters();
  } catch (error) {
    console.error("Error adding Star Wars character(s):", error);
  }
};

export const removeStarWarsCharactersByIndex = async () => {
  try {
    const indexToRemove = promptRemoveCharacterByIndex();
    for (const index of indexToRemove) {
      const removeResult = await removeCharacterByIndex(index);
      printMessage(
        removeResult
          ? `Character at index ${index} has been removed.`
          : `No character found at index ${index}.`
      );
    }
    await updateAndListCharacters();
  } catch (error) {
    console.error("Error removing Star Wars characters by index:", error);
  }
};

export const moveStarWarsCharacter = async () => {
  try {
    const [indexToMove, toNewIndex] = promptMoveCharacter();
    await handleCharacterMovement(indexToMove, toNewIndex);
    await updateAndListCharacters();
  } catch (error) {
    console.error("Error moving Star Wars character:", error);
  }
};

export const handleCharacterMovement = async (oldIndex, toNewIndex) => {
  try {
    const characterToMove = await getCharacterToMove(oldIndex);
    if (characterToMove) {
      await moveCharacterToNewIndex(characterToMove, toNewIndex);
    } else {
      printMessage(`Character "${oldIndex}" was not found`);
    }
  } catch (error) {
    console.error("Error handle character movement:", error);
  }
};

export const getCharacterToMove = async (index) => {
  try {
    const characterToMove = await findCharacterByIndex(index);
    return characterToMove;
  } catch (error) {
    console.error("Error getting character to move:", error);
  }
};
