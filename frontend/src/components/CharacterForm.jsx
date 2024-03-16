import { useState } from "react";
import { addCharacter } from "../services/CharacterService";
import styled from "styled-components";
import SpinnerComponent from "./SpinnerComponent";

const CharacterFormContainer = styled.div`
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

const InputField = styled.input`
  flex-grow: 1;
  padding: 6px;
  &::placeholder {
    color: #d2b55b;
    opacity: 0.6;
  }
`;

const Button = styled.button`
  width: 70px;
  height: 26px;
  padding: 6px;
  cursor: pointer;
`;

function CharacterForm({ fetchCharactersAndUpdate, characters, setMessage }) {
  const [newCharacter, setNewCharacterName] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewCharacter = async (characterName) => {
    setLoading(true);

    try {
      const response = await addCharacter(characterName);
      console.log(response);
      setMessage(`${characterName} has been added!`);
      await fetchCharactersAndUpdate();
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to add character");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddCharacter = () => {
    if (newCharacter.trim() === "") {
      return (
        setMessage("Empty input, please add a character"),
        setTimeout(() => setMessage(""), 3000)
      );
    }

    if (
      characters.some((character) => character.name === newCharacter.trim())
    ) {
      setMessage("Character already exsists in list!");
      setNewCharacterName("");
      setTimeout(() => setMessage(""), 3000);
      return;
    } else {
      addNewCharacter(newCharacter);
      setNewCharacterName("");
    }
  };

  return (
    <CharacterFormContainer>
      <FormContainer>
        <InputField
          type="text"
          value={newCharacter}
          onChange={(e) => setNewCharacterName(e.target.value)}
          placeholder="Add new Character"
        />
        <Button onClick={handleAddCharacter}>Add</Button>
        {loading ? <SpinnerComponent /> : null}
      </FormContainer>
    </CharacterFormContainer>
  );
}

export default CharacterForm;
