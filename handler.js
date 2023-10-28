import {
  promptAddCharacter,
  promptRemoveCharacter,
  promptMoveCharacter,
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

export async function moveCharacterOperation() {
  const [nameToMove, toNewIndex] = promptMoveCharacter();
  const characterToMove = await findCharacterByName(nameToMove);
  if (characterToMove) {
    const newIndexInt = parseInt(toNewIndex);
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
      `Character "${nameToMove}" moved successfully to index ${toNewIndex}`
    );
  } else {
    printMessage(`Character "${nameToMove}" was not found.`);
  }
  await updateCharacterIndexes();
}

export async function listCharacters() {
  const sortedCharacters = await sortCharacterIndexes();
  printCharacters(sortedCharacters);
}

export async function addCharacter() {
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
}

// Function to handle removing a character
export async function removeCharacterOperation() {
  const nameToRemove = promptRemoveCharacter();
  const removeResult = await removeCharacter(nameToRemove);
  printMessage(
    removeResult
      ? `Character "${nameToRemove}" has been removed.`
      : `Character "${nameToRemove}" was not found.`
  );
  await updateCharacterIndexes();
}
