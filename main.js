// // Importera Character-objektet från "mongodb.js" filen
// const { Character } = require("./mongodb");

// // Importera getCharacterNames-funktionen från "swapi.js" filen
// const { getCharacterNames } = require("./swapi");

// // Importera olika funktioner från "ui.js" filen
// const {
//   promptAddCharacter,
//   // promptAddAnotherCharacter,
//   // promptRemoveCharacter,
//   // promptAddSeveralCharacters,
//   // promptMoveCharacter,
//   // promptRemoveSeveralCharacters,
//   // printCharacters,
// } = require("./ui");

// main.js förklaring kod:
// - Importera objektet Character från filen "mongodb.js" för att kunna använda det i den aktuella filen.
// - Importera funktionen getCharacterNames från filen "swapi.js" för att kunna använda den och hämta Star Wars-karaktärernas namn från ett externt API.
// - Importera olika funktioner från filen "ui.js" för att använda dem i programmet. Dessa funktioner inkluderar promptAddCharacter, promptAddAnotherCharacter, promptRemoveCharacter, promptAddSeveralCharacters, promptMoveCharacter, promptRemoveSeveralCharacters och printCharacters. Dessa funktioner används för att interagera med användaren och utföra olika åtgärder som att lägga till eller ta bort karaktärer, flytta karaktärer eller skriva ut karaktärer i konsolen.
const axios = require("axios");
const prompt = require("prompt-sync")();
const mongoose = require("mongoose");

//Kopplar upp till databasen
mongoose
  .connect(
    "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/mydatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection to the database succeeded!");
    addFirstCharacter();
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Define schema
const characterSchema = new mongoose.Schema({
  name: String,
  index: { type: Number, required: true },
});

// Create the Character model based on the schema
const Character = mongoose.model("Character", characterSchema);

async function updateCharacterIndexes() {
  const characters = await Character.find().sort({ index: 1 });

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    if (character.index !== i) {
      character.index = i;
      await character.save();
    }
  }
}

async function sortCharacterIndexes() {
  return await Character.find().sort({ index: 1 });
}

async function addFirstCharacter() {
  const first = prompt("Add Star Wars character to the list: ");

  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${first}`
    );

    if (response.data.results.length === 0) {
      console.log(`No Star Wars characters found matching "${first}"`);
      addFirstCharacter();
    } else {
      const character = new Character({
        name: response.data.results[0].name,
      });

      const charactersCount = await Character.countDocuments();
      character.index = charactersCount;

      await character.save();
      await updateCharacterIndexes();

      console.log(`"${first}" added:`);
      console.log(
        "Characters in MongoDB database:",
        await sortCharacterIndexes()
      );
      removeStarWarsCharacter(character.index);
    }
  } catch (error) {
    console.error("Error: Something went wrong, try again", error);
    addFirstCharacter();
  }
}

async function removeStarWarsCharacter(index) {
  const name = prompt("Enter the name of the character to delete: ");

  try {
    const result = await Character.deleteOne({ name });

    if (result.deletedCount === 1) {
      console.log(`"${name}" removed`);

      await Character.updateMany(
        { index: { $gt: index } },
        { $inc: { index: -1 } }
      );

      await updateCharacterIndexes();

      console.log("MongoDB database:", await sortCharacterIndexes()); // Show current collection
      moveCharacter();
    } else {
      console.log(`No character with the name "${name}" found`);
      removeStarWarsCharacter(index);
    }
  } catch (error) {
    console.error("Error: Something went wrong, try again", error);
  }
}

async function moveCharacter() {
  const name = prompt("Enter the name of the character to move: ");
  const toNewIndex = prompt("Enter the new index for the character: ");

  try {
    const characterToMove = await Character.findOne({ name });

    if (!characterToMove) {
      console.log(`Character "${name}" not found in the collection`);
      return;
    }

    const currentCharacter = await Character.findOne({
      index: parseInt(toNewIndex),
    });

    if (currentCharacter) {
      // If there is already a character at the target index,
      // update the index of the current character at the target index
      currentCharacter.index = characterToMove.index;
      await currentCharacter.save();
    }

    // Update the index value of the character being moved
    characterToMove.index = parseInt(toNewIndex);
    await characterToMove.save();

    // Update the index values for affected characters
    if (characterToMove.index < parseInt(toNewIndex)) {
      // Moving the character downwards
      await Character.updateMany(
        {
          index: { $gt: characterToMove.index, $lte: parseInt(toNewIndex) },
          _id: { $ne: characterToMove._id },
        },
        { $inc: { index: -1 } }
      );
    } else {
      // Moving the character upwards
      await Character.updateMany(
        {
          index: { $gte: parseInt(toNewIndex), $lt: characterToMove.index },
          _id: { $ne: characterToMove._id },
        },
        { $inc: { index: 1 } }
      );
    }

    // Sort the characters by index
    const sortedCharacters = await sortCharacterIndexes();

    console.log(
      `Character "${name}" moved successfully to index ${toNewIndex}`
    );
    console.log("Characters in MongoDB database:", sortedCharacters);
    addMultipleCharacters();
  } catch (error) {
    console.error("Error: Something went wrong, try again", error);
  }
}

async function addMultipleCharacters() {
  const count = parseInt(prompt("Enter the number of characters to add: "));

  try {
    for (let i = 0; i < count; i++) {
      const name = prompt(`Enter the name of character ${i + 1}: `);

      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?search=${name}`
        );

        if (response.data.results.length === 0) {
          console.log(`No Star Wars characters found matching "${name}"`);
          continue;
        }

        const character = new Character({
          name: response.data.results[0].name,
        });

        const charactersCount = await Character.countDocuments();
        character.index = charactersCount;

        await character.save();

        console.log(`"${name}" added`);
      } catch (error) {
        console.error(`Error adding character "${name}":`, error);
      }
    }

    await updateCharacterIndexes();
    console.log(
      "Characters in MongoDB database:",
      await sortCharacterIndexes()
    );

    await removeMultipleCharacters(); // Call the removeMultipleCharacters function
  } catch (error) {
    console.error("Error adding multiple characters:", error);
  }
}

async function removeMultipleCharacters() {
  const count = parseInt(prompt("Enter the number of characters to remove: "));

  try {
    for (let i = 0; i < count; i++) {
      const name = prompt(`Enter the name of character ${i + 1} to remove: `);

      try {
        const character = await Character.findOne({ name });

        if (!character) {
          console.log(`Character "${name}" not found in the collection`);
          continue;
        }

        const index = character.index;
        await Character.deleteOne({ name });

        await Character.updateMany(
          { index: { $gt: index } },
          { $inc: { index: -1 } }
        );

        await updateCharacterIndexes();

        console.log(`"${name}" removed`);
        console.log("MongoDB database:", await sortCharacterIndexes());
      } catch (error) {
        console.error(`Error removing character "${name}":`, error);
      }
    }
  } catch (error) {
    console.error("Error removing multiple characters:", error);
  } finally {
    mongoose.connection.close();
  }
}
