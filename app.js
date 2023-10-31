import promptSync from "prompt-sync";
const prompt = promptSync();

import { connectToMongoDb, closeConnectionToMongoDb } from "./mongodb.js";
import {
  addStarWarsCharacter,
  removeStarWarsCharacter,
  moveStarWarsCharacter,
  listStarWarsCharacters,
} from "./handler.js";

const runApp = async () => {
  try {
    await connectToMongoDb();

    let userCommand;
    do {
      userCommand = prompt(
        "Enter the operation you want to do (add, remove, move, list, exit): "
      ).toLowerCase();
      switch (userCommand) {
        case "add":
          await addStarWarsCharacter();
          break;
        case "remove":
          await removeStarWarsCharacter();
          break;
        case "move":
          await moveStarWarsCharacter();
          break;
        case "list":
          await listStarWarsCharacters();
          break;
        case "exit":
          console.log("Exiting application...");
          break;
        default:
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
