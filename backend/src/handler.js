import {
  fetchCharacterNameProperty,
  fetchMultipleCharacters,
} from "./swapi.js";

import {
  saveCharacter,
  findCharacterByIndex,
  moveCharacterToNewIndex,
  updateCharacterIndexes,
  sortCharacterIndexes,
  removeCharacterById,
} from "./mongoOperations.js";

export const listStarWarsCharacters = async () => {
  try {
    const sortedCharacters = await sortCharacterIndexes();
    console.log("🦸 Characters in Database:", sortedCharacters);
    return sortedCharacters;
  } catch (error) {
    console.error("Error listing Star Wars characters:", error);
    throw error;
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

export const addStarWarsCharacter = async (characterName) => {
  try {
    const characterData = await fetchCharacterNameProperty(characterName);
    await saveAndUpdateDatabase(characterData.name);
    return { success: true, characterName: characterData.name };
  } catch (error) {
    console.error(`Error processing ${characterName}:`, error);
    return { success: false, characterName };
  } finally {
    await updateCharacterIndexes();
  }
};

export const removeStarWarsCharactersById = async (characterId) => {
  try {
    const removeResult = await removeCharacterById(characterId);
    await updateCharacterIndexes();
    if (removeResult) {
      return {
        success: true,
        message: `Character with ID ${characterId} has been removed successfully.`,
      };
    } else {
      return {
        success: false,
        message: `No character found with ID ${characterId}.`,
      };
    }
  } catch (error) {
    console.error("Error removing Star Wars character by ID:", error);
    throw error; // Rethrow the error to handle it in the Express route
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
      console.log(`Character "${oldIndex}" was not found`);
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
