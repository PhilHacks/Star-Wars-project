// In charge of mongdb connection
import mongoose from "mongoose";

// Anslut till MongoDB-databasen | gör säkrare så mina uppgifter inte syns på github
mongoose
  .connect(
    "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/mydatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const characterSchema = new mongoose.Schema({
  name: String,
  index: { type: Number, required: true },
});

const Character = mongoose.model("Character", characterSchema);

export async function saveCharacterToDatabase(characterData) {
  const charactersCount = await Character.countDocuments();
  characterData.index = charactersCount; // Set the index property
  const character = new Character(characterData);

  // Försök att spara karaktären i databasen
  try {
    await character.save();
    console.log(`Character "${characterData.name}" saved to the database!`);
  } catch (error) {
    console.error("Error saving character to the database:", error);
  }
}

// mongodb.js Förklaring av kod:
// - Mongoose och getCharacterNames importeras.
// - Anslutning skapas till en MongoDB-databas med angiven URL och inställningar.
// - Om anslutningen lyckas, skrivs en framgångsmeddelande ut och fetchData-funktionen körs.
// - Om anslutningen misslyckas, skrivs ett felmeddelande ut.
// - Ett schema för karaktärer skapas med ett namnfält.
// - En modell skapas baserad på schemat.
// - Funktionen fetchData används för att hämta karaktärernas namn från en extern API och spara dem i databasen.
// - Namnen omvandlas till ett listobjektformat.
// - Karaktärerna sparas i databasen med hjälp av Character-modellen och insertMany.
// - Om det uppstår fel under hämtning och sparning av data, skrivs ett felmeddelande ut.
// - Modellen Character exporteras för att kunna användas i andra filer.

// .
