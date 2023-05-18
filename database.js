const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const characterSchema = new mongoose.Schema({
  name: String,
});

const Character = mongoose.model("Character", characterSchema);

module.exports = { Character };

// Den här koden definierar en modell för en MongoDB-databas med hjälp av Mongoose och exporterar modellen så att den kan användas i andra filer. Här är vad varje rad i koden gör:

// const mongoose = require("mongoose");: Importerar Mongoose-paketet och sparar det i en variabel för att kunna använda det i koden.

// const connectionString = "mongodb+srv://filipnyman7:filipnyman7@philscluster0.5wvjvwb.mongodb.net/?retryWrites=true&w=majority";: Sparar anslutningssträngen till MongoDB-databasen i en variabel.

// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });: Ansluter till MongoDB-databasen med hjälp av anslutningssträngen och konfigurerar anslutningsinställningarna för att använda den senaste versionen av url-parsern och den nya uppsättningen verktyg för nätverkskontroll.

// const characterSchema = new mongoose.Schema({ name: String });: Definierar ett schema för en modell av en karaktär i en fiktiv databas. I det här fallet är karaktären en samling av enkla textfält, i det här fallet en enda sträng med karaktärens namn.

// const Character = mongoose.model("Character", characterSchema);: Skapar en modell av en karaktär från karaktärsschemat och tilldelar den till variabeln Character.

// module.exports = { Character };: Exporterar modellen så att den kan användas i andra filer som importerar den här modulen. Andra filer kan då använda modellen för att skapa, uppdatera eller hämta data från databasen.
