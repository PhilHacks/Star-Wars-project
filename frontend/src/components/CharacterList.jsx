import { useState } from "react";
import { removeCharacter } from "../services/CharacterService";
import styled from "styled-components";
import MessageComponent from "./MessageComponent";

const ListContainer = styled.div`
  height: calc(5 * 41px);
  overflow-y: auto;
  margin-bottom: 30px;
  padding: 0;

  &::-webkit-scrollbar {
    width: 5px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background: #d2b55b;
    border-radius: 5px;
  }
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  padding-rigth: 0px;
  margin: 2px;
  box-sizing: border-box;
`;

const DeleteButton = styled.button`
  width: 70px;
  height: 26px;
  cursor: pointer;
  padding: 6px;
`;

function CharacterList({ characters, fetchCharactersAndUpdate }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (characterId) => {
    setLoading(true);
    try {
      await removeCharacter(characterId);
      await fetchCharactersAndUpdate();
      setMessage("Character has been deleted");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to delete character", error);
      setMessage("Failed to delete character.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ListContainer>
      {loading && <p>Loading...</p>}
      {message && <MessageComponent message={message} />}
      <StyledList>
        {characters.map((character) => (
          <ListItem key={character._id} className="character-item">
            <span className="charactar-name">{character.name}</span>
            <DeleteButton onClick={() => handleDelete(character._id)}>
              Delete
            </DeleteButton>
          </ListItem>
        ))}
      </StyledList>
    </ListContainer>
  );
}

export default CharacterList;
