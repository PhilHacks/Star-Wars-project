import { useEffect} from "react";
import { fetchCharacters } from "../services/CharacterService";


function CharacterList({ setCharacters }) {
  useEffect(() => {
  const listCharacters = async () => {
    try {
      const res = await fetchCharacters();
      setCharacters(res.data);
    } catch (err) {
      console.log(err);
    }
  };
    listCharacters();
  }, [setCharacters]);

  return null;
}

export default CharacterList