import mongoose from "mongoose";


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

export const removeCharacterById = async (id) => {
  try {
    const result = await Character.findByIdAndDelete(id);
    if (result) {
      console.log(`Character with ID ${id} was deleted.`, result);
      await updateCharacterIndexes();
    } else {
      console.log(`No character found with ID ${id}.`);
    }
    return result;
  } catch (error) {
    console.error("Error removing character by ID:", error);
    throw error; 
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
    console.log(
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

export const swapCharacters = async (id1, id2) => {
  try {
    // Retrieve both characters
    const character1 = await Character.findById(id1);
    const character2 = await Character.findById(id2);

    if (!character1 || !character2) {
      throw new Error('One or both characters not found');
    }

    // Swap the index values
    const indexTemp = character1.index;
    character1.index = character2.index;
    character2.index = indexTemp;

    // Save the swapped characters
    await character1.save();
    await character2.save();

    await updateCharacterIndexes();

    return { success: true, message: 'Characters swapped successfully' };
   
  } catch (error) {
    console.error("Error swapping characters:", error);
    throw error; // The caller will handle the error  
  }
};