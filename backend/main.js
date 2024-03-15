import {
  connectToMongoDb,
  closeConnectionToMongoDb,
} from "./src/mongoConnection.js";
import { startServer } from "./src/server.js";

const runApp = async () => {
  try {
    await connectToMongoDb();
    await startServer();
  } catch (error) {
    console.error("Error in main application:", error);
    await closeConnectionToMongoDb();
  }
};

runApp();
