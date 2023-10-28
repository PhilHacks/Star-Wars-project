// Ansvarig för API-anropet till Swapi
import axios from "axios";

export async function getCharacterNames() {
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

    return allCharacterNames; // Returnera arrayen med alla namn
  } catch (error) {
    console.error(error); // Skriv ut eventuella fel som uppstår
    throw error; // Kasta om felet för att hantera det högre upp i anropskedjan
  }
}

// Funktion för att hämta en specifik karaktärs information baserat på namnet
export async function fetchCharacterData(characterName) {
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${characterName}`
    );
    if (response.data.results.length === 0) {
      throw new Error(
        `No Star Wars characters found matching "${characterName}"`
      );
    }
    return response.data.results[0]; // Returnera den första matchningen
  } catch (error) {
    console.error(
      `Error fetching data for character "${characterName}":`,
      error
    );
    throw error;
  }
}

export async function fetchAndCreateCharacter(characterName) {
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${characterName}`
    );

    if (response.data.results.length === 0) {
      console.log(`No Star Wars characters found matching "${characterName}"`);
      return null;
    } else {
      return {
        name: response.data.results[0].name,
      };
    }
  } catch (error) {
    console.error("Error: Something went wrong, try again", error);
    return null;
  }
}

export async function fetchMultipleCharacters(namesArray) {
  const charactersData = [];

  for (let i = 0; i < namesArray.length; i++) {
    const name = namesArray[i];

    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${name}`
      );

      if (response.data.results.length === 0) {
        console.log(`No Star Wars characters found matching "${name}"`);
        continue;
      }

      const characterData = {
        name: response.data.results[0].name,
      };

      charactersData.push(characterData);
    } catch (error) {
      console.error(`Error fetching character "${name}":`, error);
    }
  }

  return charactersData;
}
