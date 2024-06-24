const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Usage: node mongo.js <password> [<name> <number>]");
}
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://root:${password}@openfullstackbackend.tswidjg.mongodb.net/?retryWrites=true&w=majority&appName=OpenFullstackBackend`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Persons = mongoose.model("Persons", personSchema);

if (!name || !number) {
  // Mostrar todos los documentos si no se proporcionan nombre y número
  Persons.find({})
    .then((result) => {
      console.log("Persons:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error fetching persons:", err);
    });
} else {
  // Guardar un nuevo documento si se proporcionan nombre y número
  const person = new Persons({
    name: name,
    number: number,
  });

  person
    .save()
    .then((result) => {
      console.log("Person saved!");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error saving person:", err);
    });
}
