// Instanciación  de mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
//Configuración de la URL
const url = process.env.MONGODB_URI;
console.log("Connecting to ", url);

//Conexión a MongoDB
mongoose
  .connect(url)
  .then((res) => console.log("connected to DB"))
  .catch((err) => console.log(err));

//Creación de Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", personSchema);
