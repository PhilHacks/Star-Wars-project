import {
  connectToMongoDb,
  closeConnectionToMongoDb,
} from "./mongoConnection.js";
import { startServer } from "./server.js";

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
