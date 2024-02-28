import { useState } from 'react'
import { addCharacter } from '../services/CharacterService';


function CharacterForm({fetchCharactersAndUpdate, characters}) {
  const [newCharacter, setNewCharacterName] = useState("");
  const [loading, setLoading] = useState(false)
 

  const addNewCharacter = (characterName) => {
    setLoading(true);
    console.log("Adding character:", characterName);
    addCharacter(characterName)
      .then(() => {
        fetchCharactersAndUpdate();
      })
      .catch((err) => {
        console.error(err);
        // setErrorMessage('Failed to add character');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddCharacter = () => {
    console.log("New character:", newCharacter);
    if (newCharacter.trim() === "") {return;}
    if (characters.some(character => character.name === newCharacter.trim())) {
    alert("Character with the same name already exsists!");
    return;
    } else {
    addNewCharacter(newCharacter);
    setNewCharacterName("");
  }
  };


  return (
  <>
    <input
        type="text"
        value={newCharacter}
        onChange={(e) => setNewCharacterName(e.target.value)}
        />
        <button onClick={handleAddCharacter}>Add Character</button>
        {loading && <span>Loading...</span>}
      </>
  )
}

export default CharacterForm;
