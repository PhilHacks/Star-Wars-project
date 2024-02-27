import { useEffect, useState } from "react";
import "./App.css";
import CharacterForm from "./components/CharacterForm";
import DeleteCharacters from "./components/DeleteCharacters";
import CharacterList from "./components/CharacterList";
import SwapCharacter from "./components/SwapCharacter";
import { fetchCharacters } from "./services/CharacterService";

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
      <div className="container">
        <div className="content">
          <h1>Swapi App</h1>
          <CharacterForm
            fetchCharactersAndUpdate={fetchCharactersAndUpdate}
            characters={characters}
          />
          <h2>Characters:</h2>
          <CharacterList setCharacters={setCharacters} />
          <DeleteCharacters
            fetchCharactersAndUpdate={fetchCharactersAndUpdate}
            characters={characters}
          />
          <SwapCharacter
            fetchCharactersAndUpdate={fetchCharactersAndUpdate}
            characters={characters}
          />
        </div>
      </div>
    </>
  );
}

export default App;
