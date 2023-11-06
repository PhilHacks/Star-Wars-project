import mongoose from "mongoose";

import { printMessage } from "./ui.js";

const characterSchema = new mongoose.Schema({
  name: String,
  index: { type: Number, required: true },
});

const Character = mongoose.model("Character", characterSchema);

export const updateCharacterIndexes = async () =>{
  const characters = await Character.find().sort({ index: 1 });

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    if (character.index !== i) {
      character.index = i;
      await character.save();
    }
  }
}

export const sortCharacterIndexes = async () => {
  return await Character.find().sort({ index: 1 });
}

export const saveCharacter = async (name) => {
  const character = new Character({ name });
  const charactersCount = await Character.countDocuments();
  character.index = charactersCount;
  try {
    await character.save();
    return character;
  } catch (error) {
    console.error("Error saving character to the database:", error);
    return null;
  }
}

export const removeCharacterByIndex = async (index) => {
  try {
    const result = await Character.deleteOne({ index });
    return result;
  } catch (error) {
    console.error("Error removing character:", error);
    return null;
  }
}

export const updateMultipleCharacterIndexes = async (query, update) => {
  try {
    await Character.updateMany(query, update);
  } catch (error) {
    console.error("Error updating multiple character indexes:", error);
  }
}

export const moveCharacterToNewIndex = async (characterToMove, newIndexInt) => {
  try {
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
  } catch (error) {
    console.error("Error moving character to new index:", error);
  }
};

export const findCharacterByIndex = async (index) => {
  try {
    const character = await Character.findOne({ index });
    return character;
  } catch (error) {
    console.error("Error finding character:", error);
    return null;
  }
}
