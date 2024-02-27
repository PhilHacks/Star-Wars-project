import { removeCharacter } from '../services/CharacterService';


function DeleteCharacters({fetchCharactersAndUpdate, characters}) {
    const deleteCharacter = (id) => {
      removeCharacter(id)
        .then(() => {
          fetchCharactersAndUpdate();
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
    <ul>
    {characters.map((character) => (
      <li key={character._id}>
        {character.name}
        <button onClick={() => deleteCharacter(character._id)}>
          Remove
        </button>
      </li>
    ))}
  </ul>
  </>
  )
}

export default DeleteCharacters