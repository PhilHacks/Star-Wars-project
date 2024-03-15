import { useState } from "react";
import { swapCharacters } from "../services/CharacterService";
import SpinnerComponent from "./SpinnerComponent";
import MessageComponent from "./MessageComponent";
import styled from "styled-components";

const SwapButton = styled.button`
  padding: 5px;
  cursor: pointer;
  width: 70px;
  height: 26px;
`;

const StyledSelect = styled.select`
  padding: 5px;
  margin: 0;
  width: 165px;
`;

function SwapCharacter({ fetchCharactersAndUpdate, characters }) {
  const [selectedCharacter1, setSelectedCharacter1] = useState("");
  const [selectedCharacter2, setSelectedCharacter2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const swapSelectedCharacters = () => {
    setLoading(true);

    if (!selectedCharacter1 || !selectedCharacter2) {
      setMessage("Please select two characters to swap!");
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (selectedCharacter1 === selectedCharacter2) {
      setMessage("Choose two different characters to swap!");
      setSelectedCharacter1("");
      setSelectedCharacter2("");
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    swapCharacters(selectedCharacter1, selectedCharacter2)
      .then(() => {
        fetchCharactersAndUpdate();
        setSelectedCharacter1("");
        setSelectedCharacter2("");
        setMessage("Characters Swapped!");
        setLoading(false);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to Swap");
        setLoading(false);
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <div>
      <StyledSelect
        value={selectedCharacter1}
        onChange={(e) => setSelectedCharacter1(e.target.value)}
      >
        <option value=""></option>
        {characters.map((character) => (
          <option key={character._id} value={character._id}>
            {character.name}
          </option>
        ))}
      </StyledSelect>
      <StyledSelect
        value={selectedCharacter2}
        onChange={(e) => setSelectedCharacter2(e.target.value)}
      >
        <option value=""></option>
        {characters.map((character) => (
          <option key={character._id} value={character._id}>
            {character.name}
          </option>
        ))}
      </StyledSelect>
      <SwapButton onClick={swapSelectedCharacters}>Swap</SwapButton>
      {loading ? <SpinnerComponent /> : null}
      {message && <MessageComponent message={message} />}
    </div>
  );
}

export default SwapCharacter;
