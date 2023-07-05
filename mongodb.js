// In charge of mongdb connection
const mongoose = require("mongoose");
const getCharacterNames = require("./swapi");

// Anslut till MongoDB-databasen
mongoose
  .connect(
    "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/mydatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Anslutning till databasen lyckades!");
    // Kör funktionen för att hämta och spara data
    fetchData();
  })
  .catch((error) => {
    console.error("Anslutningsfel till databasen:", error);
  });

// Skapa en referens till databasen
const db = mongoose.connection;

// Hantera fel vid anslutning
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Hantera framgångsrik anslutning
db.once("open", () => {
  console.log("MongoDB connection successful");
});

// Skapa ett schema för karaktärer
const characterSchema = new mongoose.Schema({
  name: String,
});

// Skapa en modell baserad på schemat
const Character = mongoose.model("Character", characterSchema);

module.exports = {
  db,
  Character,
};

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
