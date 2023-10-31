import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// Anslut till MongoDB-databasen | gör säkrare så mina uppgifter inte syns på github
export async function connectToMongoDb() {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

const characterSchema = new mongoose.Schema({
  name: String,
  index: { type: Number, required: true },
});

const Character = mongoose.model("Character", characterSchema);

export async function updateCharacterIndexes() {
  const characters = await Character.find().sort({ index: 1 });

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    if (character.index !== i) {
      character.index = i;
      await character.save();
    }
  }
}

export async function sortCharacterIndexes() {
  return await Character.find().sort({ index: 1 });
}

export async function saveCharacter(name) {
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

export async function removeCharacter(name) {
  try {
    const result = await Character.deleteOne({ name });
    return result;
  } catch (error) {
    console.error("Error removing character:", error);
    return null;
  }
}

export async function updateMultipleCharacterIndexes(query, update) {
  try {
    await Character.updateMany(query, update);
  } catch (error) {
    console.error("Error updating multiple character indexes:", error);
  }
}

export async function findCharacterByName(name) {
  try {
    const character = await Character.findOne({ name });
    return character;
  } catch (error) {
    console.error("Error finding character:", error);
    return null;
  }
}

export async function closeConnectionToMongoDb() {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}
