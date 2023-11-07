import { listStarWarsCharacters, addStarWarsCharacter, removeStarWarsCharactersByIndex} from "./handler.js"

import express  from "express";


const app = express();
app.use(express.json());

// Route list all characters
app.get('/characters', async (req, res) =>{
    try {
        const characters = await listStarWarsCharacters();
        res.json(characters);
      } catch (error) {
        res.status(500).send(error.message);
      }
})

// Route add new character
app.post('/characters/add', async (req, res) => {
    try {
        const { name } = req.body;
        await addStarWarsCharacter(name);
        res.status(201).send(`Character ${name} added successfully.`);
      } catch (error) {
        res.status(500).send(error.message);
      }
})


// Route remove character by index
app.delete('/characters/remove/:index', async (req, res) => {
    try {
        const { index } = req.params;
        await removeStarWarsCharactersByIndex(index);
        res.send(`Character at index ${index} removed successfully.`);
      } catch (error) {
        res.status(500).send(error.message);
      }
})

export const startServer = async () => {
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}
