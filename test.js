const mongoose = require("mongoose");

const uri = mongoose.connect(
  "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/SWAPI?retryWrites=true&w=majority"
);

const characterSchema = new mongoose.Schema({
  name: String,
});

const Character = mongoose.model("Character", { name: String });

// ... kod för anslutning och modellskapelse

async function testCode() {
  try {
    const newCharacter = new Character({ name: "P" });
    await newCharacter.save();
    console.log("New character saved successfully!");
  } catch (error) {
    console.error("Error while saving character:", error);
  }
}

// Kalla på testfunktionen
testCode();
