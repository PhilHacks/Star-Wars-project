// Ansvarig för API-anropet till Swapi
const axios = require("axios");
const { db, Character } = require("./mongodb");

async function getCharacterNames() {
  try {
    const allCharacterNames = []; // En array för att lagra alla teckennamn

    let nextPage = "https://swapi.dev/api/people/"; // Nästa sida att hämta från (börjar med första sidan)
    while (nextPage) {
      const response = await axios.get(nextPage); // Utför en GET-förfrågan till nästa sida
      const { results, next } = response.data; // Extrahera resultatet och länken till nästa sida från svaret

      // Iterera över varje tecken i resultaten och lägg till namnet i arrayen
      for (const character of results) {
        allCharacterNames.push(character.name);
      }

      nextPage = next; // Uppdatera "nextPage" till länken till nästa sida
    }

    console.log("Antal namn:", allCharacterNames.length); // Skriv ut antalet namn som hämtats
    console.log(allCharacterNames); // Skriv ut alla namn

    return allCharacterNames; // Returnera arrayen med alla namn
  } catch (error) {
    console.error(error); // Skriv ut eventuella fel som uppstår
    throw error; // Kasta om felet för att hantera det högre upp i anropskedjan
  }
}

// Funktion för att hämta och spara data
async function fetchData() {
  try {
    const allCharacterNames = await getCharacterNames(); // Hämta namnen från en extern API

    // Skapa en lista med objekt för att spara i databasen
    const characters = allCharacterNames.map((name) => ({ name }));

    // Spara karaktärerna i databasen
    await Character.insertMany(characters);

    console.log("Data sparad i databasen!");
  } catch (error) {
    console.error("Fel vid hämtning och sparning av data:", error);
  }
}

module.exports = { getCharacterNames, fetchData }; // Exportera funktionen för att kunna använda den i andra filer

// Swapi.js SFörklaringen av koden:
// - Axios importeras för att använda för HTTP-anrop.
// - Funktionen `getCharacterNames` är en async-funktion som hämtar karakternamn från Swapi API.
// - En while-loop används för att iterera över flera sidor av karaktärer.
// - Inuti loopen görs ett GET-anrop till nästa sida med Axios.
// - Resultaten från anropet innehåller en lista med karaktärer och en länk till nästa sida.
// - Namnen på karaktärerna läggs till i en array genom att loopa över resultaten.
// - Antalet namn och namnen skrivs ut i konsolen.
// - Arrayen med namn returneras från funktionen för att användas i andra filer.
