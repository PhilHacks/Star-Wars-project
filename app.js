import promptSync from "prompt-sync";
const prompt = promptSync();

import { connectToMongoDb, closeConnectionToMongoDb } from "./mongoConnection.js";
import { welcomeMessage } from "./ui.js";
import {
  addStarWarsCharacter,
  removeStarWarsCharactersByIndex,
  moveStarWarsCharacter,
  listStarWarsCharacters,
  addMultipleCharacters,
} from "./handler.js";

// Object mapping user input strings to the corresponding functions
const userCommandObj = {
  'a': addStarWarsCharacter,
  'r': removeStarWarsCharactersByIndex,
  'm': moveStarWarsCharacter,
  'l': listStarWarsCharacters,
  'am': addMultipleCharacters,
};

// Main function to execute user commands until 'exit' is entered
const runApp = async () => {
  
  try {
    welcomeMessage();
    
    await connectToMongoDb();
    await listStarWarsCharacters();
    let userCommand;
    do {userCommand = 
      prompt("🎮 Do you wish to: Add (a), Remove (r), Move (m), See List (l), Add Many (am), or exit (e)?: ").toLowerCase();
      if (userCommandObj[userCommand]) {
        await userCommandObj[userCommand]();
      } else if (userCommand !== "e") {
        console.log("Invalid operation. Try again.");
      }
    } while (userCommand !== "e");
    await closeConnectionToMongoDb();
  } catch (error) {
    console.error("Error in main application:", error);
    await closeConnectionToMongoDb();
  }
};

runApp();
