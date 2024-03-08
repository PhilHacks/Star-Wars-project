import {
  listStarWarsCharacters,
  addStarWarsCharacter,
  removeStarWarsCharactersById,
} from "./handler.js";
import { swapCharacters } from "./mongoOperations.js";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
//middleware for axios for React
app.use(cors());

// Route list all characters
app.get("/characters", async (req, res) => {
  try {
    const characters = await listStarWarsCharacters();
    res.status(200).json(characters);
    console.log(characters);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route add new character
app.post("/characters/add", async (req, res) => {
  try {
    const { characterName } = req.body;
    if (!characterName) {
      return res.status(400).json({ message: "Invalid character name" });
    }
    console.log(characterName);

    const result = await addStarWarsCharacter(characterName);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: `${characterName} added successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `${characterName} is not a Star Wars Character`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching characters" });
  }
});

app.post("/characters/swap", async (req, res) => {
  try {
    const { id1, id2 } = req.body;
    const result = await swapCharacters(id1, id2);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route remove character by index
app.delete("/characters/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeStarWarsCharactersById(id);
    if (result) {
      res.send(result.message);
    } else {
      res.status(404).send(result.message);
    }
  } catch (error) {
    res.status(500).send(`Error removing character: ${error.message}`);
  }
});

export const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
