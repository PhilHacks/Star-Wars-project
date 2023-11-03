// Ansvarig för API-anropet till Swapi
import axios from "axios";

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

export async function fetchMultipleCharacters(namesArray) {
  const charactersData = [];

  for (let i = 0; i < namesArray.length; i++) {
    const name = namesArray[i];

    try {
      const characterData = await fetchAndCreateCharacter(name);
      if (characterData) {
        charactersData.push(characterData);
      }
    } catch (error) {
      console.error(`Error fetching character "${name}":`, error);
    }
  }

  return charactersData;
}
