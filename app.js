//Huvudfil där allt körs ifrån.
import {
  promptAddCharacter,
  promptAddAnotherCharacter,
  promptRemoveCharacter,
  promptAddSeveralCharacters,
  promptMoveCharacter,
  promptRemoveSeveralCharacters,
  printCharacters,
} from "./ui.js";
import { fetchCharacterData } from "./swapi.js";
import { saveCharacterToDatabase } from "./mongodb.js";

async function main() {
  try {
    // Ask the user which Star Wars character they want to add
    const characterName = promptAddCharacter();

    // Fetch character information from SWAPI
    const characterData = await fetchCharacterData(characterName);

    // Save character information to MongoDB
    if (characterData) {
      await saveCharacterToDatabase(characterData);
      console.log(
        `Character "${characterName}" has been added to the database!`
      );
    }
  } catch (error) {
    console.error("Error in main application:", error);
  }
}

main();
