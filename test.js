const mongoose = require("mongoose");

const uri =
  "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/SWAPI?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const characterSchema = new mongoose.Schema({
  name: String,
});

const Character = mongoose.model("Character", { name: String });

// ... kod för anslutning och modellskapelse

async function testCode() {
  try {
    const newCharacter = new Character({ name: "Luke Skywalker" });
    await newCharacter.save();
    console.log("New character saved successfully!");
  } catch (error) {
    console.error("Error while saving character:", error);
  }
}

// Kalla på testfunktionen
testCode();
