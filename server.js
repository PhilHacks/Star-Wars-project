import { express } from "express";

const app = express();

app.use(express.json());


// Route to list all characters
app.get()

// Route to add a new character
app.post()

// Route to remove a character by index
app.delete()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});