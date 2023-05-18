const { Character } = require("./database");
const { searchCharacter } = require("./api");
const {
  promptAddCharacter,
  promptAddAnotherCharacter,
  promptRemoveCharacter,
  promptAddSeveralCharacters,
  promptMoveCharacter,
  promptRemoveSeveralCharacters,
  printCharacters,
} = require("./ui");
