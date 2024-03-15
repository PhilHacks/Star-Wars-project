import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import CharacterForm from "./components/CharacterForm";
import CharacterList from "./components/CharacterList";
import SwapCharacter from "./components/SwapCharacter";
import { fetchCharacters } from "./services/CharacterService";

const GlobalStyle = createGlobalStyle`
* {
  background-color: #000000;
  font-family: "SF Distant Galaxy", sans-serif;
  background-image: url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  color: #ffe81f;
} 
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid #ffe81f;
  padding: 40px;
  min-height: 520px;
  width: 400px;
  background-color: transparent;
`;

const Headline = styled.h2`
  margin: 0;
`;

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharactersAndUpdate();
  }, []);

  const fetchCharactersAndUpdate = () => {
    fetchCharacters()
      .then((res) => setCharacters(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <h1>Swapi App</h1>
          <CharacterForm
            fetchCharactersAndUpdate={fetchCharactersAndUpdate}
            characters={characters}
          />
          <Headline>Characters</Headline>
          <CharacterList
            fetchCharactersAndUpdate={fetchCharactersAndUpdate}
            characters={characters}
          />
          <SwapCharacter
            fetchCharactersAndUpdate={fetchCharactersAndUpdate}
            characters={characters}
          />
        </Content>
      </Container>
    </>
  );
}

export default App;
