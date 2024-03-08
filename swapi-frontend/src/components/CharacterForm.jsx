import { useState } from "react";
import { addCharacter } from "../services/CharacterService";
import styled from "styled-components";
import SpinnerComponent from "./SpinnerComponent";

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageContainer = styled.div`
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  min-height: 75px;
`;

function CharacterForm({ fetchCharactersAndUpdate, characters }) {
  const [newCharacter, setNewCharacterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addNewCharacter = async (characterName) => {
    setLoading(true);

    try {
      const response = await addCharacter(characterName);
      console.log(response);

      if (!response.data.success) {
        setMessage(`${characterName} is not a Star Wars character!`);
      } else {
        setMessage(`${characterName} has been added!`);
        await fetchCharactersAndUpdate();
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to add character");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddCharacter = () => {
    if (newCharacter.trim() === "") {
      return (
        setMessage("Empty input! please add a character"),
        setTimeout(() => setMessage(""), 3000)
      );
    }

    if (
      characters.some((character) => character.name === newCharacter.trim())
    ) {
      setMessage("Character with the same name already exsists!");
      setNewCharacterName("");
      setTimeout(() => setMessage(""), 3000);
      return;
    } else {
      addNewCharacter(newCharacter);
      setNewCharacterName("");
    }
  };

  return (
    <ElementContainer>
      <input
        type="text"
        value={newCharacter}
        onChange={(e) => setNewCharacterName(e.target.value)}
      />
      <button onClick={handleAddCharacter}>Add Character</button>
      {loading ? <SpinnerComponent /> : null}
      <MessageContainer>{message && <p>{message}</p>}</MessageContainer>
    </ElementContainer>
  );
}

export default CharacterForm;
