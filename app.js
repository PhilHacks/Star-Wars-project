//Huvudfil där allt körs ifrån.
const { promptAddCharacter } = require("./ui.js");
const { fetchCharacterData } = require("./swapi.js");
const { saveCharacterToDatabase } = require("./mongodb.js");

async function main() {
  try {
    // Fråga användaren om vilken Star Wars-karaktär de vill lägga till
    const characterName = promptAddCharacter();

    // Hämta karaktärsinformation från SWAPI
    const characterData = await fetchCharacterData(characterName);

    // Spara karaktärsinformationen i MongoDB
    await saveCharacterToDatabase(characterData);

    console.log(`Character "${characterName}" has been added to the database!`);
  } catch (error) {
    console.error("Error in main application:", error);
  }
}

main(); // Kör huvudfunktionen
