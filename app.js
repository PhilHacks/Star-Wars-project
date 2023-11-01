import promptSync from "prompt-sync";
const prompt = promptSync();

import { connectToMongoDb, closeConnectionToMongoDb } from "./mongodb.js";
import {
  addStarWarsCharacter,
  removeStarWarsCharacter,
  moveStarWarsCharacter,
  listStarWarsCharacters,
  addMultipleCharacters,
  removeMultipleCharacters,
} from "./handler.js";

// Object mapping user input strings to the corresponding functions
const userCommandObj = {
  "add": addStarWarsCharacter,
  "remove": removeStarWarsCharacter,
  "move": moveStarWarsCharacter,
  "list": listStarWarsCharacters,
  "add many": addMultipleCharacters,
  "remove many": removeMultipleCharacters,
};

// Main function to execute user commands until 'exit' is entered
const runApp = async () => {
  try {
    await connectToMongoDb();
    let userCommand;
    do {
      userCommand = prompt("Enter the operation you want to do (add, remove, move, list, add many, remove many, exit): "
      ).toLowerCase();
      if (userCommandObj[userCommand]) {
        await userCommandObj[userCommand]();
      } else if (userCommand !== "exit") {
        console.log("Invalid operation. Try again.");
      }
    } while (userCommand !== "exit");
    await closeConnectionToMongoDb();
  } catch (error) {
    console.error("Error in main application:", error);
    await closeConnectionToMongoDb();
  }
};

runApp();
