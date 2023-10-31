import promptSync from "prompt-sync";
const prompt = promptSync();

import { connectToMongoDb, closeDatabaseConnection } from "./mongodb.js";
import {
  addCharacter,
  removeCharacterOperation,
  moveCharacterOperation,
  listCharacters,
} from "./handler.js";

const runApp = async () => {
  try {
    await connectToMongoDb();

    let operation;
    do {
      operation = prompt(
        "Enter the operation you want to do (add, remove, move, list, exit): "
      ).toLowerCase();
      switch (operation) {
        case "add":
          await addCharacter();
          break;
        case "remove":
          await removeCharacterOperation();
          break;
        case "move":
          await moveCharacterOperation();
          break;
        case "list":
          await listCharacters();
          break;
        case "exit":
          console.log("Exiting application...");
          break;
        default:
          console.log("Invalid operation. Try again.");
      }
    } while (operation !== "exit");

    await closeDatabaseConnection();
  } catch (error) {
    console.error("Error in main application:", error);
    await closeDatabaseConnection();
  }
};

runApp();
