import axios from "axios";

const baseUrl = "http://localhost:5000/characters";

export const fetchCharacters = () => axios.get(baseUrl);

export const addCharacter = async (characterName) => {
  try {
    const response = await axios.post(`${baseUrl}/add`, { characterName });
    return response;
  } catch (error) {
    console.error("Errror fetching characters", error);
    throw error;
  }
};

export const removeCharacter = (id) => axios.delete(`${baseUrl}/remove/${id}`);

export const swapCharacters = (id1, id2) =>
  axios.post(`${baseUrl}/swap/`, { id1, id2 });
