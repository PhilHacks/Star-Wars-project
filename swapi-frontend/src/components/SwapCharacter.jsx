import { useState } from "react";
import { swapCharacters } from "../services/CharacterService";


function SwapCharacter({ fetchCharactersAndUpdate, characters} ) {
  const [selectedCharacter1, setSelectedCharacter1] = useState("");
  const [selectedCharacter2, setSelectedCharacter2] = useState("");
  
  const swapSelectedCharacters = () => {
    console.log("Selected characters:", selectedCharacter1, selectedCharacter2);
    if (!selectedCharacter1 || !selectedCharacter2) {
      console.log("Plese select two characters to swap");
      return;
    }
    swapCharacters(selectedCharacter1, selectedCharacter2)
      .then(() => {
        fetchCharactersAndUpdate();
        setSelectedCharacter1("");
        setSelectedCharacter2("");
      })
      .catch((err) => console.log(err));
  };
  
  
  
  return (
    <>
      <select
        value={selectedCharacter1}
        onChange={(e) => setSelectedCharacter1(e.target.value)}
      >
        <option value=""></option>
        {characters.map((character) => (
          <option key={character._id} value={character._id}>
            {character.name}
          </option>
        ))}
      </select>
      <select
        value={selectedCharacter2}
        onChange={(e) => setSelectedCharacter2(e.target.value)}
      >
        <option value=""></option>
        {characters.map((character) => (
          <option key={character._id} value={character._id}>
            {character.name}
          </option>
            ))}
      </select>
      <button onClick={swapSelectedCharacters}>Swap Characters</button>
    </>
     )
}

export default SwapCharacter